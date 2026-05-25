package com.hotel_booking.server.services;

import com.hotel_booking.server.dtos.BookingRequestDto;
import com.hotel_booking.server.dtos.BookingResponseDto;
import com.hotel_booking.server.exceptions.*;
import com.hotel_booking.server.models.entities.*;
import com.hotel_booking.server.models.enums.BookingStatus;
import com.hotel_booking.server.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private EmailService emailService;

    @Transactional
    public BookingResponseDto createBooking(BookingRequestDto request) {
        // 1. Validate dates
        if (request.getCheckInDate() == null || request.getCheckOutDate() == null) {
            throw new InvalidDateRangeException("Dates must not be null.");
        }
        if (!request.getCheckInDate().isBefore(request.getCheckOutDate())) {
            throw new InvalidDateRangeException("Check-in date must be strictly before check-out date.");
        }

        // 2. Validate User
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + request.getUserId()));

        // 3. Validate Room
        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new RoomUnavailableException("Room not found with ID: " + request.getRoomId()));

        if (!room.isAvailable()) {
            throw new RoomUnavailableException("Room is not available for booking.");
        }

        // 4. Check for overlapping bookings
        List<Booking> roomBookings = bookingRepository.findAll().stream()
                .filter(b -> b.getRoomId().equals(room.getId()) &&
                        (b.getStatus() == BookingStatus.CONFIRMED ||
                         b.getStatus() == BookingStatus.PENDING ||
                         b.getStatus() == BookingStatus.CHECKED_IN))
                .collect(Collectors.toList());

        boolean hasOverlap = roomBookings.stream().anyMatch(b ->
                !(b.getCheckOutDate().isBefore(request.getCheckInDate()) ||
                  b.getCheckInDate().isAfter(request.getCheckOutDate()) ||
                  b.getCheckOutDate().equals(request.getCheckInDate()) ||
                  b.getCheckInDate().equals(request.getCheckOutDate()))
        );

        if (hasOverlap) {
            throw new RoomUnavailableException("Room is already booked for the selected dates.");
        }

        // 5. Calculate Price
        long days = ChronoUnit.DAYS.between(request.getCheckInDate(), request.getCheckOutDate());
        if (days <= 0) days = 1; // minimum 1 day charges
        double totalAmount = days * room.getPrice();

        // 6. Apply Promotion (if provided)
        if (request.getPromoCode() != null && !request.getPromoCode().trim().isEmpty()) {
            Promotion promo = promotionRepository.findByCode(request.getPromoCode().trim())
                    .orElseThrow(() -> new InvalidPromoCodeException("Invalid promo code: " + request.getPromoCode()));

            if (promo.getExpiryDate().isBefore(LocalDate.now())) {
                throw new InvalidPromoCodeException("Promo code has expired: " + request.getPromoCode());
            }

            // Treat discountAmount <= 1.0 as percentage, otherwise flat discount amount
            double discount = 0.0;
            if (promo.getDiscountAmount() > 0 && promo.getDiscountAmount() <= 1.0) {
                discount = totalAmount * promo.getDiscountAmount();
            } else {
                discount = promo.getDiscountAmount();
            }

            totalAmount = Math.max(0.0, totalAmount - discount);
        }

        // 7. Save Booking
        String reservationNum = "RES-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        Booking booking = Booking.builder()
                .userId(user.getId())
                .roomId(room.getId())
                .reservationNumber(reservationNum)
                .checkInDate(request.getCheckInDate())
                .checkOutDate(request.getCheckOutDate())
                .totalAmount(totalAmount)
                .status(BookingStatus.CONFIRMED)
                .build();

        Booking savedBooking = bookingRepository.save(booking);

        // Instantly update room's availability
        // room.setAvailable(false); // Make it generally unavailable if booked
        // roomRepository.save(room);

        // 8. Lookup Hotel
        Hotel hotel = hotelRepository.findById(room.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel not found with ID: " + room.getHotelId()));

        // 9. Trigger Email
        emailService.sendBookingConfirmation(savedBooking, user, room, hotel);

        return mapToResponseDto(savedBooking, user, room, hotel);
    }

    public List<BookingResponseDto> getUserBookingHistory(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException("User not found with ID: " + userId);
        }

        List<Booking> bookings = bookingRepository.findByUserId(userId);
        return bookings.stream().map(this::mapToResponseDto).collect(Collectors.toList());
    }

    @Transactional
    public BookingResponseDto quickRebook(Long bookingId, LocalDate newCheckIn, LocalDate newCheckOut) {
        Booking oldBooking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));

        BookingRequestDto rebookRequest = new BookingRequestDto(
                oldBooking.getUserId(),
                oldBooking.getRoomId(),
                newCheckIn,
                newCheckOut,
                null
        );

        return createBooking(rebookRequest);
    }

    public double validatePromoCode(String code) {
        Promotion promo = promotionRepository.findByCode(code.trim())
                .orElseThrow(() -> new InvalidPromoCodeException("Invalid promo code: " + code));

        if (promo.getExpiryDate().isBefore(LocalDate.now())) {
            throw new InvalidPromoCodeException("Promo code has expired: " + code);
        }

        return promo.getDiscountAmount();
    }

    public BookingResponseDto mapToResponseDto(Booking booking) {
        User user = userRepository.findById(booking.getUserId()).orElse(null);
        Room room = roomRepository.findById(booking.getRoomId()).orElse(null);
        Hotel hotel = (room != null) ? hotelRepository.findById(room.getHotelId()).orElse(null) : null;

        return mapToResponseDto(booking, user, room, hotel);
    }

    private BookingResponseDto mapToResponseDto(Booking booking, User user, Room room, Hotel hotel) {
        return BookingResponseDto.builder()
                .id(booking.getId())
                .userId(booking.getUserId())
                .userName(user != null ? user.getName() : "Unknown User")
                .roomId(booking.getRoomId())
                .roomCategory(room != null ? room.getRoomCategory() : "Unknown Category")
                .hotelId(room != null ? room.getHotelId() : null)
                .hotelName(hotel != null ? hotel.getName() : "Unknown Hotel")
                .hotelLocation(hotel != null ? hotel.getLocation() : "Unknown Location")
                .reservationNumber(booking.getReservationNumber())
                .checkInDate(booking.getCheckInDate())
                .checkOutDate(booking.getCheckOutDate())
                .totalAmount(booking.getTotalAmount())
                .status(booking.getStatus())
                .build();
    }
}

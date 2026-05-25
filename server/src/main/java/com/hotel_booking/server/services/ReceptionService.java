package com.hotel_booking.server.services;

import com.hotel_booking.server.dtos.BookingResponseDto;
import com.hotel_booking.server.exceptions.*;
import com.hotel_booking.server.models.entities.*;
import com.hotel_booking.server.models.enums.BookingStatus;
import com.hotel_booking.server.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReceptionService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private BookingService bookingService;

    public List<BookingResponseDto> getDailyArrivals(LocalDate date) {
        return bookingRepository.findAll().stream()
                .filter(b -> b.getCheckInDate().equals(date) &&
                        (b.getStatus() == BookingStatus.CONFIRMED || b.getStatus() == BookingStatus.PENDING))
                .map(bookingService::mapToResponseDto)
                .collect(Collectors.toList());
    }

    public List<BookingResponseDto> getDailyDepartures(LocalDate date) {
        return bookingRepository.findAll().stream()
                .filter(b -> b.getCheckOutDate().equals(date) && b.getStatus() == BookingStatus.CHECKED_IN)
                .map(bookingService::mapToResponseDto)
                .collect(Collectors.toList());
    }

    public long getCurrentRoomOccupancy() {
        return bookingRepository.findAll().stream()
                .filter(b -> b.getStatus() == BookingStatus.CHECKED_IN)
                .map(Booking::getRoomId)
                .distinct()
                .count();
    }

    @Transactional
    public BookingResponseDto checkIn(Long bookingId, String role) {
        validateReceptionist(role);

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));

        if (booking.getStatus() != BookingStatus.CONFIRMED && booking.getStatus() != BookingStatus.PENDING) {
            throw new InvalidBookingStatusTransitionException("Cannot check-in. Booking status must be CONFIRMED or PENDING, but was " + booking.getStatus());
        }

        booking.setStatus(BookingStatus.CHECKED_IN);
        Booking saved = bookingRepository.save(booking);
        return bookingService.mapToResponseDto(saved);
    }

    @Transactional
    public BookingResponseDto checkOut(Long bookingId, String role) {
        validateReceptionist(role);

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));

        if (booking.getStatus() != BookingStatus.CHECKED_IN) {
            throw new InvalidBookingStatusTransitionException("Cannot check-out. Booking must be CHECKED_IN first, but was " + booking.getStatus());
        }

        booking.setStatus(BookingStatus.CHECKED_OUT);
        Booking saved = bookingRepository.save(booking);

        // Also ensure room is marked back as available
        Room room = roomRepository.findById(booking.getRoomId()).orElse(null);
        if (room != null) {
            room.setAvailable(true);
            roomRepository.save(room);
        }

        return bookingService.mapToResponseDto(saved);
    }

    @Transactional
    public BookingResponseDto cancelBooking(Long bookingId, String role) {
        validateReceptionistOrAdmin(role);

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));

        if (booking.getStatus() == BookingStatus.CANCELLED || booking.getStatus() == BookingStatus.CHECKED_OUT) {
            throw new InvalidBookingStatusTransitionException("Booking is already " + booking.getStatus() + " and cannot be cancelled.");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        Booking saved = bookingRepository.save(booking);

        // Mark room as available again
        Room room = roomRepository.findById(booking.getRoomId()).orElse(null);
        if (room != null) {
            room.setAvailable(true);
            roomRepository.save(room);
        }

        return bookingService.mapToResponseDto(saved);
    }

    @Transactional
    public BookingResponseDto assignRoomToBooking(Long bookingId, Long newRoomId, String role) {
        validateReceptionist(role);

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));

        Room newRoom = roomRepository.findById(newRoomId)
                .orElseThrow(() -> new RoomUnavailableException("Room not found with ID: " + newRoomId));

        if (!newRoom.isAvailable()) {
            throw new RoomUnavailableException("Selected room is not available.");
        }

        // Update booking's room ID
        booking.setRoomId(newRoomId);
        Booking saved = bookingRepository.save(booking);
        return bookingService.mapToResponseDto(saved);
    }

    private void validateReceptionist(String role) {
        if (role == null || !role.equalsIgnoreCase("RECEPTIONIST")) {
            throw new UnauthorizedAccessException("Unauthorized. Only RECEPTIONIST accounts can perform this action.");
        }
    }

    private void validateReceptionistOrAdmin(String role) {
        if (role == null || (!role.equalsIgnoreCase("RECEPTIONIST") && !role.equalsIgnoreCase("ADMIN"))) {
            throw new UnauthorizedAccessException("Unauthorized. Only RECEPTIONIST or ADMIN accounts can perform this action.");
        }
    }
}

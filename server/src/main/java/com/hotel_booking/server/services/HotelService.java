package com.hotel_booking.server.services;

import com.hotel_booking.server.dtos.SearchRequestDto;
import com.hotel_booking.server.exceptions.InvalidDateRangeException;
import com.hotel_booking.server.models.entities.Booking;
import com.hotel_booking.server.models.entities.Hotel;
import com.hotel_booking.server.models.entities.Room;
import com.hotel_booking.server.models.enums.BookingStatus;
import com.hotel_booking.server.repositories.BookingRepository;
import com.hotel_booking.server.repositories.HotelRepository;
import com.hotel_booking.server.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    public Hotel createHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public List<Room> getRoomsByHotelId(Long hotelId) {
        return roomRepository.findByHotelId(hotelId);
    }

    public List<Room> searchRooms(SearchRequestDto search) {
        // Validate dates if they are provided
        if (search.getCheckInDate() != null && search.getCheckOutDate() != null) {
            if (!search.getCheckInDate().isBefore(search.getCheckOutDate())) {
                throw new InvalidDateRangeException("Check-in date must be strictly before check-out date.");
            }
        }

        // 1. Find matching hotels by location
        List<Hotel> matchingHotels;
        if (search.getLocation() != null && !search.getLocation().trim().isEmpty()) {
            matchingHotels = hotelRepository.findByLocationContainingIgnoreCase(search.getLocation().trim());
        } else {
            matchingHotels = hotelRepository.findAll();
        }

        if (matchingHotels.isEmpty()) {
            return new ArrayList<>();
        }

        List<Long> hotelIds = matchingHotels.stream().map(Hotel::getId).collect(Collectors.toList());

        // 2. Fetch rooms for these hotels
        double minPrice = search.getMinPrice() > 0 ? search.getMinPrice() : 0.0;
        double maxPrice = search.getMaxPrice() > 0 ? search.getMaxPrice() : Double.MAX_VALUE;

        List<Room> rooms = roomRepository.findByHotelIdInAndPriceBetweenAndIsAvailable(
                hotelIds, minPrice, maxPrice, true
        );

        // 3. Filter by Amenities (if provided)
        if (search.getAmenities() != null && !search.getAmenities().trim().isEmpty()) {
            String targetAmenity = search.getAmenities().toLowerCase().trim();
            rooms = rooms.stream()
                    .filter(room -> room.getAmenities() != null && room.getAmenities().toLowerCase().contains(targetAmenity))
                    .collect(Collectors.toList());
        }

        // 4. Filter by Date Availability (if checkInDate and checkOutDate are provided)
        if (search.getCheckInDate() != null && search.getCheckOutDate() != null) {
            LocalDate checkIn = search.getCheckInDate();
            LocalDate checkOut = search.getCheckOutDate();

            List<Booking> allBookings = bookingRepository.findAll();

            rooms = rooms.stream().filter(room -> {
                // Check if there is any overlapping booking for this room that is active (PENDING, CONFIRMED, CHECKED_IN)
                boolean hasOverlap = allBookings.stream().anyMatch(booking -> 
                    booking.getRoomId().equals(room.getId()) &&
                    (booking.getStatus() == BookingStatus.CONFIRMED || 
                     booking.getStatus() == BookingStatus.PENDING || 
                     booking.getStatus() == BookingStatus.CHECKED_IN) &&
                    !(booking.getCheckOutDate().isBefore(checkIn) || booking.getCheckInDate().isAfter(checkOut) || booking.getCheckOutDate().equals(checkIn) || booking.getCheckInDate().equals(checkOut))
                );
                return !hasOverlap;
            }).collect(Collectors.toList());
        }

        return rooms;
    }
}

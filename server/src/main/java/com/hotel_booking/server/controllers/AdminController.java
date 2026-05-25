package com.hotel_booking.server.controllers;

import com.hotel_booking.server.dtos.ApiResponse;
import com.hotel_booking.server.models.entities.Booking;
import com.hotel_booking.server.models.entities.User;
import com.hotel_booking.server.models.enums.Role;
import com.hotel_booking.server.repositories.BookingRepository;
import com.hotel_booking.server.repositories.UserRepository;
import com.hotel_booking.server.exceptions.UnauthorizedAccessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/bookings")
    public ResponseEntity<ApiResponse<List<Booking>>> overseeAllBookings(
            @RequestHeader(value = "X-Role", required = false, defaultValue = "ADMIN") String role) {
        validateAdminRole(role);
        List<Booking> bookings = bookingRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success("All bookings retrieved successfully for administration overview", bookings));
    }

    @PostMapping("/receptionists")
    public ResponseEntity<ApiResponse<User>> createReceptionistAccount(
            @RequestBody User user,
            @RequestHeader(value = "X-Role", required = false, defaultValue = "ADMIN") String role) {
        validateAdminRole(role);
        
        user.setRole(Role.RECEPTIONIST);
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(HttpStatus.BAD_REQUEST.value(), "Email is already registered."));
        }
        User saved = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(HttpStatus.CREATED.value(), "Receptionist account created successfully", saved));
    }

    private void validateAdminRole(String role) {
        if (role == null || !role.equalsIgnoreCase("ADMIN")) {
            throw new UnauthorizedAccessException("Unauthorized. Only ADMIN accounts can perform this action.");
        }
    }
}

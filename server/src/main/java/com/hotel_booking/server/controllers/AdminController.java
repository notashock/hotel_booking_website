package com.hotel_booking.server.controllers;

import com.hotel_booking.server.dtos.ApiResponse;
import com.hotel_booking.server.models.entities.Booking;
import com.hotel_booking.server.models.entities.User;
import com.hotel_booking.server.models.enums.Role;
import com.hotel_booking.server.dtos.AuthRequestDto;
import com.hotel_booking.server.repositories.BookingRepository;
import com.hotel_booking.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin") // Fully secured by SecurityConfig
// @CrossOrigin removed - handled globally by SecurityConfig
@RequiredArgsConstructor
public class AdminController {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/bookings")
    public ResponseEntity<ApiResponse<List<Booking>>> overseeAllBookings() {
        // No manual header validation needed. Spring Security guards this endpoint.
        List<Booking> bookings = bookingRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success("All bookings retrieved successfully for administration overview", bookings));
    }

    @PostMapping("/receptionists")
    public ResponseEntity<ApiResponse<User>> createReceptionistAccount(@RequestBody AuthRequestDto request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(HttpStatus.BAD_REQUEST.value(), "Email is already registered."));
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(Role.RECEPTIONIST)
                .build();

        User saved = userRepository.save(user);

        // 3. Security measure: Hide hash in the response payload
        saved.setPasswordHash(null);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(HttpStatus.CREATED.value(), "Receptionist account created successfully", saved));
    }
}
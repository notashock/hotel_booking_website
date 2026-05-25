package com.hotel_booking.server.controllers;

import com.hotel_booking.server.dtos.ApiResponse;
import com.hotel_booking.server.dtos.AuthRequestDto;
import com.hotel_booking.server.models.entities.User;
import com.hotel_booking.server.models.enums.Role;
import com.hotel_booking.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        List<User> users = userRepository.findAll();
        users.forEach(user -> user.setPasswordHash(null));
        return ResponseEntity.ok(ApiResponse.success("Users retrieved successfully", users));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<User>> createUser(@RequestBody AuthRequestDto request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(HttpStatus.BAD_REQUEST.value(), "Email is already registered."));
        }

        // 1. Determine the role safely (Default to CUSTOMER if not provided or invalid)
        Role assignedRole = Role.CUSTOMER;
        if (request.getRole() != null && !request.getRole().trim().isEmpty()) {
            try {
                assignedRole = Role.valueOf(request.getRole().toUpperCase().trim());
            } catch (IllegalArgumentException e) {
                assignedRole = Role.CUSTOMER;
            }
        }

        // 2. Map DTO to Entity
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(assignedRole)
                .build();

        User created = userRepository.save(user);
        created.setPasswordHash(null);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(HttpStatus.CREATED.value(), "Staff/User account provisioned successfully", created));
    }
}
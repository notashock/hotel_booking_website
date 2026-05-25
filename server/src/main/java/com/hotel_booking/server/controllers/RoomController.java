package com.hotel_booking.server.controllers;

import com.hotel_booking.server.dtos.ApiResponse;
import com.hotel_booking.server.models.entities.Room;
import com.hotel_booking.server.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Room>>> getAllRooms() {
        List<Room> rooms = roomRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success("All rooms retrieved successfully", rooms));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Room>> getRoomById(@PathVariable Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with ID: " + id));
        return ResponseEntity.ok(ApiResponse.success("Room retrieved successfully", room));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Room>> createRoom(
            @RequestBody Room room,
            @RequestHeader(value = "X-Role", required = false, defaultValue = "CUSTOMER") String role) {
        validateAdmin(role);
        Room saved = roomRepository.save(room);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(HttpStatus.CREATED.value(), "Room created successfully", saved));
    }

    @PutMapping("/{id}/availability")
    public ResponseEntity<ApiResponse<Room>> updateAvailability(
            @PathVariable Long id,
            @RequestParam boolean isAvailable,
            @RequestHeader(value = "X-Role", required = false, defaultValue = "CUSTOMER") String role) {
        validateAdmin(role);
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with ID: " + id));
        room.setAvailable(isAvailable);
        Room updated = roomRepository.save(room);
        return ResponseEntity.ok(ApiResponse.success("Room availability status updated successfully", updated));
    }

    private void validateAdmin(String role) {
        if (role == null || !role.equalsIgnoreCase("ADMIN")) {
            throw new com.hotel_booking.server.exceptions.UnauthorizedAccessException("Unauthorized. Only ADMIN accounts can perform this action.");
        }
    }
}

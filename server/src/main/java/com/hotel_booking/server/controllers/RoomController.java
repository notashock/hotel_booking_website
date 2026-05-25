package com.hotel_booking.server.controllers;

import com.hotel_booking.server.dtos.ApiResponse;
import com.hotel_booking.server.dtos.RoomRequestDto;
import com.hotel_booking.server.models.entities.Room;
import com.hotel_booking.server.repositories.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api") // Base path. Method annotations define the security boundaries.
// @CrossOrigin removed - handled globally by SecurityConfig
@RequiredArgsConstructor
public class RoomController {

    private final RoomRepository roomRepository;

    // ==========================================
    // CUSTOMER ENDPOINTS (Secured by /api/customer/**)
    // ==========================================

    @GetMapping("/customer/rooms")
    public ResponseEntity<ApiResponse<List<Room>>> getAllRooms() {
        List<Room> rooms = roomRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success("All rooms retrieved successfully", rooms));
    }

    @GetMapping("/customer/rooms/{id}")
    public ResponseEntity<ApiResponse<Room>> getRoomById(@PathVariable Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with ID: " + id));
        return ResponseEntity.ok(ApiResponse.success("Room retrieved successfully", room));
    }

    // ==========================================
    // ADMIN ENDPOINTS (Secured by /api/admin/**)
    // ==========================================

    @PostMapping("/admin/rooms")
    public ResponseEntity<ApiResponse<Room>> createRoom(@RequestBody RoomRequestDto request) {
        Room room = Room.builder()
                .hotelId(request.getHotelId())
                .roomCategory(request.getRoomCategory())
                .price(request.getPrice())
                .amenities(request.getAmenities())
                .isAvailable(request.isAvailable())
                .build();

        // No manual header validation needed. Spring Security guards this endpoint.
        Room saved = roomRepository.save(room);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(HttpStatus.CREATED.value(), "Room created successfully", saved));
    }

    @PutMapping("/admin/rooms/{id}/availability")
    public ResponseEntity<ApiResponse<Room>> updateAvailability(
            @PathVariable Long id,
            @RequestParam boolean isAvailable) {

        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with ID: " + id));

        room.setAvailable(isAvailable);
        Room updated = roomRepository.save(room);

        return ResponseEntity.ok(ApiResponse.success("Room availability status updated successfully", updated));
    }
}
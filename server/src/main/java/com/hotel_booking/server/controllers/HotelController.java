package com.hotel_booking.server.controllers;

import com.hotel_booking.server.dtos.ApiResponse;
import com.hotel_booking.server.dtos.SearchRequestDto;
import com.hotel_booking.server.models.entities.Hotel;
import com.hotel_booking.server.models.entities.Room;
import com.hotel_booking.server.services.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "*")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Hotel>>> getAllHotels() {
        List<Hotel> hotels = hotelService.getAllHotels();
        return ResponseEntity.ok(ApiResponse.success("Hotels retrieved successfully", hotels));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Hotel>> createHotel(
            @RequestBody Hotel hotel,
            @RequestHeader(value = "X-Role", required = false, defaultValue = "CUSTOMER") String role) {
        validateAdmin(role);
        Hotel created = hotelService.createHotel(hotel);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(HttpStatus.CREATED.value(), "Hotel created successfully", created));
    }

    @PostMapping("/rooms")
    public ResponseEntity<ApiResponse<Room>> createRoom(
            @RequestBody Room room,
            @RequestHeader(value = "X-Role", required = false, defaultValue = "CUSTOMER") String role) {
        validateAdmin(role);
        Room created = hotelService.createRoom(room);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(HttpStatus.CREATED.value(), "Room created successfully", created));
    }

    private void validateAdmin(String role) {
        if (role == null || !role.equalsIgnoreCase("ADMIN")) {
            throw new com.hotel_booking.server.exceptions.UnauthorizedAccessException("Unauthorized. Only ADMIN accounts can perform this action.");
        }
    }

    @GetMapping("/{hotelId}/rooms")
    public ResponseEntity<ApiResponse<List<Room>>> getRoomsByHotelId(@PathVariable Long hotelId) {
        List<Room> rooms = hotelService.getRoomsByHotelId(hotelId);
        return ResponseEntity.ok(ApiResponse.success("Rooms retrieved successfully for hotel ID: " + hotelId, rooms));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Room>>> searchRooms(SearchRequestDto searchRequest) {
        List<Room> rooms = hotelService.searchRooms(searchRequest);
        return ResponseEntity.ok(ApiResponse.success("Available rooms filtered and retrieved successfully", rooms));
    }
}

package com.hotel_booking.server.controllers;

import com.hotel_booking.server.dtos.ApiResponse;
import com.hotel_booking.server.dtos.HotelRequestDto;
import com.hotel_booking.server.dtos.SearchRequestDto;
import com.hotel_booking.server.models.entities.Hotel;
import com.hotel_booking.server.models.entities.Room;
import com.hotel_booking.server.services.HotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api") // Base path. Method annotations define the security boundaries.
@RequiredArgsConstructor
public class HotelController {

    private final HotelService hotelService;

    // ==========================================
    // CUSTOMER ENDPOINTS (Secured by /api/customer/**)
    // ==========================================

    @GetMapping("/customer/hotels")
    public ResponseEntity<ApiResponse<List<Hotel>>> getAllHotels() {
        List<Hotel> hotels = hotelService.getAllHotels();
        return ResponseEntity.ok(ApiResponse.success("Hotels retrieved successfully", hotels));
    }

    @GetMapping("/customer/hotels/{hotelId}/rooms")
    public ResponseEntity<ApiResponse<List<Room>>> getRoomsByHotelId(@PathVariable Long hotelId) {
        List<Room> rooms = hotelService.getRoomsByHotelId(hotelId);
        return ResponseEntity.ok(ApiResponse.success("Rooms retrieved successfully for hotel ID: " + hotelId, rooms));
    }

    @GetMapping("/customer/hotels/search")
    public ResponseEntity<ApiResponse<List<Room>>> searchRooms(SearchRequestDto searchRequest) {
        List<Room> rooms = hotelService.searchRooms(searchRequest);
        return ResponseEntity.ok(ApiResponse.success("Available rooms filtered and retrieved successfully", rooms));
    }

    // ==========================================
    // ADMIN ENDPOINTS (Secured by /api/admin/**)
    // ==========================================

    @PostMapping("/admin/hotels")
    public ResponseEntity<ApiResponse<Hotel>> createHotel(@RequestBody HotelRequestDto request) {
        Hotel hotel = Hotel.builder()
                .name(request.getName())
                .location(request.getLocation())
                .facilities(request.getFacilities())
                .build();

        Hotel created = hotelService.createHotel(hotel);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(HttpStatus.CREATED.value(), "Hotel created successfully", created));
    }

}
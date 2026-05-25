package com.hotel_booking.server.controllers;

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
    public ResponseEntity<List<Hotel>> getAllHotels() {
        return ResponseEntity.ok(hotelService.getAllHotels());
    }

    @PostMapping
    public ResponseEntity<Hotel> createHotel(@RequestBody Hotel hotel) {
        return ResponseEntity.status(HttpStatus.CREATED).body(hotelService.createHotel(hotel));
    }

    @PostMapping("/rooms")
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        return ResponseEntity.status(HttpStatus.CREATED).body(hotelService.createRoom(room));
    }

    @GetMapping("/{hotelId}/rooms")
    public ResponseEntity<List<Room>> getRoomsByHotelId(@PathVariable Long hotelId) {
        return ResponseEntity.ok(hotelService.getRoomsByHotelId(hotelId));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Room>> searchRooms(SearchRequestDto searchRequest) {
        return ResponseEntity.ok(hotelService.searchRooms(searchRequest));
    }
}

package com.hotel_booking.server.controllers;

import com.hotel_booking.server.dtos.BookingResponseDto;
import com.hotel_booking.server.services.ReceptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reception")
@CrossOrigin(origins = "*")
public class ReceptionController {

    @Autowired
    private ReceptionService receptionService;

    @GetMapping("/arrivals")
    public ResponseEntity<List<BookingResponseDto>> getDailyArrivals(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        LocalDate targetDate = (date != null) ? date : LocalDate.now();
        return ResponseEntity.ok(receptionService.getDailyArrivals(targetDate));
    }

    @GetMapping("/departures")
    public ResponseEntity<List<BookingResponseDto>> getDailyDepartures(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        LocalDate targetDate = (date != null) ? date : LocalDate.now();
        return ResponseEntity.ok(receptionService.getDailyDepartures(targetDate));
    }

    @GetMapping("/occupancy")
    public ResponseEntity<Long> getCurrentRoomOccupancy() {
        return ResponseEntity.ok(receptionService.getCurrentRoomOccupancy());
    }

    @PostMapping("/{bookingId}/check-in")
    public ResponseEntity<BookingResponseDto> checkIn(
            @PathVariable Long bookingId,
            @RequestHeader(value = "X-Role", required = false, defaultValue = "RECEPTIONIST") String role) {
        return ResponseEntity.ok(receptionService.checkIn(bookingId, role));
    }

    @PostMapping("/{bookingId}/check-out")
    public ResponseEntity<BookingResponseDto> checkOut(
            @PathVariable Long bookingId,
            @RequestHeader(value = "X-Role", required = false, defaultValue = "RECEPTIONIST") String role) {
        return ResponseEntity.ok(receptionService.checkOut(bookingId, role));
    }

    @PostMapping("/{bookingId}/cancel")
    public ResponseEntity<BookingResponseDto> cancelBooking(@PathVariable Long bookingId) {
        return ResponseEntity.ok(receptionService.cancelBooking(bookingId));
    }

    @PostMapping("/{bookingId}/assign-room")
    public ResponseEntity<BookingResponseDto> assignRoomToBooking(
            @PathVariable Long bookingId,
            @RequestParam Long newRoomId,
            @RequestHeader(value = "X-Role", required = false, defaultValue = "RECEPTIONIST") String role) {
        return ResponseEntity.ok(receptionService.assignRoomToBooking(bookingId, newRoomId, role));
    }
}

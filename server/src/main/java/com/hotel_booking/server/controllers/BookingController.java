package com.hotel_booking.server.controllers;

import com.hotel_booking.server.dtos.BookingRequestDto;
import com.hotel_booking.server.dtos.BookingResponseDto;
import com.hotel_booking.server.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponseDto> createBooking(@RequestBody BookingRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookingService.createBooking(request));
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<List<BookingResponseDto>> getUserBookingHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getUserBookingHistory(userId));
    }

    @PostMapping("/{bookingId}/rebook")
    public ResponseEntity<BookingResponseDto> quickRebook(
            @PathVariable Long bookingId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate) {
        return ResponseEntity.ok(bookingService.quickRebook(bookingId, checkInDate, checkOutDate));
    }

    @GetMapping("/promotions/validate")
    public ResponseEntity<Double> validatePromoCode(@RequestParam String code) {
        return ResponseEntity.ok(bookingService.validatePromoCode(code));
    }
}

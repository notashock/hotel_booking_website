package com.hotel_booking.server.controllers;

import com.hotel_booking.server.dtos.ApiResponse;
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
    public ResponseEntity<ApiResponse<BookingResponseDto>> createBooking(@RequestBody BookingRequestDto request) {
        BookingResponseDto response = bookingService.createBooking(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(HttpStatus.CREATED.value(), "Booking completed successfully", response));
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<ApiResponse<List<BookingResponseDto>>> getUserBookingHistory(@PathVariable Long userId) {
        List<BookingResponseDto> history = bookingService.getUserBookingHistory(userId);
        return ResponseEntity.ok(ApiResponse.success("User booking history retrieved successfully", history));
    }

    @PostMapping("/{bookingId}/rebook")
    public ResponseEntity<ApiResponse<BookingResponseDto>> quickRebook(
            @PathVariable Long bookingId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate) {
        BookingResponseDto response = bookingService.quickRebook(bookingId, checkInDate, checkOutDate);
        return ResponseEntity.ok(ApiResponse.success("Quick rebooking completed successfully", response));
    }

    @GetMapping("/promotions/validate")
    public ResponseEntity<ApiResponse<Double>> validatePromoCode(@RequestParam String code) {
        double discount = bookingService.validatePromoCode(code);
        return ResponseEntity.ok(ApiResponse.success("Promotion code is valid", discount));
    }
}

package com.hotel_booking.server.controllers;

import com.hotel_booking.server.dtos.ApiResponse;
import com.hotel_booking.server.dtos.BookingRequestDto;
import com.hotel_booking.server.dtos.BookingResponseDto;
import com.hotel_booking.server.models.entities.User;
import com.hotel_booking.server.services.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/customer/bookings")
// @CrossOrigin removed - handled globally by SecurityConfig
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    private User getAuthenticatedUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @PostMapping
    public ResponseEntity<ApiResponse<BookingResponseDto>> createBooking(@RequestBody BookingRequestDto request) {
        User authUser = getAuthenticatedUser();
        request.setUserId(authUser.getId());

        BookingResponseDto response = bookingService.createBooking(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(HttpStatus.CREATED.value(), "Booking completed successfully", response));
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<List<BookingResponseDto>>> getUserBookingHistory() {
        Long authUserId = getAuthenticatedUser().getId();

        List<BookingResponseDto> history = bookingService.getUserBookingHistory(authUserId);
        return ResponseEntity.ok(ApiResponse.success("User booking history retrieved successfully", history));
    }

    @PutMapping("/{bookingId}/rebook")
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
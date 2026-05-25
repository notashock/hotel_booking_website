package com.hotel_booking.server.controllers;

import com.hotel_booking.server.dtos.ApiResponse;
import com.hotel_booking.server.dtos.BookingResponseDto;
import com.hotel_booking.server.services.ReceptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reception") // Secured by /api/reception/** in SecurityConfig
// @CrossOrigin removed - handled globally by SecurityConfig
@RequiredArgsConstructor
public class ReceptionController {

    private final ReceptionService receptionService;

    // Helper method to extract the cryptographically verified role from the JWT
    // This allows us to pass the role to the service layer without relying on fakeable headers.
    private String getAuthenticatedRole() {
        return SecurityContextHolder.getContext().getAuthentication()
                .getAuthorities().iterator().next().getAuthority();
    }

    @GetMapping("/arrivals")
    public ResponseEntity<ApiResponse<List<BookingResponseDto>>> getDailyArrivals(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        LocalDate targetDate = (date != null) ? date : LocalDate.now();
        List<BookingResponseDto> arrivals = receptionService.getDailyArrivals(targetDate);
        return ResponseEntity.ok(ApiResponse.success("Daily arrivals retrieved successfully for date: " + targetDate, arrivals));
    }

    @GetMapping("/departures")
    public ResponseEntity<ApiResponse<List<BookingResponseDto>>> getDailyDepartures(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        LocalDate targetDate = (date != null) ? date : LocalDate.now();
        List<BookingResponseDto> departures = receptionService.getDailyDepartures(targetDate);
        return ResponseEntity.ok(ApiResponse.success("Daily departures retrieved successfully for date: " + targetDate, departures));
    }

    @GetMapping("/occupancy")
    public ResponseEntity<ApiResponse<Long>> getCurrentRoomOccupancy() {
        long occupancy = receptionService.getCurrentRoomOccupancy();
        return ResponseEntity.ok(ApiResponse.success("Current room occupancy retrieved successfully", occupancy));
    }

    @PutMapping("/{bookingId}/check-in")
    public ResponseEntity<ApiResponse<BookingResponseDto>> checkIn(@PathVariable Long bookingId) {
        // Pass the secure role from the JWT directly to the service
        BookingResponseDto response = receptionService.checkIn(bookingId, getAuthenticatedRole());
        return ResponseEntity.ok(ApiResponse.success("Customer check-in completed successfully", response));
    }

    @PutMapping("/{bookingId}/check-out")
    public ResponseEntity<ApiResponse<BookingResponseDto>> checkOut(@PathVariable Long bookingId) {
        BookingResponseDto response = receptionService.checkOut(bookingId, getAuthenticatedRole());
        return ResponseEntity.ok(ApiResponse.success("Customer check-out completed successfully", response));
    }

    @PutMapping("/{bookingId}/cancel")
    public ResponseEntity<ApiResponse<BookingResponseDto>> cancelBooking(@PathVariable Long bookingId) {
        BookingResponseDto response = receptionService.cancelBooking(bookingId, getAuthenticatedRole());
        return ResponseEntity.ok(ApiResponse.success("Booking cancelled successfully", response));
    }

    @PutMapping("/{bookingId}/assign-room")
    public ResponseEntity<ApiResponse<BookingResponseDto>> assignRoomToBooking(
            @PathVariable Long bookingId,
            @RequestParam Long newRoomId) {
        BookingResponseDto response = receptionService.assignRoomToBooking(bookingId, newRoomId, getAuthenticatedRole());
        return ResponseEntity.ok(ApiResponse.success("Physical room assigned to booking successfully", response));
    }

    @PutMapping("/{bookingId}/dates")
    public ResponseEntity<ApiResponse<BookingResponseDto>> updateBookingDates(
            @PathVariable Long bookingId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate) {
        BookingResponseDto response = receptionService.updateBookingDates(bookingId, checkInDate, checkOutDate, getAuthenticatedRole());
        return ResponseEntity.ok(ApiResponse.success("Booking dates updated successfully", response));
    }
}
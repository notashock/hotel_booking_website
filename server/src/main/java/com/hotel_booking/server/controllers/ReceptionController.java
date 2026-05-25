package com.hotel_booking.server.controllers;

import com.hotel_booking.server.dtos.ApiResponse;
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

    @PostMapping("/{bookingId}/check-in")
    public ResponseEntity<ApiResponse<BookingResponseDto>> checkIn(
            @PathVariable Long bookingId,
            @RequestHeader(value = "X-Role", required = false, defaultValue = "RECEPTIONIST") String role) {
        BookingResponseDto response = receptionService.checkIn(bookingId, role);
        return ResponseEntity.ok(ApiResponse.success("Customer check-in completed successfully", response));
    }

    @PostMapping("/{bookingId}/check-out")
    public ResponseEntity<ApiResponse<BookingResponseDto>> checkOut(
            @PathVariable Long bookingId,
            @RequestHeader(value = "X-Role", required = false, defaultValue = "RECEPTIONIST") String role) {
        BookingResponseDto response = receptionService.checkOut(bookingId, role);
        return ResponseEntity.ok(ApiResponse.success("Customer check-out completed successfully", response));
    }

    @PostMapping("/{bookingId}/cancel")
    public ResponseEntity<ApiResponse<BookingResponseDto>> cancelBooking(
            @PathVariable Long bookingId,
            @RequestHeader(value = "X-Role", required = false, defaultValue = "RECEPTIONIST") String role) {
        BookingResponseDto response = receptionService.cancelBooking(bookingId, role);
        return ResponseEntity.ok(ApiResponse.success("Booking cancelled successfully", response));
    }

    @PostMapping("/{bookingId}/assign-room")
    public ResponseEntity<ApiResponse<BookingResponseDto>> assignRoomToBooking(
            @PathVariable Long bookingId,
            @RequestParam Long newRoomId,
            @RequestHeader(value = "X-Role", required = false, defaultValue = "RECEPTIONIST") String role) {
        BookingResponseDto response = receptionService.assignRoomToBooking(bookingId, newRoomId, role);
        return ResponseEntity.ok(ApiResponse.success("Physical room assigned to booking successfully", response));
    }
}

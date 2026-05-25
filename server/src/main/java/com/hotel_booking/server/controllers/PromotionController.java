package com.hotel_booking.server.controllers;

import com.hotel_booking.server.dtos.ApiResponse;
import com.hotel_booking.server.models.entities.Promotion;
import com.hotel_booking.server.repositories.PromotionRepository;
import com.hotel_booking.server.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/promotions")
@CrossOrigin(origins = "*")
public class PromotionController {

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Promotion>>> getAllPromotions() {
        List<Promotion> promotions = promotionRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success("All promotions retrieved successfully", promotions));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Promotion>> createPromotion(
            @RequestBody Promotion promotion,
            @RequestHeader(value = "X-Role", required = false, defaultValue = "CUSTOMER") String role) {
        validateAdmin(role);
        Promotion saved = promotionRepository.save(promotion);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(HttpStatus.CREATED.value(), "Promotion discount code created successfully", saved));
    }

    private void validateAdmin(String role) {
        if (role == null || !role.equalsIgnoreCase("ADMIN")) {
            throw new com.hotel_booking.server.exceptions.UnauthorizedAccessException("Unauthorized. Only ADMIN accounts can perform this action.");
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<ApiResponse<Double>> validatePromoCode(@RequestParam String code) {
        double discount = bookingService.validatePromoCode(code);
        return ResponseEntity.ok(ApiResponse.success("Promotion code is valid", discount));
    }
}

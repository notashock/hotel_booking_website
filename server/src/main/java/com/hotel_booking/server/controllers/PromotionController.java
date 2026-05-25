package com.hotel_booking.server.controllers;

import com.hotel_booking.server.dtos.ApiResponse;
import com.hotel_booking.server.dtos.PromotionRequestDto;
import com.hotel_booking.server.models.entities.Promotion;
import com.hotel_booking.server.repositories.PromotionRepository;
import com.hotel_booking.server.services.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api") // Base path. Method annotations define the security boundaries.
// @CrossOrigin removed - handled globally by SecurityConfig
@RequiredArgsConstructor
public class PromotionController {

    private final PromotionRepository promotionRepository;
    private final BookingService bookingService;

    // ==========================================
    // ADMIN ENDPOINTS (Secured by /api/admin/**)
    // ==========================================

    @GetMapping("/admin/promotions")
    public ResponseEntity<ApiResponse<List<Promotion>>> getAllPromotions() {
        // Only Admins need to monitor all active promotional codes
        List<Promotion> promotions = promotionRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success("All promotions retrieved successfully", promotions));
    }

    @PostMapping("/admin/promotions")
    public ResponseEntity<ApiResponse<Promotion>> createPromotion(@RequestBody PromotionRequestDto request) {
        Promotion promotion = Promotion.builder()
                .code(request.getCode())
                .discountAmount(request.getDiscountAmount())
                .type(request.getType())
                .expiryDate(request.getExpiryDate())
                .build();

        // No manual header validation needed. Spring Security guards this endpoint.
        Promotion saved = promotionRepository.save(promotion);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(HttpStatus.CREATED.value(), "Promotion discount code created successfully", saved));
    }

    // ==========================================
    // CUSTOMER ENDPOINTS (Secured by /api/customer/**)
    // ==========================================

    @GetMapping("/customer/promotions/validate")
    public ResponseEntity<ApiResponse<Double>> validatePromoCode(@RequestParam String code) {
        double discount = bookingService.validatePromoCode(code);
        return ResponseEntity.ok(ApiResponse.success("Promotion code is valid", discount));
    }
}
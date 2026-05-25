package com.hotel_booking.server.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PromotionRequestDto {
    private String code;
    private double discountAmount;
    private String type;
    private LocalDate expiryDate;
}

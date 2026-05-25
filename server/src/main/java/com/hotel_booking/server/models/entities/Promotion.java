package com.hotel_booking.server.models.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "promotions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private double discountAmount; // could be percentage (e.g. 0.10 for 10%) or absolute value. Let's treat it as percentage or flat amount. Let's make it flat amount or support percentage, flat is easy to apply! Let's treat it as a discount amount (e.g., flat $20 or 20% depending on design. We can implement it as a percentage or a flat discount amount, let's treat it as a percentage/amount and describe it!)

    @Column(nullable = false)
    private String type; // e.g., "loyalty", "seasonal"

    @Column(nullable = false)
    private LocalDate expiryDate;
}

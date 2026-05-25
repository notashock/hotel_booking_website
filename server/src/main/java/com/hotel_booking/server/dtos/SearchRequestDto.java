package com.hotel_booking.server.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchRequestDto {
    private String location;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private double minPrice;
    private double maxPrice;
    private String amenities; // e.g., "WiFi, Pool" or single amenity
}

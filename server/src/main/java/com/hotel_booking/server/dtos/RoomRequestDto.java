package com.hotel_booking.server.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomRequestDto {
    private Long hotelId;
    private String roomCategory;
    private double price;
    private String amenities;

    @JsonProperty("isAvailable")
    private boolean isAvailable;
}

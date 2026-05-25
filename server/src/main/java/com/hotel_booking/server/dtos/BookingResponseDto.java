package com.hotel_booking.server.dtos;

import com.hotel_booking.server.models.enums.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponseDto {
    private Long id;
    private Long userId;
    private String userName;
    private Long roomId;
    private String roomCategory;
    private Long hotelId;
    private String hotelName;
    private String hotelLocation;
    private String reservationNumber;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private double totalAmount;
    private BookingStatus status;
}

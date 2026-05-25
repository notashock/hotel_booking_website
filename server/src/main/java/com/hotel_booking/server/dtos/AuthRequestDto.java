package com.hotel_booking.server.dtos;

import com.hotel_booking.server.models.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequestDto {
    private String name;
    private String email;
    private String password;
    private String role; // Optional: Can be CUSTOMER, ADMIN, or RECEPTIONIST
}
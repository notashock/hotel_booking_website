package com.hotel_booking.server.exceptions;

public class InvalidBookingStatusTransitionException extends RuntimeException {
    public InvalidBookingStatusTransitionException(String message) {
        super(message);
    }
}

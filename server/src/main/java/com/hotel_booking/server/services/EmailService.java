package com.hotel_booking.server.services;

import com.hotel_booking.server.models.entities.Booking;
import com.hotel_booking.server.models.entities.Hotel;
import com.hotel_booking.server.models.entities.Room;
import com.hotel_booking.server.models.entities.User;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Async
    public void sendBookingConfirmation(Booking booking, User user, Room room, Hotel hotel) {
        System.out.println("====================================================================");
        System.out.println("                     EMAIL CONFIRMATION TRIGGERED                   ");
        System.out.println("====================================================================");
        System.out.println("To: " + user.getEmail());
        System.out.println("Subject: Booking Confirmed! Reservation: #" + booking.getReservationNumber());
        System.out.println("--------------------------------------------------------------------");
        System.out.println("Dear " + user.getName() + ",");
        System.out.println("Thank you for choosing our portal. Your booking is confirmed!");
        System.out.println();
        System.out.println("Booking Details:");
        System.out.println("  Hotel:        " + hotel.getName());
        System.out.println("  Location:     " + hotel.getLocation());
        System.out.println("  Room Category:" + room.getRoomCategory());
        System.out.println("  Amenities:    " + room.getAmenities());
        System.out.println("  Check-In:     " + booking.getCheckInDate());
        System.out.println("  Check-Out:    " + booking.getCheckOutDate());
        System.out.println("  Total Amount: $" + booking.getTotalAmount());
        System.out.println("  Status:       " + booking.getStatus());
        System.out.println("--------------------------------------------------------------------");
        System.out.println("We hope you enjoy your stay!");
        System.out.println("====================================================================");
    }
}

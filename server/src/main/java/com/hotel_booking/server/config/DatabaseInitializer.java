package com.hotel_booking.server.config;

import com.hotel_booking.server.models.entities.*;
import com.hotel_booking.server.models.enums.Role;
import com.hotel_booking.server.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.util.Arrays;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Initializing H2 Database with Mock Data...");

        // 1. Seed Users
        if (userRepository.count() == 0) {
            User customer = User.builder()
                    .name("John Doe")
                    .email("john@hotel.com")
                    .passwordHash("password")
                    .role(Role.CUSTOMER)
                    .build();

            User receptionist = User.builder()
                    .name("Alice Smith")
                    .email("receptionist@hotel.com")
                    .passwordHash("password")
                    .role(Role.RECEPTIONIST)
                    .build();

            User admin = User.builder()
                    .name("Bob Jones")
                    .email("admin@hotel.com")
                    .passwordHash("password")
                    .role(Role.ADMIN)
                    .build();

            userRepository.saveAll(Arrays.asList(customer, receptionist, admin));
            System.out.println("Seeded Users: Customer (john@hotel.com), Receptionist (receptionist@hotel.com), Admin (admin@hotel.com)");
        }

        // 2. Seed Hotels
        if (hotelRepository.count() == 0) {
            Hotel hyatt = Hotel.builder()
                    .name("Grand Hyatt")
                    .location("New York")
                    .facilities("WiFi, Pool, Spa, Gym, Restaurant, Lounge")
                    .build();

            Hotel marriott = Hotel.builder()
                    .name("Marriott Resort")
                    .location("Miami")
                    .facilities("WiFi, Beach Access, Pool, Spa, Poolside Bar")
                    .build();

            Hotel hilton = Hotel.builder()
                    .name("Hilton Garden")
                    .location("Chicago")
                    .facilities("WiFi, Gym, Parking, Business Center")
                    .build();

            hotelRepository.saveAll(Arrays.asList(hyatt, marriott, hilton));
            System.out.println("Seeded Hotels: Grand Hyatt (New York), Marriott Resort (Miami), Hilton Garden (Chicago)");

            // 3. Seed Rooms (only if hotels were just created to ensure valid hotel IDs)
            if (roomRepository.count() == 0) {
                // Grand Hyatt Room (NY)
                Room room1 = Room.builder()
                        .hotelId(hyatt.getId())
                        .roomCategory("Deluxe")
                        .price(250.0)
                        .amenities("King Bed, AC, Ocean View, Mini Bar, TV")
                        .isAvailable(true)
                        .build();

                Room room2 = Room.builder()
                        .hotelId(hyatt.getId())
                        .roomCategory("Suite")
                        .price(450.0)
                        .amenities("King Bed, AC, Jacuzzi, Balcony, Coffee Maker")
                        .isAvailable(true)
                        .build();

                Room room3 = Room.builder()
                        .hotelId(hyatt.getId())
                        .roomCategory("Standard")
                        .price(120.0)
                        .amenities("Queen Bed, AC, TV")
                        .isAvailable(true)
                        .build();

                // Marriott Resort Room (Miami)
                Room room4 = Room.builder()
                        .hotelId(marriott.getId())
                        .roomCategory("Suite")
                        .price(500.0)
                        .amenities("King Bed, AC, Ocean View, Balcony, Fridge")
                        .isAvailable(true)
                        .build();

                Room room5 = Room.builder()
                        .hotelId(marriott.getId())
                        .roomCategory("Standard")
                        .price(150.0)
                        .amenities("Double Bed, AC, TV")
                        .isAvailable(true)
                        .build();

                // Hilton Garden Room (Chicago)
                Room room6 = Room.builder()
                        .hotelId(hilton.getId())
                        .roomCategory("Deluxe")
                        .price(180.0)
                        .amenities("Queen Bed, AC, TV, Coffee Maker, Desk")
                        .isAvailable(true)
                        .build();

                roomRepository.saveAll(Arrays.asList(room1, room2, room3, room4, room5, room6));
                System.out.println("Seeded " + roomRepository.count() + " Rooms for the seeded hotels.");
            }
        }

        // 4. Seed Promotions
        if (promotionRepository.count() == 0) {
            Promotion promo1 = Promotion.builder()
                    .code("WELCOME10")
                    .discountAmount(0.10) // 10%
                    .type("seasonal")
                    .expiryDate(LocalDate.now().plusDays(30))
                    .build();

            Promotion promo2 = Promotion.builder()
                    .code("SUPER20")
                    .discountAmount(20.0) // Flat $20
                    .type("seasonal")
                    .expiryDate(LocalDate.now().plusDays(15))
                    .build();

            Promotion promo3 = Promotion.builder()
                    .code("LOYAL50")
                    .discountAmount(0.50) // 50%
                    .type("loyalty")
                    .expiryDate(LocalDate.now().plusDays(60))
                    .build();

            Promotion promoExpired = Promotion.builder()
                    .code("EXPIRED")
                    .discountAmount(0.15) // 15%
                    .type("seasonal")
                    .expiryDate(LocalDate.now().minusDays(5)) // Expired 5 days ago
                    .build();

            promotionRepository.saveAll(Arrays.asList(promo1, promo2, promo3, promoExpired));
            System.out.println("Seeded Promotions: WELCOME10 (10%), SUPER20 (Flat $20), LOYAL50 (50%), EXPIRED (Expired)");
        }

        System.out.println("Mock Data Seeding Complete!");
    }
}

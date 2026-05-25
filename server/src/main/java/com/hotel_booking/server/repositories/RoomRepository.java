package com.hotel_booking.server.repositories;

import com.hotel_booking.server.models.entities.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByHotelId(Long hotelId);
    List<Room> findByHotelIdInAndPriceBetweenAndIsAvailable(List<Long> hotelIds, double minPrice, double maxPrice, boolean isAvailable);
    List<Room> findByPriceBetweenAndIsAvailable(double minPrice, double maxPrice, boolean isAvailable);
}

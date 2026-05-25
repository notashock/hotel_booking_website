import { useEffect, useState } from "react";

import HotelList from "../components/HotelList";

import SearchAndFilter from "../components/SearchAndFilter";

import { getAllHotels }
from "../services/hotelService";

const Hotels = () => {

  const [hotels, setHotels] = useState([]);

  const [filters, setFilters] =
  useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    amenities: "",
    checkInDate: "",
    checkOutDate: "",
  });

  useEffect(() => {

    fetchHotels();

  }, []);

  const fetchHotels = async () => {

    try {

      const data = await getAllHotels();

      setHotels(data);

    } catch (error) {

      console.log(error);
    }
  };

 const filteredHotels = hotels.filter(
  (hotel) => {

    const matchesLocation =
      hotel.location
        .toLowerCase()
        .includes(
          filters.location.toLowerCase()
        );

    const matchesAmenities =
      hotel.facilities
        .toLowerCase()
        .includes(
          filters.amenities.toLowerCase()
        );

    const matchesPrice =
      hotel.rooms?.some((room) => {

        const price =
          Number(room.price);

        const min =
          filters.minPrice
            ? Number(filters.minPrice)
            : 0;

        const max =
          filters.maxPrice
            ? Number(filters.maxPrice)
            : Infinity;

        return (
          price >= min &&
          price <= max
        );
      });

    return (
      matchesLocation &&
      matchesAmenities &&
      matchesPrice
    );
  }
);

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-6">
        Hotels
      </h1>

      <SearchAndFilter
  filters={filters}
  setFilters={setFilters}
/>

      <HotelList hotels={filteredHotels} />

    </div>
  );
};

export default Hotels;
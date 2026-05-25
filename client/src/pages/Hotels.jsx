import { useEffect, useState } from "react";

import HotelList from "../components/HotelList";

import SearchAndFilter from "../components/SearchAndFilter";

import { getAllHotels }
from "../services/hotelService";

const Hotels = () => {

  const [hotels, setHotels] = useState([]);

  const [search, setSearch] = useState("");

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
    (hotel) =>
      hotel.location
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-6">
        Hotels
      </h1>

      <SearchAndFilter
        search={search}
        setSearch={setSearch}
      />

      <HotelList hotels={filteredHotels} />

    </div>
  );
};

export default Hotels;
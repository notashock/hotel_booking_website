import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotelById }from "../services/hotelService";
import {BookingForm} from "../components/BookingForm";
import { MdLocationOn } from "react-icons/md";


const HotelDetails = () => {

  const { id } = useParams();

  const [hotel, setHotel] = useState(null);

  useEffect(() => {

    fetchHotel();

  }, []);

  const fetchHotel = async () => {

    try {

      const data =
        await getHotelById(id);

      setHotel(data);

    } catch (error) {

      console.log(error);
    }
  };

  if (!hotel) {

    return (
      <h1 className="text-center mt-10">
        Loading...
      </h1>
    );
  }

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-4">
        {hotel.name}
      </h1>

     <p className="mb-2 flex items-center gap-1">
  <MdLocationOn className="text-red-500 text-lg" />
  {hotel.location}
</p>

      <p className="mb-8">
        {hotel.facilities}
      </p>

      <h2 className="text-3xl font-bold mb-5">
        Available Rooms
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {
          hotel.rooms.map((room) => (

            <div
              key={room.id}
              className="bg-white shadow-lg rounded-xl p-5"
            >

              <h3 className="text-2xl font-bold mb-3">
                {room.roomCategory}
              </h3>

              <p className="mb-2">
                ₹ {room.price}
              </p>

              <p className="mb-4">
                {room.amenities}
              </p>

               <BookingForm
  roomId={room.id}
  price={room.price}
/>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default HotelDetails;
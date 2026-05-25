import { useState } from "react";
import {searchReservation} from "../services/receptionService";

const ReservationSearch = () => {

  const [reservationNumber,
    setReservationNumber] =
      useState("");

  const [booking, setBooking] =
    useState(null);

  const handleSearch =
    async () => {

      try {
        const data =await searchReservation(reservationNumber);
        setBooking(data);

      } catch (error) {

        console.log(error);

        alert("Reservation Not Found");
      }
    };

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg">

      <h2 className="text-3xl font-bold mb-5">
        Reservation Search
      </h2>

      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Enter Reservation Number"
          value={reservationNumber}
          onChange={(e) =>
            setReservationNumber(
              e.target.value
            )
          }
          className="border p-3 rounded w-full"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-5 py-3 rounded"
        >
          Search
        </button>

      </div>

      {
        booking && (

          <div className="bg-gray-100 p-5 rounded-lg">

            <h3 className="text-2xl font-bold mb-3">
              {booking.customerName}
            </h3>

            <p>
              Reservation:
              {" "}
              {booking.reservationNumber}
            </p>

            <p>
              Hotel:
              {" "}
              {booking.hotelName}
            </p>

            <p>
              Room:
              {" "}
              {booking.roomCategory}
            </p>

            <p>
              Status:
              {" "}
              {booking.status}
            </p>

            <p>
              Check-In:
              {" "}
              {booking.checkInDate}
            </p>

            <p>
              Check-Out:
              {" "}
              {booking.checkOutDate}
            </p>

          </div>
        )
      }

    </div>
  );
};

export default ReservationSearch;

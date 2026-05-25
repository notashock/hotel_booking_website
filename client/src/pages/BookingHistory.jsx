import {
  useEffect,
  useState,
} from "react";

import {
  getBookingHistory,
} from "../services/bookingService";

const BookingHistory = () => {

  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings = async () => {

    try {

      const data =
        await getBookingHistory();

      setBookings(data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-6">
        Booking History
      </h1>

      <div className="space-y-5">

        {
          bookings.map((booking) => (

            <div
              key={booking.id}
              className="bg-white p-5 rounded-xl shadow"
            >

              <h2 className="text-2xl font-bold mb-2">
                {booking.hotelName}
              </h2>

              <p>
                Reservation:
                {" "}
                {booking.reservationNumber}
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
          ))
        }

      </div>

    </div>
  );
};

export default BookingHistory;
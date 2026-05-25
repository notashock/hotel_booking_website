import {
  useEffect,
  useState,
} from "react";

import {
  getDailyDepartures,
  checkOutBooking,
} from "../services/receptionService";

const DailyDepartures = () => {

  const [departures, setDepartures] =
    useState([]);

  useEffect(() => {

    fetchDepartures();

  }, []);

  const fetchDepartures = async () => {

    try {

      const data =
        await getDailyDepartures();

      setDepartures(data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleCheckOut =
    async (bookingId) => {

      try {

        await checkOutBooking(
          bookingId
        );

        alert(
          "Customer Checked-Out"
        );

        fetchDepartures();

      } catch (error) {

        console.log(error);

        alert(
          "Check-Out Failed"
        );
      }
    };

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-6">
        Daily Departures
      </h1>

      <div className="space-y-5">

        {
          departures.map((booking) => (

            <div
              key={booking.id}
              className="bg-white p-6 rounded-xl shadow-lg"
            >

              <h2 className="text-2xl font-bold mb-2">
                {booking.customerName}
              </h2>

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
                Physical Room:
                {" "}
                {booking.roomNumber}
              </p>

              <p>
                Check-Out Date:
                {" "}
                {booking.checkOutDate}
              </p>

              <button
                onClick={() =>
                  handleCheckOut(
                    booking.id
                  )
                }
                className="bg-red-600 text-white px-4 py-2 rounded mt-4"
              >
                Process Check-Out
              </button>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default DailyDepartures;
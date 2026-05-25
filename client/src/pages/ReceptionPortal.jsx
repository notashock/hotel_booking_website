import {
  useEffect,
  useState,
} from "react";

import {
  getDailyArrivals,
  checkInBooking,
  checkOutBooking,
} from "../services/receptionService";

const ReceptionPortal = () => {

  const [arrivals, setArrivals] =
    useState([]);

  useEffect(() => {

    fetchArrivals();

  }, []);

  const fetchArrivals = async () => {

    try {

      const data =
        await getDailyArrivals();

      setArrivals(data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleCheckIn = async (
    bookingId
  ) => {

    try {

      await checkInBooking(
        bookingId
      );

      alert("Customer Checked-In");

      fetchArrivals();

    } catch (error) {

      console.log(error);

      alert("Check-In Failed");
    }
  };

  const handleCheckOut = async (
    bookingId
  ) => {

    try {

      await checkOutBooking(
        bookingId
      );

      alert("Customer Checked-Out");

      fetchArrivals();

    } catch (error) {

      console.log(error);

      alert("Check-Out Failed");
    }
  };

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-6">
        Reception Portal
      </h1>

      <div className="space-y-5">

        {
          arrivals.map((booking) => (

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
                Status:
                {" "}
                {booking.status}
              </p>

              <div className="flex gap-4 mt-4">

                {
                  booking.status ===
                  "CONFIRMED" && (

                    <button
                      onClick={() =>
                        handleCheckIn(
                          booking.id
                        )
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Check-In
                    </button>
                  )
                }

                {
                  booking.status ===
                  "CHECKED_IN" && (

                    <button
                      onClick={() =>
                        handleCheckOut(
                          booking.id
                        )
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Check-Out
                    </button>
                  )
                }

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default ReceptionPortal;
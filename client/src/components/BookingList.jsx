const BookingList = ({
  bookings,
  onCancel,
  onAssignRoom,
}) => {

  return (

    <div className="space-y-5">

      {
        bookings.map((booking) => (

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
              Check-In:
              {" "}
              {booking.checkInDate}
            </p>

            <p>
              Check-Out:
              {" "}
              {booking.checkOutDate}
            </p>

            <p
              className={`font-bold mt-2 ${
                booking.status === "CONFIRMED"
                  ? "text-blue-600"
                  : booking.status === "CHECKED_IN"
                  ? "text-green-600"
                  : booking.status === "CANCELLED"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {booking.status}
            </p>

           {
  booking.status !==
  "CANCELLED" && (

    <div className="flex gap-4 mt-4">

      <button
        onClick={() =>
          onCancel(booking.id)
        }
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Cancel Booking
      </button>

      <button
        onClick={() =>
          onAssignRoom(booking)
        }
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Assign Room
      </button>

    </div>

  )
}

          </div>
        ))
      }

    </div>
  );
};

export default BookingList;
import {useEffect,useState,} from "react";
import BookingList from "../components/BookingList";

import {getAllBookings,cancelBooking,} from "../services/bookingService";
import AssignRoomModal from "../components/AssignRoomModal";
const ManageBookings = () => {
   const [selectedBooking, setSelectedBooking] =
  useState(null);
  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings = async () => {

    try {

      const data =
        await getAllBookings();

      setBookings(data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleCancel =
    async (bookingId) => {

      try {

        await cancelBooking(
          bookingId
        );

        alert(
          "Booking Cancelled"
        );

        fetchBookings();

      } catch (error) {

        console.log(error);

        alert(
          "Cancellation Failed"
        );
      }
    };

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-6">
        Manage Bookings
      </h1>

     <BookingList
  bookings={bookings}
  onCancel={handleCancel}
  onAssignRoom={setSelectedBooking}
/>
{
  selectedBooking && (

    <AssignRoomModal
      booking={selectedBooking}
      onClose={() =>
        setSelectedBooking(null)
      }
      refreshBookings={
        fetchBookings
      }
    />
  )
}

    </div>
  );
};

export default ManageBookings;
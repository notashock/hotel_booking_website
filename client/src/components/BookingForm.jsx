import { useState } from "react";

import { createBooking } from "../services/bookingService";

import { useAuth } from "../context/AuthContext";

const BookingForm = ({ roomId }) => {

  const { user } = useAuth();

  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const bookingData = {
        roomId,
        ...formData,
      };

      const response =
        await createBooking(bookingData);

      alert(
        `Booking Confirmed\nReservation Number: ${response.reservationNumber}`
      );

    } catch (error) {

      console.log(error);

      alert("Booking Failed");
    }
  };

  // If user not logged in

  if (!user) {

    return (

      <p className="text-red-500">
        Please login to book room
      </p>
    );
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="mt-4"
    >

      <input
        type="date"
        name="checkInDate"
        className="w-full border p-3 rounded mb-3"
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="checkOutDate"
        className="w-full border p-3 rounded mb-3"
        onChange={handleChange}
        required
      />

      <button
        className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
      >
        Confirm Booking
      </button>

    </form>
  );
};

export default BookingForm;
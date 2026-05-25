import { useState } from "react";

import {
  rebookRoom
} from "../services/bookingService";

const RebookModal = ({
  booking,
  onClose
}) => {

  const [formData, setFormData] =
    useState({
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

      const response =
        await rebookRoom(
          booking.id,
          formData
        );

      alert(
        `Rebooking Successful\nReservation Number: ${response.reservationNumber}`
      );

      onClose();

    } catch (error) {

      console.log(error);

      alert("Rebooking Failed");
    }
  };

  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white p-8 rounded-xl w-[400px]">

        <h2 className="text-3xl font-bold mb-5">
          Quick Rebook
        </h2>

        <p className="mb-2">
          Hotel:
          {" "}
          {booking.hotelName}
        </p>

        <p className="mb-5">
          Room:
          {" "}
          {booking.roomCategory}
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="date"
            name="checkInDate"
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
            required
          />

          <input
            type="date"
            name="checkOutDate"
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
            required
          />

          <div className="flex gap-4">

            <button
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              Confirm Rebooking
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded w-full"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default RebookModal;
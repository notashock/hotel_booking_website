import { useState } from "react";

import {
  updateBooking,
} from "../services/bookingService";

const EditBookingModal = ({
  booking,
  onClose,
  refreshBookings,
}) => {

  const [formData, setFormData] =
    useState({
      checkInDate:
        booking.checkInDate,
      checkOutDate:
        booking.checkOutDate,
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await updateBooking(
        booking.id,
        formData
      );

      alert(
        "Booking Updated"
      );

      refreshBookings();

      onClose();

    } catch (error) {

      console.log(error);

      alert(
        "Update Failed"
      );
    }
  };

  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white p-8 rounded-xl w-[400px]">

        <h2 className="text-3xl font-bold mb-5">
          Modify Booking
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <div className="flex gap-4">

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Update Booking
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

export default EditBookingModal;
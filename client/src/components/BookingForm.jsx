import { useState } from "react";

import { createBooking } from "../services/bookingService";

import { useAuth } from "../context/AuthContext";
import { useState } from "react";

import { createBooking }
from "../services/bookingService";

import { validatePromoCode }
from "../services/promotionService";

import { useAuth }
from "../context/AuthContext";
const BookingForm = ({ roomId, price }) => {

  const { user } = useAuth();

  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
  });

  const [promoCode, setPromoCode] =
    useState("");

  const [discount, setDiscount] =
    useState(0);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const applyPromoCode = async () => {

    try {

      const response =
        await validatePromoCode(
          promoCode
        );

      setDiscount(
        response.discountAmount
      );

      alert("Promo Code Applied");

    } catch (error) {

      console.log(error);

      alert("Invalid Promo Code");
    }
  };

  const totalPrice =
    price - discount;

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const bookingData = {
        roomId,
        promoCode,
        totalAmount: totalPrice,
        ...formData,
      };

      const response =
        await createBooking(
          bookingData
        );

      alert(
        `Booking Confirmed\nReservation Number: ${response.reservationNumber}`
      );

    } catch (error) {

      console.log(error);

      alert("Booking Failed");
    }
  };

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

      <input
        type="text"
        placeholder="Promo Code"
        value={promoCode}
        onChange={(e) =>
          setPromoCode(e.target.value)
        }
        className="w-full border p-3 rounded mb-3"
      />

      <button
        type="button"
        onClick={applyPromoCode}
        className="bg-yellow-500 text-white px-4 py-2 rounded w-full mb-3"
      >
        Apply Promo Code
      </button>

      <div className="bg-gray-100 p-4 rounded mb-4">

        <p>
          Room Price:
          {" "}
          ₹ {price}
        </p>

        <p>
          Discount:
          {" "}
          ₹ {discount}
        </p>

        <p className="font-bold text-lg">
          Total:
          {" "}
          ₹ {totalPrice}
        </p>

      </div>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
      >
        Confirm Booking
      </button>

    </form>
  );
};
import { useState } from "react";
import { addRoom }
from "../services/hotelService";

const AddRoomForm = () => {
  const [formData, setFormData] = useState({
    hotelId: "",
    roomCategory: "",
    price: "",
    amenities: "",
    isAvailable: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRoom(formData);
      alert("Room Added Successfully");

      setFormData({
        hotelId: "",
        roomCategory: "",
        price: "",
        amenities: "",
        isAvailable: true,
      });

    } catch (error) {
      console.log(error);
      alert("Failed To Add Room");
    }
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg mt-8"
    >

      <h2 className="text-3xl font-bold mb-5">
        Add Room
      </h2>

      <input
        type="number"
        name="hotelId"
        placeholder="Hotel ID"
        value={formData.hotelId}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      />

      <select
        name="roomCategory"
        value={formData.roomCategory}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      >

        <option value="">
          Select Room Category
        </option>

        <option value="STANDARD">
          STANDARD
        </option>

        <option value="DELUXE">
          DELUXE
        </option>

        <option value="SUITE">
          SUITE
        </option>

      </select>

      <input
        type="number"
        name="price"
        placeholder="Room Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      />

      <textarea
        name="amenities"
        placeholder="Amenities"
        value={formData.amenities}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      />

      <button
        className="bg-green-600 text-white px-5 py-3 rounded"
      >
        Add Room
      </button>

    </form>
  );
};

export default AddRoomForm;
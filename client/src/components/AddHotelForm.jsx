import { useState } from "react";

import { addHotel }
from "../services/hotelService";

const AddHotelForm = () => {

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    facilities: "",
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

      await addHotel(formData);

      alert("Hotel Added Successfully");

      setFormData({
        name: "",
        location: "",
        facilities: "",
      });

    } catch (error) {

      console.log(error);

      alert("Failed To Add Hotel");
    }
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg mt-8"
    >

      <h2 className="text-3xl font-bold mb-5">
        Add Hotel
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Hotel Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      />

      <textarea
        name="facilities"
        placeholder="Facilities"
        value={formData.facilities}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      />

      <button
        className="bg-blue-600 text-white px-5 py-3 rounded"
      >
        Add Hotel
      </button>

    </form>
  );
};

export default AddHotelForm;
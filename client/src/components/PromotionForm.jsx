import { useState } from "react";

import {
  createPromotion
} from "../services/promotionService";

const PromotionForm = () => {

  const [formData, setFormData] =
    useState({
      code: "",
      discountAmount: "",
      type: "",
      expiryDate: "",
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

      await createPromotion(
        formData
      );

      alert(
        "Promotion Created Successfully"
      );

      setFormData({
        code: "",
        discountAmount: "",
        type: "",
        expiryDate: "",
      });

    } catch (error) {

      console.log(error);

      alert(
        "Failed To Create Promotion"
      );
    }
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg mt-8"
    >

      <h2 className="text-3xl font-bold mb-5">
        Create Promotion
      </h2>

      <input
        type="text"
        name="code"
        placeholder="Promo Code"
        value={formData.code}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      />

      <input
        type="number"
        name="discountAmount"
        placeholder="Discount Amount"
        value={formData.discountAmount}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      >

        <option value="">
          Select Promotion Type
        </option>

        <option value="SEASONAL">
          SEASONAL
        </option>

        <option value="LOYALTY">
          LOYALTY
        </option>

      </select>

      <input
        type="date"
        name="expiryDate"
        value={formData.expiryDate}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      />

      <button
        className="bg-purple-600 text-white px-5 py-3 rounded"
      >
        Create Promotion
      </button>

    </form>
  );
};

export default PromotionForm;
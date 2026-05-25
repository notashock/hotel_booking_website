import { useState } from "react";
<<<<<<< HEAD
import { addRoom }
from "../services/hotelService";

const AddRoomForm = () => {
  const [formData, setFormData] = useState({
=======
import { FiPlus, FiCheck, FiAlertCircle, FiLayers } from "react-icons/fi";
import { addRoom } from "../services/hotelService";

const ROOM_CATEGORIES = ["STANDARD", "DELUXE", "SUITE"];

const AddRoomForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
>>>>>>> ashok
    hotelId: "",
    roomCategory: "STANDARD",
    price: "",
    amenities: "",
    isAvailable: true,
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
<<<<<<< HEAD
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
=======
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
>>>>>>> ashok
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
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
=======
    setLoading(true);
    setAlert(null);
    try {
      await addRoom({
        hotelId: Number(form.hotelId),
        roomCategory: form.roomCategory,
        price: Number(form.price),
        amenities: form.amenities,
        isAvailable: form.isAvailable,
      });
      setAlert({ type: "success", msg: "Room added successfully!" });
      setForm({ hotelId: "", roomCategory: "STANDARD", price: "", amenities: "", isAvailable: true });
      onSuccess?.();
    } catch (err) {
      setAlert({
        type: "error",
        msg: err?.response?.data?.message || "Failed to add room. Please try again.",
      });
    } finally {
      setLoading(false);
>>>>>>> ashok
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-6 card-hover">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
          <FiLayers className="text-white text-lg" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Add New Room</h3>
          <p className="text-slate-400 text-xs">Create a room for an existing hotel</p>
        </div>
      </div>

      {alert && (
        <div
          className={`flex items-center gap-2 p-3 rounded-xl mb-4 text-sm font-medium fade-in ${
            alert.type === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {alert.type === "success" ? <FiCheck className="flex-shrink-0" /> : <FiAlertCircle className="flex-shrink-0" />}
          {alert.msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Hotel ID</label>
          <input
            type="number"
            name="hotelId"
            value={form.hotelId}
            onChange={handleChange}
            required
            min="1"
            placeholder="Enter hotel ID"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 bg-slate-50/50 focus:bg-white transition-smooth"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Room Category</label>
          <select
            name="roomCategory"
            value={form.roomCategory}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 bg-slate-50/50 focus:bg-white transition-smooth appearance-none cursor-pointer"
          >
            {ROOM_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Price per Night</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-sm">₹</span>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              min="0"
              placeholder="2500"
              className="w-full pl-8 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 bg-slate-50/50 focus:bg-white transition-smooth"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Amenities</label>
          <input
            type="text"
            name="amenities"
            value={form.amenities}
            onChange={handleChange}
            placeholder="AC, TV, Mini Bar, Balcony"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 bg-slate-50/50 focus:bg-white transition-smooth"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="isAvailable"
              checked={form.isAvailable}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-10 h-5.5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:bg-indigo-600 transition-smooth after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:after:translate-x-[18px] after:shadow-sm" />
          </label>
          <span className="text-sm font-medium text-slate-700">Available for booking</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-500/25 transition-smooth disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <FiPlus className="text-lg" />
              Add Room
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddRoomForm;
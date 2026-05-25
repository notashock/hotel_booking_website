import { useState } from "react";
import { FiPlus, FiMapPin, FiHome, FiCheck, FiAlertCircle } from "react-icons/fi";
import { addHotel } from "../services/hotelService";

const AddHotelForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ name: "", location: "", facilities: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    try {
      const facilities = form.facilities
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);
      await addHotel({ name: form.name, location: form.location, facilities });
      setAlert({ type: "success", msg: "Hotel added successfully!" });
      setForm({ name: "", location: "", facilities: "" });
      onSuccess?.();
    } catch (err) {
      setAlert({
        type: "error",
        msg: err?.response?.data?.message || "Failed to add hotel. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-6 card-hover">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <FiHome className="text-white text-lg" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Add New Hotel</h3>
          <p className="text-slate-400 text-xs">Create a new property listing</p>
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
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Hotel Name</label>
          <div className="relative">
            <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Grand Palace Resort"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 bg-slate-50/50 focus:bg-white transition-smooth"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Location</label>
          <div className="relative">
            <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              placeholder="Mumbai, India"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 bg-slate-50/50 focus:bg-white transition-smooth"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Facilities</label>
          <textarea
            name="facilities"
            value={form.facilities}
            onChange={handleChange}
            placeholder="Pool, Gym, WiFi, Spa, Restaurant"
            rows={3}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 bg-slate-50/50 focus:bg-white transition-smooth resize-none"
          />
          <p className="text-xs text-slate-400 mt-1">Comma-separated: Pool, Gym, WiFi</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-indigo-500/25 transition-smooth disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <FiPlus className="text-lg" />
              Add Hotel
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddHotelForm;
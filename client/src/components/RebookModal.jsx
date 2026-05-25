import { useState } from "react";
<<<<<<< HEAD

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

=======
import { FiCalendar, FiRepeat, FiX, FiCheck } from "react-icons/fi";
import { rebookRoom } from "../services/bookingService";

const RebookModal = ({ booking, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({ checkInDate: "", checkOutDate: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await rebookRoom(booking.id, formData);
      setSuccess(result?.reservationNumber || "New Booking");
    } catch (err) {
      setError(err.message || "Rebooking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDone = () => {
    onRefresh?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <FiRepeat className="text-indigo-600 text-lg" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Quick Rebook</h2>
              <p className="text-xs text-slate-400">Rebook this stay with new dates</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-smooth">
            <FiX className="text-slate-400 text-lg" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Booking Info */}
          <div className="bg-slate-50 rounded-xl p-4 mb-6">
            <p className="font-semibold text-slate-800">{booking.hotelName}</p>
            <p className="text-sm text-slate-500">{booking.roomCategory} • {booking.reservationNumber}</p>
          </div>

          {success ? (
            <div className="text-center py-6 fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <FiCheck className="text-emerald-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Rebooked Successfully!</h3>
              <p className="text-slate-500 text-sm mb-4">Reservation: {success}</p>
              <button
                onClick={handleDone}
                className="px-6 py-2.5 gradient-bg-primary text-white font-semibold rounded-xl hover:shadow-lg transition-smooth"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">New Check-In Date</label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    name="checkInDate"
                    value={formData.checkInDate}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 bg-slate-50/50 focus:bg-white transition-smooth"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">New Check-Out Date</label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    name="checkOutDate"
                    value={formData.checkOutDate}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 bg-slate-50/50 focus:bg-white transition-smooth"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 gradient-bg-primary text-white font-semibold py-2.5 rounded-xl hover:shadow-lg shadow-indigo-500/25 transition-smooth disabled:opacity-60"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <FiRepeat />
                      Confirm Rebook
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-smooth"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
>>>>>>> ashok
    </div>
  );
};

export default RebookModal;
import { useState } from "react";
import { FiCalendar, FiX, FiUser, FiHash } from "react-icons/fi";
import { updateBookingDates } from "../services/receptionService";

const EditDatesModal = ({ booking, onClose, refreshBookings }) => {
  const [checkInDate, setCheckInDate] = useState(booking.checkInDate || "");
  const [checkOutDate, setCheckOutDate] = useState(booking.checkOutDate || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdateDates = async () => {
    if (!checkInDate || !checkOutDate) {
      setError("Please provide both check-in and check-out dates");
      return;
    }
    
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      setError("Check-out date must be strictly after check-in date");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await updateBookingDates(booking.id, checkInDate, checkOutDate);
      refreshBookings();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to update dates. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleUpdateDates();
  };

  return (
    <div className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <FiCalendar className="text-indigo-600" size={20} />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Modify Booking Dates</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-smooth"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="px-6 py-5 space-y-5">
          {/* Booking Info */}
          <div className="bg-slate-50 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <FiUser className="text-slate-400" size={14} />
              <span className="text-slate-500">Customer:</span>
              <span className="font-semibold text-slate-800">
                {booking.customerName || booking.userName}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FiHash className="text-slate-400" size={14} />
              <span className="text-slate-500">Reservation:</span>
              <span className="font-mono font-semibold text-slate-800">{booking.reservationNumber}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FiCalendar className="text-slate-400" size={14} />
              <span className="text-slate-500">Current Dates:</span>
              <span className="font-semibold text-slate-800">{booking.checkInDate} to {booking.checkOutDate}</span>
            </div>
          </div>

          {/* Date Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                New Check-in
              </label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-smooth"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                New Check-out
              </label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-smooth"
              />
            </div>
          </div>
          
          <div className="text-xs text-slate-500 bg-amber-50 p-3 rounded-lg border border-amber-100">
            <strong>Note:</strong> Modifying dates will automatically recalculate the base price based on the room's current nightly rate.
          </div>

          {/* Error */}
          {error && (
            <div className="px-4 py-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium fade-in">
              {error}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="flex gap-3 px-6 py-5 border-t border-slate-100">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-smooth"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateDates}
            disabled={loading || !checkInDate || !checkOutDate}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiCalendar size={15} />
            {loading ? "Updating…" : "Update Dates"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDatesModal;

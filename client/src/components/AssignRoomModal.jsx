import { useState } from "react";
import { FiKey, FiX, FiUser, FiHash } from "react-icons/fi";
import { assignRoom } from "../services/receptionService";

const AssignRoomModal = ({ booking, onClose, refreshBookings }) => {
  const [roomNumber, setRoomNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAssignRoom = async () => {
    if (!roomNumber) {
      setError("Please enter a room number");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await assignRoom(booking.id, roomNumber);
      refreshBookings();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to assign room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAssignRoom();
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
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <FiKey className="text-emerald-600" size={20} />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Assign Physical Room</h2>
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
          </div>

          {/* Room Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Room Number
            </label>
            <input
              type="number"
              placeholder="Enter room number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-smooth"
              autoFocus
            />
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
            onClick={handleAssignRoom}
            disabled={loading || !roomNumber}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-200 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiKey size={15} />
            {loading ? "Assigning…" : "Assign Room"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignRoomModal;
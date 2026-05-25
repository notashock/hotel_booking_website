import { useState } from "react";
<<<<<<< HEAD
import {searchReservation} from "../services/receptionService";

const ReservationSearch = () => {

  const [reservationNumber,
    setReservationNumber] =
      useState("");

  const [booking, setBooking] =
    useState(null);

  const handleSearch =
    async () => {

      try {
        const data =await searchReservation(reservationNumber);
        setBooking(data);

      } catch (error) {

        console.log(error);

        alert("Reservation Not Found");
      }
    };

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg">

      <h2 className="text-3xl font-bold mb-5">
        Reservation Search
      </h2>

      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Enter Reservation Number"
          value={reservationNumber}
          onChange={(e) =>
            setReservationNumber(
              e.target.value
            )
          }
          className="border p-3 rounded w-full"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-5 py-3 rounded"
        >
          Search
        </button>

      </div>

      {
        booking && (

          <div className="bg-gray-100 p-5 rounded-lg">

            <h3 className="text-2xl font-bold mb-3">
              {booking.customerName}
            </h3>

            <p>
              Reservation:
              {" "}
              {booking.reservationNumber}
            </p>

            <p>
              Hotel:
              {" "}
              {booking.hotelName}
            </p>

            <p>
              Room:
              {" "}
              {booking.roomCategory}
            </p>

            <p>
              Status:
              {" "}
              {booking.status}
            </p>

            <p>
              Check-In:
              {" "}
              {booking.checkInDate}
            </p>

            <p>
              Check-Out:
              {" "}
              {booking.checkOutDate}
            </p>

          </div>
        )
      }

=======
import { FiSearch, FiLogIn, FiLogOut, FiXCircle, FiUser, FiHash, FiMapPin, FiGrid, FiCalendar, FiDollarSign } from "react-icons/fi";
import {
  searchReservation,
  checkInBooking,
  checkOutBooking,
} from "../services/receptionService";
import { cancelBooking } from "../services/bookingService";

const ReservationSearch = ({ onAction }) => {
  const [reservationNumber, setReservationNumber] = useState("");
  const [booking, setBooking] = useState(null);
  const [searching, setSearching] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const getStatusBadge = (status) => {
    const map = {
      CONFIRMED: "badge-confirmed",
      CHECKED_IN: "badge-checked-in",
      CHECKED_OUT: "badge-checked-out",
      CANCELLED: "badge-cancelled",
      PENDING: "badge-pending",
    };
    return `badge ${map[status] || "badge-pending"}`;
  };

  const handleSearch = async () => {
    if (!reservationNumber.trim()) return;
    setSearching(true);
    setError("");
    setBooking(null);
    try {
      const data = await searchReservation(reservationNumber.trim());
      setBooking(data);
    } catch (err) {
      console.error(err);
      setError("Reservation not found. Please check the number and try again.");
    } finally {
      setSearching(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const performAction = async (actionFn, bookingId) => {
    setActionLoading(true);
    try {
      await actionFn(bookingId);
      const updated = await searchReservation(reservationNumber.trim());
      setBooking(updated);
      if (onAction) onAction();
    } catch (err) {
      console.error(err);
      alert("Action failed. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const showActions = booking && booking.status !== "CANCELLED" && booking.status !== "CHECKED_OUT";

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5">
      {/* ── Search Bar ── */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input
            type="text"
            placeholder="Search by reservation number…"
            value={reservationNumber}
            onChange={(e) => setReservationNumber(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-smooth"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={searching || !reservationNumber.trim()}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white gradient-bg-primary hover:opacity-90 shadow-md shadow-indigo-200 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiSearch size={16} />
          {searching ? "Searching…" : "Search"}
        </button>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="mt-4 px-4 py-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium fade-in">
          {error}
        </div>
      )}

      {/* ── Result Card ── */}
      {booking && (
        <div className="mt-5 bg-slate-50 rounded-2xl border border-slate-100 p-5 fade-in">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
            {/* Guest Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full gradient-bg-primary flex items-center justify-center">
                  <span className="text-white font-bold">
                    {(booking.customerName || booking.userName || "G").charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {booking.customerName || booking.userName}
                  </h3>
                  <span className={getStatusBadge(booking.status)}>
                    {booking.status?.replace("_", " ")}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <FiHash className="text-slate-400 mt-0.5" size={14} />
                  <div>
                    <span className="text-slate-400 block text-xs">Reservation</span>
                    <span className="font-medium text-slate-700">{booking.reservationNumber}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FiMapPin className="text-slate-400 mt-0.5" size={14} />
                  <div>
                    <span className="text-slate-400 block text-xs">Hotel</span>
                    <span className="font-medium text-slate-700">{booking.hotelName}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FiGrid className="text-slate-400 mt-0.5" size={14} />
                  <div>
                    <span className="text-slate-400 block text-xs">Room Category</span>
                    <span className="font-medium text-slate-700">{booking.roomCategory}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FiCalendar className="text-slate-400 mt-0.5" size={14} />
                  <div>
                    <span className="text-slate-400 block text-xs">Check-In</span>
                    <span className="font-medium text-slate-700">{booking.checkInDate}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FiCalendar className="text-slate-400 mt-0.5" size={14} />
                  <div>
                    <span className="text-slate-400 block text-xs">Check-Out</span>
                    <span className="font-medium text-slate-700">{booking.checkOutDate}</span>
                  </div>
                </div>
                {booking.totalAmount != null && (
                  <div className="flex items-start gap-2">
                    <FiDollarSign className="text-slate-400 mt-0.5" size={14} />
                    <div>
                      <span className="text-slate-400 block text-xs">Total</span>
                      <span className="font-semibold text-slate-700">₹{booking.totalAmount}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {showActions && (
              <div className="flex flex-wrap gap-2 md:flex-col md:items-end">
                {booking.status === "CONFIRMED" && (
                  <button
                    onClick={() => performAction(checkInBooking, booking.id)}
                    disabled={actionLoading}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-smooth disabled:opacity-50"
                  >
                    <FiLogIn size={15} /> Check-In
                  </button>
                )}
                {booking.status === "CHECKED_IN" && (
                  <button
                    onClick={() => performAction(checkOutBooking, booking.id)}
                    disabled={actionLoading}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 shadow-md shadow-amber-200 transition-smooth disabled:opacity-50"
                  >
                    <FiLogOut size={15} /> Check-Out
                  </button>
                )}
                <button
                  onClick={() => performAction(cancelBooking, booking.id)}
                  disabled={actionLoading}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-200 transition-smooth disabled:opacity-50"
                >
                  <FiXCircle size={15} /> Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
>>>>>>> ashok
    </div>
  );
};

export default ReservationSearch;

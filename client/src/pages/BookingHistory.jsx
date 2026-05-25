import { useEffect, useState } from "react";
import { FiCalendar, FiMapPin, FiHash, FiRepeat, FiClock } from "react-icons/fi";
import { getBookingHistory } from "../services/bookingService";
import RebookModal from "../components/RebookModal";

<<<<<<< HEAD
import {
  getBookingHistory,
} from "../services/bookingService";
import RebookModal
from "../components/RebookModal";
const BookingHistory = () => {
    const [selectedBooking, setSelectedBooking] =
  useState(null);

  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {

    fetchBookings();

  }, []);
=======
const getStatusBadge = (status) => {
  const map = {
    CONFIRMED: "badge badge-confirmed",
    CHECKED_IN: "badge badge-checked-in",
    CHECKED_OUT: "badge badge-checked-out",
    CANCELLED: "badge badge-cancelled",
    PENDING: "badge badge-pending",
  };
  return map[status] || "badge bg-slate-100 text-slate-600";
};

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
>>>>>>> ashok

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await getBookingHistory();
      setBookings(Array.isArray(data) ? data : []);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Bookings</h1>
          <p className="text-slate-500 mt-1">View your booking history and rebook past stays</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-xl" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-slate-200 rounded w-1/3" />
                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                    <div className="h-4 bg-slate-200 rounded w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <FiCalendar className="mx-auto text-5xl text-slate-300 mb-4" />
            <h2 className="text-xl font-bold text-slate-700 mb-2">No Bookings Yet</h2>
            <p className="text-slate-400">Start exploring hotels and make your first reservation!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, idx) => (
              <div
                key={booking.id || idx}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-100 transition-smooth fade-in p-6"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="text-indigo-600 text-xl" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                      <h3 className="text-lg font-bold text-slate-900 truncate">
                        {booking.hotelName}
                      </h3>
                      <span className={getStatusBadge(booking.status)}>
                        {booking.status?.replace("_", " ")}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <FiHash className="text-slate-400" />
                        <span>{booking.reservationNumber}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiClock className="text-slate-400" />
                        <span>{booking.roomCategory}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCalendar className="text-slate-400" />
                        <span>{booking.checkInDate} → {booking.checkOutDate}</span>
                      </div>
                    </div>

                    {booking.totalAmount > 0 && (
                      <p className="mt-2 text-lg font-bold text-slate-900">
                        ₹ {booking.totalAmount?.toLocaleString()}
                      </p>
                    )}
                  </div>

<<<<<<< HEAD
            <div
              key={booking.id}
              className="bg-white p-5 rounded-xl shadow"
            >

              <h2 className="text-2xl font-bold mb-2">
                {booking.hotelName}
              </h2>

              <p>
                Reservation:
                {" "}
                {booking.reservationNumber}
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
              <button
  onClick={() =>
    setSelectedBooking(booking)
  }
  className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
>
  Quick Rebook
</button>

            </div>
          ))
        }
=======
                  {/* Actions */}
                  {booking.status === "CHECKED_OUT" && (
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-smooth flex-shrink-0"
                    >
                      <FiRepeat className="text-lg" />
                      Quick Rebook
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
>>>>>>> ashok

        {/* Rebook Modal */}
        {selectedBooking && (
          <RebookModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
            onRefresh={fetchBookings}
          />
        )}
      </div>
<<<<<<< HEAD
      {
  selectedBooking && (

    <RebookModal
      booking={selectedBooking}
      onClose={() =>
        setSelectedBooking(null)
      }
    />
  )
}

=======
>>>>>>> ashok
    </div>
  );
};

export default BookingHistory;
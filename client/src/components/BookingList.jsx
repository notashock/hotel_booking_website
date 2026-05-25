import { FiXCircle, FiKey, FiCalendar, FiInbox } from "react-icons/fi";

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

const BookingList = ({ bookings, onCancel, onAssignRoom }) => {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <FiInbox size={40} className="mb-3" />
        <span className="text-sm font-medium">No bookings found</span>
      </div>
    );
  }

  const canAct = (status) => status !== "CANCELLED" && status !== "CHECKED_OUT";

  return (
    <>
      {/* ── Desktop Table ── */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="text-left px-5 py-4 font-semibold text-slate-600">Customer</th>
              <th className="text-left px-5 py-4 font-semibold text-slate-600">Reservation #</th>
              <th className="text-left px-5 py-4 font-semibold text-slate-600">Hotel</th>
              <th className="text-left px-5 py-4 font-semibold text-slate-600">Room</th>
              <th className="text-left px-5 py-4 font-semibold text-slate-600">Dates</th>
              <th className="text-left px-5 py-4 font-semibold text-slate-600">Status</th>
              <th className="text-right px-5 py-4 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, idx) => (
              <tr
                key={booking.id}
                className={`border-b border-slate-50 transition-smooth hover:bg-indigo-50/30 ${
                  idx % 2 === 1 ? "bg-slate-50/50" : ""
                }`}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full gradient-bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">
                        {(booking.customerName || booking.userName || "G").charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium text-slate-800">
                      {booking.customerName || booking.userName}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 text-slate-600 font-mono text-xs">{booking.reservationNumber}</td>
                <td className="px-5 py-4 text-slate-600">{booking.hotelName}</td>
                <td className="px-5 py-4 text-slate-600">{booking.roomCategory}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1 text-slate-600">
                    <FiCalendar size={13} className="text-slate-400" />
                    <span>{booking.checkInDate}</span>
                    <span className="text-slate-300 mx-1">→</span>
                    <span>{booking.checkOutDate}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={getStatusBadge(booking.status)}>
                    {booking.status?.replace("_", " ")}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  {canAct(booking.status) && (
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onCancel(booking.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-smooth"
                        title="Cancel Booking"
                      >
                        <FiXCircle size={13} /> Cancel
                      </button>
                      <button
                        onClick={() => onAssignRoom(booking)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-smooth"
                        title="Assign Room"
                      >
                        <FiKey size={13} /> Assign
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Card Layout ── */}
      <div className="lg:hidden space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 card-hover"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full gradient-bg-primary flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {(booking.customerName || booking.userName || "G").charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">
                    {booking.customerName || booking.userName}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">{booking.reservationNumber}</p>
                </div>
              </div>
              <span className={getStatusBadge(booking.status)}>
                {booking.status?.replace("_", " ")}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
              <div>
                <span className="text-slate-400 text-xs block">Hotel</span>
                <span className="font-medium text-slate-700">{booking.hotelName}</span>
              </div>
              <div>
                <span className="text-slate-400 text-xs block">Room</span>
                <span className="font-medium text-slate-700">{booking.roomCategory}</span>
              </div>
              <div>
                <span className="text-slate-400 text-xs block">Check-In</span>
                <span className="font-medium text-slate-700">{booking.checkInDate}</span>
              </div>
              <div>
                <span className="text-slate-400 text-xs block">Check-Out</span>
                <span className="font-medium text-slate-700">{booking.checkOutDate}</span>
              </div>
            </div>
            {canAct(booking.status) && (
              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => onCancel(booking.id)}
                  className="flex items-center gap-1.5 flex-1 justify-center px-3 py-2 rounded-xl text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-smooth"
                >
                  <FiXCircle size={14} /> Cancel
                </button>
                <button
                  onClick={() => onAssignRoom(booking)}
                  className="flex items-center gap-1.5 flex-1 justify-center px-3 py-2 rounded-xl text-sm font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-smooth"
                >
                  <FiKey size={14} /> Assign Room
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default BookingList;
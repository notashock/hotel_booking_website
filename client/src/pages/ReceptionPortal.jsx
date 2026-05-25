import { useEffect, useState, useCallback } from "react";
import { FiLogIn, FiLogOut, FiBook, FiBarChart2, FiKey, FiCalendar, FiUser, FiHash, FiLoader } from "react-icons/fi";
import {
  getDailyArrivals,
  getDailyDepartures,
  checkInBooking,
  checkOutBooking,
  getOccupancyStats,
} from "../services/receptionService";
<<<<<<< HEAD
import ReservationSearch
from "../components/ReservationSearch";
=======
import { getAllBookings, cancelBooking } from "../services/bookingService";
import ReservationSearch from "../components/ReservationSearch";
import BookingList from "../components/BookingList";
import OccupancyCard from "../components/OccupancyCard";
import AssignRoomModal from "../components/AssignRoomModal";
import EditDatesModal from "../components/EditDatesModal";

const tabs = [
  { key: "arrivals", label: "Today's Arrivals", icon: FiLogIn },
  { key: "departures", label: "Today's Departures", icon: FiLogOut },
  { key: "bookings", label: "All Bookings", icon: FiBook },
  { key: "occupancy", label: "Occupancy", icon: FiBarChart2 },
];

>>>>>>> ashok
const ReceptionPortal = () => {
  const [activeTab, setActiveTab] = useState("arrivals");
  const [arrivals, setArrivals] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [occupancy, setOccupancy] = useState(0);
  const [loading, setLoading] = useState(false);
  const [assignBooking, setAssignBooking] = useState(null);
  const [editDatesBooking, setEditDatesBooking] = useState(null);

  const fetchTabData = useCallback(async (tab) => {
    setLoading(true);
    try {
      switch (tab) {
        case "arrivals": {
          const data = await getDailyArrivals();
          setArrivals(data || []);
          break;
        }
        case "departures": {
          const data = await getDailyDepartures();
          setDepartures(data || []);
          break;
        }
        case "bookings": {
          const data = await getAllBookings();
          setBookings(data || []);
          break;
        }
        case "occupancy": {
          const data = await getOccupancyStats();
          setOccupancy(data ?? 0);
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.error(`Failed to fetch ${tab}:`, error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTabData(activeTab);
  }, [activeTab, fetchTabData]);

  /* ── Action Handlers ── */
  const handleCheckIn = async (bookingId) => {
    try {
      await checkInBooking(bookingId);
      fetchTabData(activeTab);
    } catch (error) {
      console.error("Check-in failed:", error);
      alert("Check-In Failed");
    }
  };

  const handleCheckOut = async (bookingId) => {
    try {
      await checkOutBooking(bookingId);
      fetchTabData(activeTab);
    } catch (error) {
      console.error("Check-out failed:", error);
      alert("Check-Out Failed");
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      fetchTabData(activeTab);
    } catch (error) {
      console.error("Cancel failed:", error);
      alert("Cancel Failed");
    }
  };

  const handleAssignRoom = (booking) => {
    setAssignBooking(booking);
  };

<<<<<<< HEAD
      <h1 className="text-4xl font-bold mb-6">
        Reception Portal
      </h1>
      <ReservationSearch />
=======
  const handleEditDates = (booking) => {
    setEditDatesBooking(booking);
  };
>>>>>>> ashok

  const refreshCurrentTab = () => fetchTabData(activeTab);

  /* ── Status Badge Helper ── */
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

  /* ── Arrival / Departure Card Renderer ── */
  const renderGuestCard = (booking, type) => (
    <div
      key={booking.id}
      className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 card-hover"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full gradient-bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">
                {(booking.customerName || booking.userName || "G").charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {booking.customerName || booking.userName}
              </h3>
              <p className="text-sm text-slate-500 flex items-center gap-1">
                <FiHash size={12} /> {booking.reservationNumber}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="text-slate-400 block">Hotel</span>
              <span className="font-medium text-slate-700">{booking.hotelName}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Room</span>
              <span className="font-medium text-slate-700">{booking.roomCategory}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Check-In</span>
              <span className="font-medium text-slate-700">{booking.checkInDate}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Check-Out</span>
              <span className="font-medium text-slate-700">{booking.checkOutDate}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className={getStatusBadge(booking.status)}>{booking.status?.replace("_", " ")}</span>
          {type === "arrivals" && booking.status === "CONFIRMED" && (
            <div className="flex gap-2">
              <button
                onClick={() => handleCheckIn(booking.id)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-smooth"
              >
                <FiLogIn size={15} /> Check-In
              </button>
              <button
                onClick={() => handleAssignRoom(booking)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-200 transition-smooth"
              >
                <FiKey size={15} /> Assign Room
              </button>
            </div>
          )}
          {type === "departures" && booking.status === "CHECKED_IN" && (
            <button
              onClick={() => handleCheckOut(booking.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-200 transition-smooth"
            >
              <FiLogOut size={15} /> Check-Out
            </button>
          )}
        </div>
      </div>
    </div>
  );

  /* ── Loading Spinner ── */
  const Spinner = () => (
    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
      <FiLoader className="animate-spin text-indigo-500 mb-3" size={32} />
      <span className="text-sm font-medium">Loading…</span>
    </div>
  );

  /* ── Empty State ── */
  const EmptyState = ({ message }) => (
    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
      <FiCalendar size={40} className="mb-3" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );

  /* ── Tab Content ── */
  const renderTabContent = () => {
    if (loading) return <Spinner />;

    switch (activeTab) {
      case "arrivals":
        return arrivals.length > 0 ? (
          <div className="space-y-4">
            {arrivals.map((b) => renderGuestCard(b, "arrivals"))}
          </div>
        ) : (
          <EmptyState message="No arrivals scheduled for today" />
        );

      case "departures":
        return departures.length > 0 ? (
          <div className="space-y-4">
            {departures.map((b) => renderGuestCard(b, "departures"))}
          </div>
        ) : (
          <EmptyState message="No departures scheduled for today" />
        );

      case "bookings":
        return (
          <BookingList
            bookings={bookings}
            onCancel={handleCancel}
            onAssignRoom={handleAssignRoom}
            onEditDates={handleEditDates}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
          />
        );

      case "occupancy":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <OccupancyCard
              title="Occupied Rooms"
              value={occupancy}
              icon={FiBarChart2}
              color="indigo"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Header ── */}
      <div className="gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Reception Portal
              </h1>
              <p className="text-slate-400 mt-1 text-sm">
                Manage check-ins, check-outs, and room assignments
              </p>
            </div>
            {/* ── Quick Occupancy Stat ── */}
            <div className="glass-dark rounded-2xl px-6 py-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <FiBarChart2 className="text-indigo-400" size={22} />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Occupied Rooms</p>
                <p className="text-2xl font-bold text-white">{occupancy}</p>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-dot ml-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        {/* ── Reservation Search ── */}
        <div className="mb-6">
          <ReservationSearch onAction={refreshCurrentTab} />
        </div>

        {/* ── Tab Bar ── */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-smooth ${
                    isActive
                      ? "border-indigo-600 text-indigo-600 bg-indigo-50/50"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={17} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Tab Content ── */}
        <div key={activeTab} className="fade-in pb-12">
          {renderTabContent()}
        </div>
      </div>

      {/* ── Assign Room Modal ── */}
      {assignBooking && (
        <AssignRoomModal
          booking={assignBooking}
          onClose={() => setAssignBooking(null)}
          refreshBookings={refreshCurrentTab}
        />
      )}

      {/* ── Edit Dates Modal ── */}
      {editDatesBooking && (
        <EditDatesModal
          booking={editDatesBooking}
          onClose={() => setEditDatesBooking(null)}
          refreshBookings={refreshCurrentTab}
        />
      )}
    </div>
  );
};

export default ReceptionPortal;
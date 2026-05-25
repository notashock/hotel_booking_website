import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";

// ── Public Pages ──
import Login from "../pages/Login";
import Register from "../pages/Register";
import Hotels from "../pages/Hotels";
<<<<<<< HEAD
import HotelDetails
from "../pages/HotelDetails";
import BookingHistory
from "../pages/BookingHistory";
import DailyDepartures
from "../pages/DailyDepartures";
import ProtectedRoute
from "../components/ProtectedRoute";
import AdminDashboard
from "../pages/AdminDashboard";
import ReceptionPortal
from "../pages/ReceptionPortal";
import ManagePromotions
from "../pages/ManagePromotions";
import ManageBookings
from "../pages/ManageBookings";
import OccupancyDashboard
from "../pages/OccupancyDashboard";
=======
import HotelDetails from "../pages/HotelDetails";

// ── Customer Pages ──
import BookingHistory from "../pages/BookingHistory";
>>>>>>> ashok

// ── Admin Pages ──
import AdminDashboard from "../pages/AdminDashboard";

// ── Reception Pages ──
import ReceptionPortal from "../pages/ReceptionPortal";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* ── Public Routes ── */}
        <Route path="/" element={<Hotels />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />

        {/* ── Customer Routes (any authenticated user can view their bookings) ── */}
        <Route
          path="/booking-history"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <BookingHistory />
            </ProtectedRoute>
          }
        />

        {/* ── Admin Dashboard (ADMIN only) ── */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
<<<<<<< HEAD
     <Route
  path="/hotels"
  element={
    <ProtectedRoute
      allowedRoles={[
        "CUSTOMER",
        "ADMIN",
        "RECEPTIONIST",
      ]}
    >
      <Hotels />
    </ProtectedRoute>
  }
/>
<Route
  path="/departures"
  element={
    <ProtectedRoute
      allowedRoles={[
        "ADMIN",
        "RECEPTIONIST",
      ]}
    >
      <DailyDepartures />
    </ProtectedRoute>
  }
/>
<Route
  path="/hotels/:id"
  element={<HotelDetails />}
/>
=======

        {/* ── Reception Portal (RECEPTIONIST + ADMIN) ── */}
>>>>>>> ashok
        <Route
          path="/reception"
          element={
            <ProtectedRoute allowedRoles={["RECEPTIONIST"]}>
              <ReceptionPortal />
            </ProtectedRoute>
          }
        />
<<<<<<< HEAD
        <Route
  path="/booking-history"
  element={
    <ProtectedRoute
      allowedRoles={[
        "CUSTOMER",
        "ADMIN",
        "RECEPTIONIST",
      ]}
    >
      <BookingHistory />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin"
  element={
    <ProtectedRoute
      allowedRoles={["ADMIN"]}
    >
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/reception"
  element={
    <ProtectedRoute
      allowedRoles={[
        "RECEPTIONIST",
        "ADMIN",
      ]}
    >
      <ReceptionPortal />
    </ProtectedRoute>
  }
/>
     <Route
  path="/admin/promotions"
  element={
    <ProtectedRoute
      allowedRoles={["ADMIN"]}
    >
      <ManagePromotions />
    </ProtectedRoute>
  }
/>
<Route
  path="/occupancy"
  element={
    <ProtectedRoute
      allowedRoles={[
        "ADMIN",
        "RECEPTIONIST",
      ]}
    >
      <OccupancyDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/manage-bookings"
  element={
    <ProtectedRoute
      allowedRoles={[
        "ADMIN",
        "RECEPTIONIST",
      ]}
    >
      <ManageBookings />
    </ProtectedRoute>
  }
/>
=======
>>>>>>> ashok
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
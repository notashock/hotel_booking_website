import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";

// ── Public Pages ──
import Login from "../pages/Login";
import Register from "../pages/Register";
import Hotels from "../pages/Hotels";
import HotelDetails from "../pages/HotelDetails";

// ── Customer Pages ──
import BookingHistory from "../pages/BookingHistory";

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

        {/* ── Reception Portal (RECEPTIONIST + ADMIN) ── */}
        <Route
          path="/reception"
          element={
            <ProtectedRoute allowedRoles={["RECEPTIONIST"]}>
              <ReceptionPortal />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
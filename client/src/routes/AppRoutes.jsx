import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Hotels from "../pages/Hotels";
import HotelDetails
from "../pages/HotelDetails";
import BookingHistory
from "../pages/BookingHistory";

import ProtectedRoute
from "../components/ProtectedRoute";
import AdminDashboard
from "../pages/AdminDashboard";
import ReceptionPortal
from "../pages/ReceptionPortal";


const AppRoutes = () => {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
        <Route
  path="/hotels"
  element={<Hotels />}
/>
<Route
  path="/hotels/:id"
  element={<HotelDetails />}
/>
        <Route
          path="/register"
          element={<Register />}
        />
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
       
      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;
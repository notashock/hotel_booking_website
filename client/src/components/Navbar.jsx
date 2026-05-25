import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {

    logout();

    navigate("/login");
  };

  return (

    <div className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow-md">

      {/* Logo */}

      <Link to="/">

        <h1 className="text-3xl font-bold cursor-pointer">
          Hotel Booking
        </h1>

      </Link>

      {/* Navigation Links */}

      <div className="flex items-center gap-6 text-lg">

        <Link
          to="/"
          className="hover:text-yellow-300"
        >
          Home
        </Link>

        <Link
          to="/hotels"
          className="hover:text-yellow-300"
        >
          Hotels
        </Link>

        {
          user && (

            <Link
              to="/booking-history"
              className="hover:text-yellow-300"
            >
              Bookings
            </Link>
          )
        }

        {
          user?.role === "ADMIN" && (

            <Link
              to="/admin"
              className="hover:text-yellow-300"
            >
              Admin
            </Link>
          )
        }
        {
  user?.role === "ADMIN" && (

    <Link
      to="/admin/promotions"
      className="hover:text-yellow-300"
    >
      Promotions
    </Link>
  )
}
{
  (user?.role === "ADMIN" ||
   user?.role === "RECEPTIONIST") && (

    <Link
      to="/manage-bookings"
      className="hover:text-yellow-300"
    >
      Manage Bookings
    </Link>
  )
}
        {
          user?.role === "RECEPTIONIST" && (

            <Link
              to="/reception"
              className="hover:text-yellow-300"
            >
              Reception
            </Link>
          )
        }

        {/* Auth Buttons */}

        {
          user ? (

            <div className="flex items-center gap-4">

              <span className="font-semibold">
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
              >
                Logout
              </button>

            </div>

          ) : (

            <div className="flex items-center gap-4">

              <Link
                to="/login"
                className="hover:text-yellow-300"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                Register
              </Link>

            </div>
          )
        }

      </div>

    </div>
  );
};

export default Navbar;
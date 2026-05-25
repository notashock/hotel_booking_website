import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {

  const { user, logout } = useAuth();

  return (

    <div className="bg-blue-600 text-white px-8 py-4 flex justify-between">

      <h1 className="text-2xl font-bold">
        Hotel Booking
      </h1>

      <div className="flex gap-5 items-center">

        <Link to="/">Home</Link>

        <Link to="/hotels">
          Hotels
        </Link>

        {
          user?.role === "ADMIN" && (
            <Link to="/admin">
              Admin
            </Link>
          )
        }

        {
          user?.role === "RECEPTIONIST" && (
            <Link to="/reception">
              Reception
            </Link>
          )
        }

       {
  user ? (

    <button
      onClick={logout}
      className="bg-red-500 px-4 py-2 rounded"
    >
      Logout
    </button>

  ) : (

    <div className="flex gap-4">

      <Link to="/login">
        Login
      </Link>

      <Link to="/register">
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
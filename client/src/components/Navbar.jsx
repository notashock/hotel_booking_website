import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { FiMenu, FiX, FiLogOut, FiUser } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `relative px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
      isActive(path)
        ? "bg-white/15 text-white"
        : "text-slate-300 hover:text-white hover:bg-white/10"
    }`;

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <nav className="gradient-bg sticky top-0 z-50 shadow-lg shadow-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl gradient-bg-primary flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-smooth">
              <span className="text-white font-bold text-sm">SE</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight hidden sm:block">
              Stay<span className="text-indigo-400">Ease</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className={linkClass("/")}>Home</Link>
            <Link to="/hotels" className={linkClass("/hotels")}>Hotels</Link>

            {user && (
              <Link to="/booking-history" className={linkClass("/booking-history")}>
                My Bookings
              </Link>
            )}

            {user?.role === "ADMIN" && (
              <Link to="/admin" className={linkClass("/admin")}>
                Admin
              </Link>
            )}

            {(user?.role === "ADMIN" || user?.role === "RECEPTIONIST") && (
              <Link to="/reception" className={linkClass("/reception")}>
                Reception
              </Link>
            )}
          </div>

          {/* ── Auth Section ── */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10">
                  <div className="w-7 h-7 rounded-full gradient-bg-primary flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{userInitial}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-white font-medium">{user.name}</span>
                    <span className="text-slate-400 text-xs ml-2 hidden lg:inline">
                      {user.role}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-rose-300 hover:text-white hover:bg-rose-500/20 transition-smooth"
                >
                  <FiLogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-smooth"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white gradient-bg-primary hover:opacity-90 shadow-lg shadow-indigo-500/25 transition-smooth"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* ── Mobile Menu Toggle ── */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-smooth"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 px-4 py-4 space-y-1 fade-in">
          <Link to="/" className={linkClass("/")} onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/hotels" className={linkClass("/hotels")} onClick={() => setMobileOpen(false)}>Hotels</Link>

          {user && (
            <Link to="/booking-history" className={linkClass("/booking-history")} onClick={() => setMobileOpen(false)}>
              My Bookings
            </Link>
          )}

          {user?.role === "ADMIN" && (
            <Link to="/admin" className={linkClass("/admin")} onClick={() => setMobileOpen(false)}>Admin</Link>
          )}

          {(user?.role === "ADMIN" || user?.role === "RECEPTIONIST") && (
            <Link to="/reception" className={linkClass("/reception")} onClick={() => setMobileOpen(false)}>Reception</Link>
          )}

          <div className="pt-3 border-t border-white/10 mt-3">
            {user ? (
              <button
                onClick={() => { handleLogout(); setMobileOpen(false); }}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-rose-300 hover:bg-rose-500/20 transition-smooth"
              >
                <FiLogOut size={16} />
                Logout ({user.name})
              </button>
            ) : (
              <div className="space-y-1">
                <Link to="/login" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/10" onClick={() => setMobileOpen(false)}>Sign In</Link>
                <Link to="/register" className="block px-3 py-2 rounded-lg text-sm font-medium text-white gradient-bg-primary text-center" onClick={() => setMobileOpen(false)}>Get Started</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
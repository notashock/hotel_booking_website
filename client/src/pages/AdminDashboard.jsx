import { useState, useEffect, useCallback } from "react";
import { FiHome, FiUsers, FiGift, FiLogOut, FiMenu, FiX, FiGrid, FiShield, FiTrendingUp } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { getAllHotels } from "../services/hotelService";
import { getReceptionists } from "../services/userService";
import { getAllPromotions } from "../services/promotionService";
import AddHotelForm from "../components/AddHotelForm";
import AddRoomForm from "../components/AddRoomForm";
import ManageReceptionists from "./ManageReceptionists";
import PromotionForm from "../components/PromotionForm";
import PromotionList from "../components/PromotionList";

const NAV_ITEMS = [
  { key: "hotels", label: "Hotels & Rooms", icon: FiHome },
  { key: "staff", label: "Staff Management", icon: FiUsers },
  { key: "promotions", label: "Promotions", icon: FiGift },
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("hotels");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ hotels: 0, staff: 0, promotions: 0 });
  const [hotels, setHotels] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const [hotelsData, staffData, promosData] = await Promise.all([
        getAllHotels(),
        getReceptionists(),
        getAllPromotions(),
      ]);
      setHotels(Array.isArray(hotelsData) ? hotelsData : []);
      setPromotions(Array.isArray(promosData) ? promosData : []);
      setStats({
        hotels: Array.isArray(hotelsData) ? hotelsData.length : 0,
        staff: Array.isArray(staffData) ? staffData.length : 0,
        promotions: Array.isArray(promosData) ? promosData.length : 0,
      });
    } catch {
      setHotels([]);
      setPromotions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setSidebarOpen(false);
  };

  const statCards = [
    { label: "Total Hotels", value: stats.hotels, icon: FiGrid, color: "from-indigo-500 to-indigo-600" },
    { label: "Total Staff", value: stats.staff, icon: FiShield, color: "from-emerald-500 to-emerald-600" },
    { label: "Active Promotions", value: stats.promotions, icon: FiTrendingUp, color: "from-purple-500 to-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 gradient-bg flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-lg">
              <FiGrid className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg tracking-tight">StayEase</h1>
              <p className="text-slate-400 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-smooth ${
                activeTab === key
                  ? "bg-white/15 text-white shadow-lg shadow-black/10"
                  : "text-slate-300 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon className="text-lg flex-shrink-0" />
              <span>{label}</span>
              {activeTab === key && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 pulse-dot" />
              )}
            </button>
          ))}
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500/30 flex items-center justify-center">
              <span className="text-indigo-300 text-sm font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{user?.name || "Admin"}</p>
              <p className="text-slate-400 text-xs truncate">{user?.email || ""}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:bg-red-500/15 hover:text-red-400 transition-smooth text-sm"
          >
            <FiLogOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 glass border-b border-slate-200/60 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-smooth"
          >
            {sidebarOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
          <h1 className="font-bold text-slate-800 gradient-text">Admin Dashboard</h1>
          <div className="w-10" />
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Page Title */}
          <div className="mb-8 fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Welcome back, <span className="gradient-text">{user?.name || "Admin"}</span>
            </h2>
            <p className="text-slate-500 mt-1">Here&apos;s what&apos;s happening with your hotels today.</p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {statCards.map(({ label, value, icon: Icon, color }, idx) => (
              <div
                key={label}
                className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-6 card-hover fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">{label}</p>
                    <p className="text-3xl font-bold text-slate-800 mt-1">
                      {loading ? (
                        <span className="inline-block w-10 h-8 bg-slate-200 rounded-lg animate-pulse" />
                      ) : (
                        value
                      )}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                    <Icon className="text-white text-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tab Content */}
          <div className="slide-up" key={activeTab}>
            {activeTab === "hotels" && (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <AddHotelForm onSuccess={fetchStats} />
                  <AddRoomForm onSuccess={fetchStats} />
                </div>
                {/* Hotel List */}
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <FiGrid className="text-indigo-600" />
                    All Hotels
                  </h3>
                  {hotels.length === 0 ? (
                    <div className="text-center py-12">
                      <FiGrid className="mx-auto text-4xl text-slate-300 mb-3" />
                      <p className="text-slate-400 font-medium">No hotels added yet</p>
                      <p className="text-slate-400 text-sm mt-1">Use the form above to add your first hotel.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {hotels.map((hotel) => (
                        <div
                          key={hotel.id}
                          className="border border-slate-100 rounded-xl p-4 hover:border-indigo-200 hover:shadow-md transition-smooth"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="font-semibold text-slate-800">{hotel.name}</h4>
                            <span className="shrink-0 text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                              ID: {hotel.id}
                            </span>
                          </div>
                          <p className="text-slate-500 text-sm mt-1">{hotel.location}</p>
                          {hotel.facilities && hotel.facilities.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {hotel.facilities.map((f, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs rounded-full font-medium"
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "staff" && (
              <ManageReceptionists onUpdate={fetchStats} />
            )}

            {activeTab === "promotions" && (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <PromotionForm onSuccess={fetchStats} />
                  <div /> {/* Spacer for alignment */}
                </div>
                <PromotionList promotions={promotions} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
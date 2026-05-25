import { useState, useEffect, useCallback } from "react";
import { FiUserPlus, FiMail, FiLock, FiUser, FiCheck, FiAlertCircle, FiUsers } from "react-icons/fi";
import { getReceptionists, createReceptionist } from "../services/userService";

const ROLE_STYLES = {
  ADMIN: "bg-red-50 text-red-700 border-red-200",
  RECEPTIONIST: "bg-indigo-50 text-indigo-700 border-indigo-200",
  CUSTOMER: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const ManageReceptionists = ({ onUpdate }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [alert, setAlert] = useState(null);

  const fetchUsers = useCallback(async () => {
    setFetching(true);
    try {
      const data = await getReceptionists();
      setUsers(Array.isArray(data) ? data : []);
    } catch {
      setUsers([]);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    try {
      await createReceptionist({ ...form, role: "RECEPTIONIST" });
      setAlert({ type: "success", msg: "Receptionist created successfully!" });
      setForm({ name: "", email: "", password: "" });
      fetchUsers();
      onUpdate?.();
    } catch (err) {
      setAlert({
        type: "error",
        msg: err?.response?.data?.message || "Failed to create receptionist.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Create Form */}
      <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-6 mb-8 card-hover">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <FiUserPlus className="text-white text-lg" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Add Receptionist</h3>
            <p className="text-slate-400 text-xs">Create a new staff account</p>
          </div>
        </div>

        {alert && (
          <div
            className={`flex items-center gap-2 p-3 rounded-xl mb-4 text-sm font-medium fade-in ${
              alert.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {alert.type === "success" ? <FiCheck className="flex-shrink-0" /> : <FiAlertCircle className="flex-shrink-0" />}
            {alert.msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 bg-slate-50/50 focus:bg-white transition-smooth"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="john@hotel.com"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 bg-slate-50/50 focus:bg-white transition-smooth"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 bg-slate-50/50 focus:bg-white transition-smooth"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2.5 px-8 rounded-xl shadow-lg shadow-indigo-500/25 transition-smooth disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <FiUserPlus className="text-lg" />
                  Create Receptionist
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <FiUsers className="text-indigo-600" />
          All Users
          <span className="ml-auto text-sm font-normal text-slate-400">{users.length} total</span>
        </h3>

        {fetching ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center gap-4 p-4 rounded-xl bg-slate-50">
                <div className="w-10 h-10 rounded-full bg-slate-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <FiUsers className="mx-auto text-4xl text-slate-300 mb-3" />
            <p className="text-slate-400 font-medium">No users found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {users.map((u, idx) => (
              <div
                key={u.id || idx}
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:shadow-sm transition-smooth fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md flex-shrink-0">
                  <span className="text-white font-bold text-sm">
                    {u.name?.charAt(0)?.toUpperCase() || "?"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 truncate">{u.name}</p>
                  <p className="text-slate-500 text-sm truncate">{u.email}</p>
                </div>
                <span
                  className={`badge border ${ROLE_STYLES[u.role] || "bg-slate-50 text-slate-600 border-slate-200"}`}
                >
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageReceptionists;
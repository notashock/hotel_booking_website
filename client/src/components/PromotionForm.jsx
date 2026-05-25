import { useState } from "react";
import { FiGift, FiTag, FiCalendar, FiCheck, FiAlertCircle } from "react-icons/fi";
import { createPromotion } from "../services/promotionService";

const PROMO_TYPES = ["SEASONAL", "LOYALTY"];

const PromotionForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ code: "", discountAmount: "", type: "SEASONAL", expiryDate: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    try {
      await createPromotion({
        code: form.code,
        discountAmount: Number(form.discountAmount),
        type: form.type,
        expiryDate: form.expiryDate,
      });
      setAlert({ type: "success", msg: "Promotion created successfully!" });
      setForm({ code: "", discountAmount: "", type: "SEASONAL", expiryDate: "" });
      onSuccess?.();
    } catch (err) {
      setAlert({
        type: "error",
        msg: err?.response?.data?.message || "Failed to create promotion.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-6 card-hover">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <FiGift className="text-white text-lg" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Create Promotion</h3>
          <p className="text-slate-400 text-xs">Add a new discount or offer</p>
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Promo Code</label>
          <div className="relative">
            <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              name="code"
              value={form.code}
              onChange={handleChange}
              required
              placeholder="SUMMER2026"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 bg-slate-50/50 focus:bg-white transition-smooth uppercase"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Discount Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-sm">₹</span>
            <input
              type="number"
              name="discountAmount"
              value={form.discountAmount}
              onChange={handleChange}
              required
              min="1"
              placeholder="500"
              className="w-full pl-8 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 bg-slate-50/50 focus:bg-white transition-smooth"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Promotion Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 bg-slate-50/50 focus:bg-white transition-smooth appearance-none cursor-pointer"
          >
            {PROMO_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Expiry Date</label>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="date"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 bg-slate-50/50 focus:bg-white transition-smooth"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-purple-500/25 transition-smooth disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <FiGift className="text-lg" />
              Create Promotion
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PromotionForm;
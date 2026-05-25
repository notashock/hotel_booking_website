import { FiGift, FiCalendar, FiTag } from "react-icons/fi";

const TYPE_CONFIG = {
  SEASONAL: {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    border: "border-l-amber-400",
    icon: "text-amber-500",
  },
  LOYALTY: {
    badge: "bg-violet-50 text-violet-700 border-violet-200",
    border: "border-l-violet-500",
    icon: "text-violet-500",
  },
};

const PromotionList = ({ promotions = [] }) => {
  if (promotions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-12 text-center">
        <FiGift className="mx-auto text-5xl text-slate-300 mb-4" />
        <p className="text-slate-500 font-semibold text-lg">No promotions yet</p>
        <p className="text-slate-400 text-sm mt-1">Create your first promotion to get started.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <FiTag className="text-purple-600" />
        Active Promotions
        <span className="ml-auto text-sm font-normal text-slate-400">{promotions.length} total</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {promotions.map((promo, idx) => {
          const config = TYPE_CONFIG[promo.type] || TYPE_CONFIG.SEASONAL;
          return (
            <div
              key={promo.id || idx}
              className={`bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-5 border-l-4 ${config.border} card-hover fade-in`}
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xl font-bold text-slate-800 tracking-wide">{promo.code}</p>
                  <p className="text-2xl font-bold gradient-text mt-1">
                    ₹{promo.discountAmount?.toLocaleString?.() || promo.discountAmount}
                  </p>
                </div>
                <span className={`badge border text-xs ${config.badge}`}>
                  {promo.type}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                <FiCalendar className="flex-shrink-0" />
                <span>
                  Expires:{" "}
                  {promo.expiryDate
                    ? new Date(promo.expiryDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PromotionList;
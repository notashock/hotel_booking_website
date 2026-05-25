const gradients = {
  indigo: "from-indigo-500 to-indigo-700",
  emerald: "from-emerald-500 to-emerald-700",
  amber: "from-amber-500 to-amber-700",
  rose: "from-rose-500 to-rose-700",
  violet: "from-violet-500 to-violet-700",
  cyan: "from-cyan-500 to-cyan-700",
};

const OccupancyCard = ({ title, value, icon: Icon, color = "indigo" }) => {
  const gradient = gradients[color] || gradients.indigo;

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} rounded-2xl shadow-lg p-6 card-hover`}>
      {/* ── Background decoration ── */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-8 -translate-x-6" />

      <div className="relative z-10">
        {/* ── Live Indicator ── */}
        <div className="flex items-center justify-between mb-4">
          {Icon && (
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Icon className="text-white" size={22} />
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white pulse-dot" />
            <span className="text-white/70 text-xs font-medium">Live</span>
          </div>
        </div>

        {/* ── Value ── */}
        <p className="text-4xl font-bold text-white tracking-tight mb-1">
          {value}
        </p>

        {/* ── Title ── */}
        <p className="text-sm font-medium text-white/80">
          {title}
        </p>
      </div>
    </div>
  );
};

export default OccupancyCard;
import { Link } from 'react-router-dom';
import { FiDollarSign, FiHeadphones, FiShield, FiArrowRight } from 'react-icons/fi';

const features = [
  {
    icon: FiDollarSign,
    title: 'Best Prices',
    description: 'We guarantee the lowest prices on luxury hotel rooms across India. No hidden fees, no surprises.',
  },
  {
    icon: FiHeadphones,
    title: '24/7 Support',
    description: 'Our dedicated support team is available round the clock to assist you with any queries or issues.',
  },
  {
    icon: FiShield,
    title: 'Verified Hotels',
    description: 'Every hotel on our platform is personally verified to ensure quality, safety, and comfort standards.',
  },
];

const Home = () => {
  return (
    <div className="fade-in">
      {/* ── Hero Section ───────────────────────────── */}
      <section className="gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-44 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
            Find Your <span className="text-indigo-400">Perfect Stay</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover handpicked luxury hotels at unbeatable prices. Your dream vacation starts here with world-class comfort and service.
          </p>
          <div className="mt-10">
            <Link
              to="/hotels"
              className="inline-flex items-center gap-2 gradient-bg-primary text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-smooth"
            >
              Explore Hotels
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Feature Cards ──────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Why Choose <span className="gradient-text">StayEase</span>?
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">
            We make hotel booking effortless with premium features designed for you.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl shadow-lg p-8 card-hover text-center"
            >
              <div className="w-16 h-16 gradient-bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────── */}
      <section className="gradient-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Book Your Next Stay?
          </h2>
          <p className="text-indigo-100 text-lg max-w-xl mx-auto mb-10">
            Join thousands of happy travelers who found their perfect hotel through our platform.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-8 py-4 rounded-xl text-lg hover:bg-indigo-50 hover:scale-105 transition-smooth shadow-lg"
          >
            Get Started Free
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
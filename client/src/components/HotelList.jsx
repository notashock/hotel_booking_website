import { Link } from 'react-router-dom';
import { FiMapPin, FiArrowRight, FiSearch } from 'react-icons/fi';

const HotelList = ({ hotels }) => {
  if (!hotels || hotels.length === 0) {
    return (
      <div className="text-center py-20 fade-in">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiSearch className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-700 mb-2">No Hotels Found</h3>
        <p className="text-slate-500">Try adjusting your search filters to find more results.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotels.map((hotel) => (
        <div
          key={hotel.id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
        >
          {/* Color Accent Bar */}
          <div className="h-2 gradient-bg-primary" />

          <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-xl font-bold text-slate-900">{hotel.name}</h3>
              <span className="shrink-0 text-[10px] font-bold tracking-wider uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                ID: {hotel.id}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-500 mb-4">
              <FiMapPin className="w-4 h-4 text-indigo-500 shrink-0" />
              <span className="text-sm">{hotel.location}</span>
            </div>

            {/* Facilities */}
            {hotel.facilities && hotel.facilities.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {hotel.facilities.map((facility, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-lg"
                  >
                    {facility}
                  </span>
                ))}
              </div>
            )}

            <Link
              to={`/hotels/${hotel.id}`}
              className="inline-flex items-center gap-2 w-full justify-center gradient-bg-primary text-white font-semibold py-2.5 rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-smooth text-sm"
            >
              View Rooms
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelList;
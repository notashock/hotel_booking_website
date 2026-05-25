import { FiMapPin, FiDollarSign, FiStar } from 'react-icons/fi';

const SearchAndFilter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Location */}
        <div>
          <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-2">
            <FiMapPin className="w-4 h-4 text-indigo-500" />
            Location
          </label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="e.g. Mumbai"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white transition-smooth text-sm"
          />
        </div>

        {/* Min Price */}
        <div>
          <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-2">
            <FiDollarSign className="w-4 h-4 text-indigo-500" />
            Min Price
          </label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="₹ 0"
            min="0"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white transition-smooth text-sm"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-2">
            <FiDollarSign className="w-4 h-4 text-indigo-500" />
            Max Price
          </label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="₹ 50000"
            min="0"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white transition-smooth text-sm"
          />
        </div>

        {/* Amenities */}
        <div>
          <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-2">
            <FiStar className="w-4 h-4 text-indigo-500" />
            Amenities
          </label>
          <input
            type="text"
            name="amenities"
            value={filters.amenities}
            onChange={handleChange}
            placeholder="e.g. Pool, WiFi"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white transition-smooth text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
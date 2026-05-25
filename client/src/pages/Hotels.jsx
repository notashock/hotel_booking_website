import { useState, useEffect, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import { getAllHotels } from '../services/hotelService';
import SearchAndFilter from '../components/SearchAndFilter';
import HotelList from '../components/HotelList';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    amenities: '',
  });

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await getAllHotels();
        setHotels(data || []);
      } catch (err) {
        setError(err.message || 'Failed to load hotels.');
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      // Location filter
      if (filters.location && !hotel.location?.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      // Amenities filter — hotel.facilities is a List<String>
      if (filters.amenities) {
        const searchAmenity = filters.amenities.toLowerCase().trim();
        const hasFacility = hotel.facilities?.some((f) =>
          f.toLowerCase().includes(searchAmenity)
        );
        if (!hasFacility) return false;
      }
      return true;
    });
  }, [hotels, filters]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="gradient-bg py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 fade-in">
            Explore Our <span className="text-indigo-400">Hotels</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            Browse through our curated collection of premium hotels
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
        <SearchAndFilter filters={filters} setFilters={setFilters} />

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 max-w-md mx-auto">
              <p className="font-medium">{error}</p>
            </div>
          </div>
        ) : (
          <HotelList hotels={filteredHotels} />
        )}
      </div>
    </div>
  );
};

export default Hotels;
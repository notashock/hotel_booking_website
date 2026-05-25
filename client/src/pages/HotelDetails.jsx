import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiMapPin, FiArrowLeft, FiCheck, FiX } from 'react-icons/fi';
import { getHotelRooms, getAllHotels } from '../services/hotelService';
import BookingForm from '../components/BookingForm';

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedRoom, setExpandedRoom] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allHotels, roomData] = await Promise.all([
          getAllHotels(),
          getHotelRooms(id),
        ]);
        const found = allHotels.find((h) => String(h.id) === String(id));
        setHotel(found || null);
        setRooms(roomData || []);
      } catch (err) {
        setError(err.message || 'Failed to load hotel details.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const toggleBookingForm = (roomId) => {
    setExpandedRoom(expandedRoom === roomId ? null : roomId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-8 max-w-md text-center">
          <p className="font-medium">{error}</p>
          <Link to="/hotels" className="inline-block mt-4 text-indigo-600 font-semibold hover:text-indigo-700">
            ← Back to Hotels
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hotel Header */}
      <div className="gradient-bg py-16 px-4">
        <div className="max-w-7xl mx-auto fade-in">
          <Link to="/hotels" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-smooth mb-6 text-sm font-medium">
            <FiArrowLeft className="w-4 h-4" />
            Back to Hotels
          </Link>
          {hotel ? (
            <>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 flex flex-wrap items-center gap-3">
                <span>{hotel.name}</span>
                <span className="text-sm font-semibold tracking-wide text-indigo-200 bg-white/10 px-2.5 py-1 rounded-lg backdrop-blur-sm self-center">
                  ID: {hotel.id}
                </span>
              </h1>
              <div className="flex items-center gap-2 text-slate-300 mb-4">
                <FiMapPin className="w-5 h-5 text-indigo-400" />
                <span className="text-lg">{hotel.location}</span>
              </div>
              {hotel.facilities && hotel.facilities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {hotel.facilities.map((facility, idx) => (
                    <span key={idx} className="bg-white/10 text-white text-sm font-medium px-3 py-1 rounded-lg backdrop-blur-sm">
                      {facility}
                    </span>
                  ))}
                </div>
              )}
            </>
          ) : (
            <h1 className="text-3xl font-bold text-white">Hotel Not Found</h1>
          )}
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">
          Available Rooms
          <span className="ml-2 text-sm font-normal text-slate-500">({rooms.length} rooms)</span>
        </h2>

        {rooms.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <p className="text-slate-500 text-lg">No rooms available for this hotel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div key={room.id} className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900">{room.roomCategory}</h3>
                    <span className={`badge ${room.isAvailable ? 'badge-confirmed' : 'badge-cancelled'}`}>
                      {room.isAvailable ? (
                        <><FiCheck className="w-3 h-3 mr-1" /> Available</>
                      ) : (
                        <><FiX className="w-3 h-3 mr-1" /> Unavailable</>
                      )}
                    </span>
                  </div>

                  <div className="text-2xl font-extrabold text-indigo-600 mb-4">
                    ₹{room.price?.toLocaleString('en-IN')}
                    <span className="text-sm font-normal text-slate-400 ml-1">/night</span>
                  </div>

                  {/* Room Amenities */}
                  {room.amenities && room.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {(Array.isArray(room.amenities) ? room.amenities : [room.amenities]).map((amenity, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-600 text-xs font-medium px-2 py-1 rounded-md">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  )}

                  {room.isAvailable && (
                    <button
                      onClick={() => toggleBookingForm(room.id)}
                      className={`w-full font-semibold py-2.5 rounded-xl transition-smooth text-sm ${
                        expandedRoom === room.id
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          : 'gradient-bg-primary text-white hover:shadow-lg hover:shadow-indigo-500/25'
                      }`}
                    >
                      {expandedRoom === room.id ? 'Hide Booking Form' : 'Book This Room'}
                    </button>
                  )}
                </div>

                {/* Expandable Booking Form */}
                {expandedRoom === room.id && (
                  <div className="border-t border-slate-100 p-6 bg-slate-50 slide-up">
                    <BookingForm roomId={room.id} price={room.price} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelDetails;
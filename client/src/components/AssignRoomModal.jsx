import { useState, useEffect } from "react";
import { FiKey, FiX, FiUser, FiHash, FiLoader, FiCheck, FiFilter, FiInfo, FiLayers } from "react-icons/fi";
import { assignRoom } from "../services/receptionService";
import { getHotelRooms } from "../services/hotelService";

const AssignRoomModal = ({ booking, onClose, refreshBookings }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingAssign, setLoadingAssign] = useState(false);
  const [filterCategoryOnly, setFilterCategoryOnly] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      if (!booking?.hotelId) {
        setError("Invalid booking: Hotel information is missing.");
        setLoadingRooms(false);
        return;
      }
      try {
        setLoadingRooms(true);
        setError("");
        const data = await getHotelRooms(booking.hotelId);
        // Only keep available rooms
        const availableRooms = (data || []).filter((room) => room.isAvailable);
        setRooms(availableRooms);
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
        setError("Could not load available rooms.");
      } finally {
        setLoadingRooms(false);
      }
    };
    fetchRooms();
  }, [booking?.hotelId]);

  const handleAssignRoom = async () => {
    if (!selectedRoomId) {
      setError("Please select a room first");
      return;
    }
    setLoadingAssign(true);
    setError("");
    try {
      await assignRoom(booking.id, selectedRoomId);
      refreshBookings();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to assign room. Please try again.");
    } finally {
      setLoadingAssign(false);
    }
  };

  // Filter based on checkbox selection
  const filteredRooms = rooms.filter((room) => {
    if (filterCategoryOnly) {
      return room.roomCategory?.toUpperCase() === booking.roomCategory?.toUpperCase();
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg slide-up flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <FiKey className="text-emerald-600" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Assign Room</h2>
              <p className="text-xs text-slate-400">Select an available physical room</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-smooth"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="px-6 py-5 space-y-5 overflow-y-auto flex-1">
          {/* Booking Info */}
          <div className="bg-slate-50 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 border border-slate-100">
            <div className="flex items-center gap-2.5 text-sm">
              <FiUser className="text-slate-400 flex-shrink-0" size={15} />
              <div>
                <span className="text-xs text-slate-400 block">Guest Name</span>
                <span className="font-semibold text-slate-800">
                  {booking.customerName || booking.userName}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <FiHash className="text-slate-400 flex-shrink-0" size={15} />
              <div>
                <span className="text-xs text-slate-400 block">Reservation Number</span>
                <span className="font-mono font-semibold text-slate-800">{booking.reservationNumber}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-sm col-span-1 sm:col-span-2 pt-2 border-t border-slate-200/50">
              <FiLayers className="text-slate-400 flex-shrink-0" size={15} />
              <div>
                <span className="text-xs text-slate-400 block">Booked Category</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {booking.roomCategory}
                </span>
              </div>
            </div>
          </div>

          {/* Filtering controls */}
          {!loadingRooms && rooms.length > 0 && (
            <div className="flex items-center justify-between bg-slate-50/50 rounded-xl p-3 border border-slate-100">
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                <FiFilter size={13} />
                Filters
              </span>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={filterCategoryOnly}
                  onChange={(e) => setFilterCategoryOnly(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4 border-slate-300"
                />
                Match "{booking.roomCategory}" Only
              </label>
            </div>
          )}

          {/* Available Rooms list */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700">
              Available Rooms
            </label>

            {loadingRooms ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <FiLoader className="animate-spin text-emerald-600 mb-3" size={28} />
                <span className="text-sm font-medium">Scanning for available rooms...</span>
              </div>
            ) : error ? (
              <div className="px-4 py-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium">
                {error}
              </div>
            ) : filteredRooms.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <FiInfo className="text-slate-400 mb-2" size={26} />
                <p className="text-sm font-bold text-slate-800">No rooms available</p>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  {filterCategoryOnly
                    ? `No available ${booking.roomCategory} rooms. Try unchecking the filter to see other categories.`
                    : "There are currently no available rooms at this hotel."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
                {filteredRooms.map((room) => {
                  const isSelected = selectedRoomId === room.id;
                  const isMatchingCategory =
                    room.roomCategory?.toUpperCase() === booking.roomCategory?.toUpperCase();

                  return (
                    <div
                      key={room.id}
                      onClick={() => {
                        setSelectedRoomId(room.id);
                        setError("");
                      }}
                      className={`relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-50/30 shadow-md shadow-emerald-100/50 scale-[0.98]"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="text-sm font-extrabold text-slate-800">
                            Room #{room.id}
                          </span>
                          <span className={`block text-xs font-semibold mt-0.5 ${
                            isMatchingCategory ? "text-indigo-600" : "text-slate-500"
                          }`}>
                            {room.roomCategory}
                          </span>
                        </div>
                        {isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                            <FiCheck size={12} />
                          </div>
                        ) : isMatchingCategory ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-indigo-100 text-indigo-700 border border-indigo-200 uppercase">
                            Match
                          </span>
                        ) : null}
                      </div>

                      {/* Room Price */}
                      <div className="mt-auto pt-2 flex items-baseline justify-between border-t border-slate-100">
                        <span className="text-xs text-slate-400">Rate</span>
                        <span className="text-sm font-bold text-slate-700">
                          ${room.price}
                          <span className="text-[10px] font-medium text-slate-400">/night</span>
                        </span>
                      </div>

                      {/* Amenities */}
                      {room.amenities && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {room.amenities.split(",").slice(0, 3).map((amenity, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium"
                            >
                              {amenity.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* General Errors */}
          {error && !loadingRooms && (
            <div className="px-4 py-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium fade-in">
              {error}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="flex gap-3 px-6 py-5 border-t border-slate-100 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-smooth"
          >
            Cancel
          </button>
          <button
            onClick={handleAssignRoom}
            disabled={loadingAssign || loadingRooms || !selectedRoomId}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-200 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingAssign ? (
              <>
                <FiLoader className="animate-spin" size={15} />
                Assigning…
              </>
            ) : (
              <>
                <FiKey size={15} />
                Assign Room
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignRoomModal;
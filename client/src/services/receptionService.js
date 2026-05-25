import API from "./api";

export const getDailyArrivals = async () => {
  const response = await API.get("/reception/arrivals");
  return response.data.data;
};

export const checkInBooking = async (bookingId) => {
  const response = await API.put(`/reception/${bookingId}/check-in`);
  return response.data.data;
};

export const checkOutBooking = async (bookingId) => {
  const response = await API.put(`/reception/${bookingId}/check-out`);
  return response.data.data;
};

export const assignRoom = async (bookingId, roomNumber) => {
  const response = await API.put(`/reception/${bookingId}/assign-room?newRoomId=${roomNumber}`);
  return response.data.data;
};

export const getOccupancyStats = async () => {
  const response = await API.get("/reception/occupancy");
  return response.data.data;
};

export const searchReservation = async (reservationNumber) => {
  const response = await API.get(`/reception/search/${reservationNumber}`);
  return response.data.data;
};

export const getDailyDepartures = async () => {
  const response = await API.get("/reception/departures");
  return response.data.data;
};

export const updateBookingDates = async (bookingId, checkInDate, checkOutDate) => {
  const response = await API.put(
    `/reception/${bookingId}/dates?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
  );
  return response.data.data;
};
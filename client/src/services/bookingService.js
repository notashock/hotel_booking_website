import API from "./api";

export const createBooking = async (bookingData) => {
  const response = await API.post("/customer/bookings", bookingData);
  return response.data.data;
};

export const getBookingHistory = async () => {
  const response = await API.get("/customer/bookings/history");
  return response.data.data;
};

export const getAllBookings = async () => {
  const response = await API.get("/admin/bookings");
  return response.data.data;
};

export const cancelBooking = async (bookingId) => {
  const response = await API.put(`/reception/${bookingId}/cancel`);
  return response.data.data;
};

export const rebookRoom = async (bookingId, bookingData) => {
  const response = await API.put(
    `/customer/bookings/${bookingId}/rebook?checkInDate=${bookingData.checkInDate}&checkOutDate=${bookingData.checkOutDate}`
  );
<<<<<<< HEAD

  return response.data;
};

export const getBookingHistory =
  async () => {

    const response = await API.get(
      "/bookings/history"
    );

    return response.data;
};
export const getAllBookings =
  async () => {

    const response = await API.get(
      "/bookings"
    );

    return response.data;
};

export const cancelBooking =
  async (bookingId) => {

    const response = await API.put(
      `/bookings/cancel/${bookingId}`
    );

    return response.data;
};
export const rebookRoom =
  async (bookingId, bookingData) => {

    const response = await API.post(
      `/bookings/rebook/${bookingId}`,
      bookingData
    );

    return response.data;
};
export const updateBooking =
  async (bookingId, bookingData) => {

    const response = await API.put(
      `/bookings/${bookingId}`,
      bookingData
    );

    return response.data;
=======
  return response.data.data;
>>>>>>> ashok
};
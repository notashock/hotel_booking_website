import API from "./api";

export const createBooking = async (
  bookingData
) => {

  const response = await API.post(
    "/bookings",
    bookingData
  );

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
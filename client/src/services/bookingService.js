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
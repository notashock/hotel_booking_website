import API from "./api";

export const getDailyArrivals =
  async () => {

    const response = await API.get(
      "/reception/arrivals"
    );

    return response.data;
};

export const checkInBooking =
  async (bookingId) => {

    const response = await API.put(
      `/reception/checkin/${bookingId}`
    );

    return response.data;
};

export const checkOutBooking =
  async (bookingId) => {

    const response = await API.put(
      `/reception/checkout/${bookingId}`
    );

    return response.data;
};
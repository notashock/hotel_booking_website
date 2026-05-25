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
export const assignRoom =
  async (bookingId, roomNumber) => {

    const response = await API.put(
      `/reception/assign-room/${bookingId}`,
      {
        roomNumber,
      }
    );

    return response.data;
};
export const getOccupancyStats =
  async () => {

    const response = await API.get(
      "/reception/occupancy"
    );

    return response.data;
};
export const searchReservation =
  async (reservationNumber) => {

    const response = await API.get(
      `/reception/search/${reservationNumber}`
    );

    return response.data;
};
export const getDailyDepartures =
  async () => {

    const response = await API.get(
      "/reception/departures"
    );

    return response.data;
};
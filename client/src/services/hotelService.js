import API from "./api";

export const getAllHotels = async () => {

  const response = await API.get("/hotels");

  return response.data;
};
export const getHotelById = async (id) => {

  const response = await API.get(
    `/hotels/${id}`
  );

  return response.data;
};
export const addHotel = async (
  hotelData
) => {

  const response = await API.post(
    "/hotels",
    hotelData
  );

  return response.data;
};
export const addRoom = async (
  roomData
) => {

  const response = await API.post(
    "/rooms",
    roomData
  );

  return response.data;
};
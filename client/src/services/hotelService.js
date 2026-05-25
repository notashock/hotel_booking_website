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
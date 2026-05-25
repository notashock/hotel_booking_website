import API from "./api";

export const getAllHotels = async () => {

  const response = await API.get("/hotels");

  return response.data;
};
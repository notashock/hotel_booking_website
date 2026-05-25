import API from "./api";

export const getAllHotels = async () => {
  const response = await API.get("/customer/hotels");
  return response.data.data;
};

export const getHotelRooms = async (hotelId) => {
  const response = await API.get(`/customer/hotels/${hotelId}/rooms`);
  return response.data.data;
};

export const searchHotels = async (params) => {
  const response = await API.get("/customer/hotels/search", { params });
  return response.data.data;
};

export const addHotel = async (hotelData) => {
  const response = await API.post("/admin/hotels", hotelData);
  return response.data.data;
};

export const addRoom = async (roomData) => {
  const response = await API.post("/admin/rooms", roomData);
  return response.data.data;
};

export const toggleRoomAvailability = async (roomId, isAvailable) => {
  const response = await API.put(`/admin/rooms/${roomId}/availability?isAvailable=${isAvailable}`);
  return response.data.data;
};
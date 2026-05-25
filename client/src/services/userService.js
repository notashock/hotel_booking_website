import API from "./api";

export const getReceptionists = async () => {
  const response = await API.get("/admin/users");
  return response.data.data;
};

export const createReceptionist = async (userData) => {
  const response = await API.post("/admin/receptionists", userData);
  return response.data.data;
};

// Removed deleteReceptionist as the backend does not support it
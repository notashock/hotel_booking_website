import API from "./api";

<<<<<<< HEAD
export const getReceptionists =
  async () => {

    const response = await API.get(
      "/users/receptionists"
    );

    return response.data;
};

export const createReceptionist =
  async (userData) => {

    const response = await API.post(
      "/users/receptionists",
      userData
    );

    return response.data;
};

export const deleteReceptionist =
  async (id) => {

    const response = await API.delete(
      `/users/receptionists/${id}`
    );

    return response.data;
};
=======
export const getReceptionists = async () => {
  const response = await API.get("/admin/users");
  return response.data.data;
};

export const createReceptionist = async (userData) => {
  const response = await API.post("/admin/users", userData);
  return response.data.data;
};

// Removed deleteReceptionist as the backend does not support it
>>>>>>> ashok

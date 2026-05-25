import API from "./api";

export const validatePromoCode =
  async (code) => {

    const response = await API.get(
      `/promotions/${code}`
    );

    return response.data;
};
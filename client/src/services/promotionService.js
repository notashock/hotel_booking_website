import API from "./api";

export const validatePromoCode =
  async (code) => {

    const response = await API.get(
      `/promotions/${code}`
    );

    return response.data;
};

export const createPromotion =
  async (promotionData) => {

    const response = await API.post(
      "/promotions",
      promotionData
    );

    return response.data;
};

export const getAllPromotions =
  async () => {

    const response = await API.get(
      "/promotions"
    );

    return response.data;
};
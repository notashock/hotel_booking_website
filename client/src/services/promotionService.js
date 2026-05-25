import API from "./api";

export const validatePromoCode = async (code) => {
  const response = await API.get(`/customer/promotions/validate?code=${code}`);
  return response.data.data;
};

export const createPromotion = async (promotionData) => {
  const response = await API.post("/admin/promotions", promotionData);
  return response.data.data;
};

export const getAllPromotions = async () => {
  const response = await API.get("/admin/promotions");
  return response.data.data;
};
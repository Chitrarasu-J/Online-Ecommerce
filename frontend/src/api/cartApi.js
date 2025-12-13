import API from "./axiosConfig";
  // your axios file

export const addToCartApi = (templateId) =>
  API.post("/cart/add", { templateId });

export const getCartApi = () =>
  API.get("/cart");

export const removeFromCartApi = (itemId) =>
  API.delete(`/cart/${itemId}`);

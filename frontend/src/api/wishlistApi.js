import API from "./axiosConfig";

export const addToWishlistApi = (templateId) =>
  API.post("/wishlist/add", { templateId });

export const getWishlistApi = () => API.get("/wishlist");

export const removeFromWishlistApi = (itemId) =>
  API.delete(`/wishlist/${itemId}`);

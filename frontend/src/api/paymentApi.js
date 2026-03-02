import API from "./axiosConfig";

export const initiatePayment = (data) =>
  API.post("/payment/initiate", data);

export const verifyPayment = (data) =>
  API.post("/payment/verify", data);

export default API;

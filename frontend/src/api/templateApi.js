import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/templates",
});

// Get all templates
export const getAllTemplates = async () => {
  const res = await API.get("/");
  return res.data;
};
// Get single template
export const getTemplateById = async (id) => {
  const res = await API.get(`/${id}`);
  return res.data;
};

import API from "./axiosConfig";

export const getAllTemplates = async () => {
  const res = await API.get("/templates");
  return res.data;
};

export const getTemplateById = async (id) => {
  const res = await API.get(`/templates/${id}`);
  return res.data;
};

export default API;

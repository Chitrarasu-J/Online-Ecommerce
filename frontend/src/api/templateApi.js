import axios from "axios";
import API from "./axiosConfig";

export const getAllTemplates = () => API.get("/templates");


const API = axios.create({
  baseURL: "http://localhost:5001/api", 
});

export default API;

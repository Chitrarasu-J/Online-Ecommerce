import axios from "axios";

export const loginUser = async (email, password) => {
  const res = await axios.post("http://localhost:5000/api/auth/login", {
    email,
    password,
  });
  return res.data;
};

export const registerUser = async (name, email, password) => {
  const res = await axios.post("http://localhost:5000/api/auth/register", {
    name,
    email,
    password,
  });
  return res.data;
};

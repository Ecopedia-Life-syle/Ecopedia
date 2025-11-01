import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" }); // ganti sesuai URL backend-mu

export const loginUser = async (email, password) => {
  const res = await API.post("auth/login", { email, password });
  return res.data;
};

export const registerUser = async (email, password) => {
  const res = await API.post("auth/register", { email, password });
  return res.data;
};

export const analyzeAi = async (formData) => {
  try {
    const res = await API.post("ai/analyze", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error analyzeAi:", err);
    throw err;
  }
};

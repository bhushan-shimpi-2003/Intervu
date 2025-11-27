// src/api/client.ts
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

// (optional) basic error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error?.response || error);
    return Promise.reject(error);
  }
);

export default api;

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Request logger
api.interceptors.request.use((config) => {
  console.debug("[api] request:", config.method, config.url, config.data);
  return config;
});

// Response logger
api.interceptors.response.use(
  (resp) => {
    console.debug("[api] response:", resp.status, resp.config.url, resp.data);
    return resp;
  },
  (error) => {
    console.error("[api] response error:", error?.response?.status, error?.response?.data, error?.config?.url);
    return Promise.reject(error);
  }
);

export default api;

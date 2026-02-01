import axios from "axios";

const url = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: url,
  timeout: url.includes("localhost") ? 5000 : 15000,
});

api.interceptors.response.use(
  (res) => res.data,
  // (err) => {
  //   console.error(err, err.message)

  // },
);

export default api;

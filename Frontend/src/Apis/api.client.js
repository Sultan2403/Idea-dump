import axios from "axios";

const url = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: url,
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res.data,
  // (err) => {
  //   console.error(err, err.message)

  // },
);

export default api;

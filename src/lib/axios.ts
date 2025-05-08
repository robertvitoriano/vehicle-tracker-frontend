import axios from "axios";
import { env } from "../../env";
export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
});
api.interceptors.request.use(config => {
  config.headers.Authorization = env.VITE_API_TOKEN
  return config
})


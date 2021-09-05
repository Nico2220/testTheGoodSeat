import axios from "axios";
const BASE_URl = "http://localhost:5000";

export const axiosInstance = axios.create({
  baseURL: BASE_URl,
  headers: {
    "Content-Type": "application/json",
  },
});

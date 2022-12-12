import axios from "axios";

const api = axios.create({
  baseURL: "https://upturnpayroll.pupilate.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

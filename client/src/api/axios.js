import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-lottery-dashboard.onrender.com/api"
});

export default API;
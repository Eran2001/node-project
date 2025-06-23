import axios from "axios";

const publicInstance = axios.create({
  baseURL: "http://localhost:5000",
});

const login = (data) => publicInstance.post("/auth/login", data);

export default {
  login,
};

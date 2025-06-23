import axios from "axios";

const privateInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const getUsers = () => privateInstance.get("/users");
const createUser = (data) => privateInstance.post("/users", data);

export default {
  getUsers,
  createUser,
};

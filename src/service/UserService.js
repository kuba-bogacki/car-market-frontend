import axios from "axios";
import authHeader from "./authHeader";

const BASE_URL = "http://localhost:8080";

const getPublicContent = () => {
  return axios.get(BASE_URL + "/all");
};

const getUserBoard = () => {
  return axios.get(BASE_URL + "/user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(BASE_URL + "/mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(BASE_URL + "/admin", { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default UserService;
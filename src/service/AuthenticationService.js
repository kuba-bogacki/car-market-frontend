import axios from "axios";

const BASE_URL = "http://localhost:8080";

const register = (customer) => {
  return axios.post(BASE_URL + "/register", customer)
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response;
    });
};

const login = (customerEmail, customerPassword) => {
  return axios.post(BASE_URL + "/authenticate", {
    customerEmail,
    customerPassword,
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
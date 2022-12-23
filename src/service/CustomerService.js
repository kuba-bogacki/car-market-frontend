import axios from "axios";
import authHeader from "./AuthHeader";

const BASE_URL = "http://localhost:8080";

const getCustomerProfile = () => {
  return axios.get(BASE_URL + "/get-current-customer", {
    headers: authHeader()
  })
    .then((response) => {
      return response.data;
    });
};

const CustomerService = {
  getCustomerProfile
};

export default CustomerService;
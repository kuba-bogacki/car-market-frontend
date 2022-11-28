import axios from "axios";

const BASE_URL = "http://localhost:8080"

const setPublishStripeKey = () => {
  axios.get(BASE_URL + "/get-publish-stripe-key")
    .then((response) => {
      localStorage.setItem("publishKey", JSON.stringify(response.data));
      return response.data;
    });
}

const getPublishStripeKey = () => {
  return JSON.parse(localStorage.getItem("publishKey"));
}

const KeysService = {
  setPublishStripeKey,
  getPublishStripeKey,
};

export default KeysService;
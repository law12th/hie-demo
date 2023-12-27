import Axios from "axios";

export const axios = Axios.create({
  baseURL: "http://localhost:7252/api/",
  headers: {
    "Content-type": "application/json",
  },
});

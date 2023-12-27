import Axios from "axios";

export const axios = Axios.create({
  baseURL: "http://localhost:7095/api/",
  headers: {
    "Content-type": "application/json",
  },
});

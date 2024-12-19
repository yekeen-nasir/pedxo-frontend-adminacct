import axios from "axios";

const authFetch = axios.create({
  baseURL: "https://pedxo.adaptable.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default authFetch;

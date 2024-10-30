import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://restcountries.com/v3.1/all"

});

export default customFetch;

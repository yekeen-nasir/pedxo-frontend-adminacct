import axios from "axios";

const options = {
  headers: {
    "X-CSCAPI-KEY": "OEVBRUJVQUhTaEpYMDdOcmtySGhWUW1rQ1A1V2VxMFlTQ1JoQzhTTQ==",
  },
};

const BASE_URL = `https://api.countrystatecity.in/v1/countries`;

export async function getCountries() {
  const response = await axios.get(`${BASE_URL}`, options);
  if (response.status !== 200) throw new Error("Failed to fetch countries");
  return response?.data;
}

export async function getStates(country) {
  const response = await axios.get(`${BASE_URL}/${country}/states`, options);
  if (response.status !== 200) throw new Error("Failed to fetch states");
  console.log(response?.data);
  return response?.data;
}

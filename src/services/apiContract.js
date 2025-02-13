import authFetch from "../api";

export async function createContract(details) {
  const response = authFetch.post("/contract", details);
  return response?.data;
}

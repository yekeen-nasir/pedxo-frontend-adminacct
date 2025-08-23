// src/utility/adminApi.js
import axios from "axios";
import { authHeader } from "./adminAuth.js";

// ---------- DEPLOYED BACKEND ----------
const BASE_URL = "https://pedxo-back-project.onrender.com"; // deployed backend

// Axios instance for all admin API calls
export const http = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

// Attach Bearer token automatically
http.interceptors.request.use((config) => {
  const tokenHeader = authHeader();
  if (tokenHeader) {
    config.headers = { ...config.headers, ...tokenHeader };
  }
  return config;
});

// Centralized error normalization
function normalizeError(err) {
  if (err.response?.data?.message) return err.response.data.message;
  if (err.response?.data?.error) return err.response.data.error;
  if (err.message) return err.message;
  return "Unexpected error";
}

// ---------- ADMIN AUTH API ----------

export async function adminSignup({ firstName, lastName, email, password, role, signupKey }) {
  try {
    const body = { firstName, lastName, email, password, role, signupKey };
    const res = await http.post("/admin/signup", body);
    return { ok: true, data: res.data };
  } catch (err) {
    return { ok: false, error: normalizeError(err) };
  }
}

export async function adminLogin({ email, password }) {
  try {
    const res = await http.post("/admin/login", { email, password });

    // map backend response to something your frontend expects
    return {
      ok: !res.data.error,           // error: false → ok: true
      data: res.data.data,           // contains { admin, token }
      error: res.data.message || null
    };
  } catch (err) {
    return { ok: false, error: normalizeError(err) };
  }
}

// ---------- ADMIN DATA (Contracts/Developers) ----------

export const listContracts = async () => {
  try {
    const res = await http.get("/admin/contracts");
    return res.data?.data || []; // always return array
  } catch (err) {
    console.warn("Contracts route not available yet:", err.message);
    return []; // default empty array
  }
};

export const listDevelopers = async () => {
  try {
    const res = await http.get("/admin/developers");
    return res.data?.data || [];
  } catch (err) {
    console.warn("Developers route not available yet:", err.message);
    return [];
  }
};


// Example placeholder if backend route doesn't exist yet
export const assignDeveloper = async (data) => {
  try {
    const res = await http.post("/admin/assign-developer", data); // change route to real one when backend is ready
    return res.data;
  } catch (err) {
    console.warn("assignDeveloper route not available yet:", err.message);
    return "No data from backend yet";
  }
};
export const approveAdmin = async (data) => {
  try {
    const res = await http.post("/admin/approve-admin", data); // update when backend route exists
    return res.data;
  } catch (err) {
    console.warn("approveAdmin route not available yet:", err.message);
    return "No data from backend yet";
  }
};
export const changePassword = async (data) => {
  try {
    const res = await http.post("/admin/change-password", data); // update route when backend is ready
    return res.data;
  } catch (err) {
    console.warn("changePassword route not available yet:", err.message);
    return "No data from backend yet";
  }
};
export const listAdmins = async () => {
  try {
    const res = await http.get("/admin/list-admins"); // update with real route when ready
    return res.data?.data || [];
  } catch (err) {
    console.warn("listAdmins route not available yet:", err.message);
    return []; // default empty array 
  }
};

export const getStats = async () => {
  try {
    const res = await http.get("/admin/stats"); // backend route may not exist yet
    return res.data?.data || {
      totalContracts: 0,
      totalDevelopers: 0,
      totalAdmins: 0,
      message: "No data yet", // placeholder for frontend display
    };
  } catch (err) {
    console.warn("Stats route not available yet:", err.message);
    return {
      totalContracts: 0,
      totalDevelopers: 0,
      totalAdmins: 0,
      message: "No data yet", // default values
    };
  }
};



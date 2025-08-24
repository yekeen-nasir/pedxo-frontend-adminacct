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

// ---------- CONTRACTS/HIRES API ----------
// ✅ WORKING ENDPOINT - Used in Contracts page and Dashboard
export const listContracts = async () => {
  try {
    const res = await http.get("/hire/get-all-hires");
    return res.data?.data || res.data || []; // handle different response structures
  } catch (err) {
    console.error("Error fetching contracts:", err.message);
    return []; // default empty array
  }
};

// Create new contract/hire (if needed in future)
export const createContract = async (contractData) => {
  try {
    const res = await http.post("/api/v1/hire", contractData);
    return { ok: true, data: res.data };
  } catch (err) {
    return { ok: false, error: normalizeError(err) };
  }
};

// ---------- DEVELOPERS/TALENTS API ----------
// ✅ WORKING ENDPOINT - Used in Developers page and Dashboard
export const listDevelopers = async () => {
  try {
    const res = await http.get("/talent/details/all");
    return res.data?.data || res.data || [];
  } catch (err) {
    console.error("Error fetching developers:", err.message);
    return [];
  }
};

// Create new developer/talent (if needed)
export const createDeveloper = async (developerData) => {
  try {
    const res = await http.post("/talent/details", developerData);
    return { ok: true, data: res.data };
  } catch (err) {
    return { ok: false, error: normalizeError(err) };
  }
};

// ---------- ASSIGNMENT API ----------
// ✅ WORKING ENDPOINT - Used in Assignment Manager page
// Note: Backend has typo "asign-tallet" instead of "assign-talent"
export const assignDeveloper = async (talentIds, hireId) => {
  try {
    const res = await http.patch("/admin/asign-tallet", {
      talentIds: Array.isArray(talentIds) ? talentIds : [talentIds],
      hierId: hireId  // Note: Backend uses "hierId" not "hireId"
    });
    return { ok: true, data: res.data };
  } catch (err) {
    console.error("Error assigning developer:", err.message);
    return { ok: false, error: normalizeError(err) };
  }
};

// ---------- ADMIN MANAGEMENT (Future endpoints) ----------
export const approveAdmin = async (data) => {
  try {
    const res = await http.post("/admin/approve-admin", data);
    return { ok: true, data: res.data };
  } catch (err) {
    console.warn("approveAdmin route not available yet:", err.message);
    return { ok: false, error: "Feature not available yet" };
  }
};

export const changePassword = async (data) => {
  try {
    const res = await http.post("/admin/change-password", data);
    return { ok: true, data: res.data };
  } catch (err) {
    console.warn("changePassword route not available yet:", err.message);
    return { ok: false, error: "Feature not available yet" };
  }
};

export const listAdmins = async () => {
  try {
    const res = await http.get("/admin/list-admins");
    return res.data?.data || [];
  } catch (err) {
    console.warn("listAdmins route not available yet:", err.message);
    return [];
  }
};

// ---------- STATISTICS API ----------
export const getStats = async () => {
  try {
    const res = await http.get("/admin/stats");
    return res.data?.data || {
      totalContracts: 0,
      totalDevelopers: 0,
      totalAdmins: 0,
      pendingAssignments: 0,
      completedProjects: 0,
      message: "Loading statistics..."
    };
  } catch (err) {
    console.warn("Stats route not available yet:", err.message);
    // Fallback: calculate stats from other endpoints
    try {
      const [contracts, developers] = await Promise.all([
        listContracts(),
        listDevelopers()
      ]);
      
      return {
        totalContracts: contracts.length,
        totalDevelopers: developers.length,
        pendingAssignments: contracts.filter(c => !c.assignedDeveloper).length,
        completedProjects: contracts.filter(c => c.status === 'completed').length,
        totalAdmins: 0,
        message: "Stats calculated from available data"
      };
    } catch (fallbackErr) {
      return {
        totalContracts: 0,
        totalDevelopers: 0,
        totalAdmins: 0,
        pendingAssignments: 0,
        completedProjects: 0,
        message: "Stats unavailable"
      };
    }
  }
};

// ---------- UTILITY FUNCTIONS ----------
// Helper to get contracts without assigned developers
export const getPendingContracts = async () => {
  try {
    const contracts = await listContracts();
    // Filter contracts that don't have assigned developers
    // Adjust the property name based on your actual backend response
    return contracts.filter(contract => 
      !contract.assignedDeveloper && 
      !contract.talentId && 
      !contract.developerId
    );
  } catch (err) {
    console.error("Error fetching pending contracts:", err);
    return [];
  }
};

// Helper to get available developers (not assigned to any active project)
export const getAvailableDevelopers = async () => {
  try {
    const developers = await listDevelopers();
    // You might need to add logic here to filter based on availability
    // For now, returning all developers
    return developers.filter(dev => 
      dev.status === 'available' || 
      !dev.currentProject ||
      true // Remove this line once you have proper availability status
    );
  } catch (err) {
    console.error("Error fetching available developers:", err);
    return [];
  }
};
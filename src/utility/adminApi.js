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

// ---------- ADMIN PROFILE & PASSWORD MANAGEMENT ----------

// Get current admin profile
export const getAdminProfile = async () => {
  try {
    const res = await http.get("/admin/profile");
    return { ok: true, data: res.data?.data || res.data };
  } catch (err) {
    console.warn("getAdminProfile route not available yet:", err.message);
    return { ok: false, error: "Feature not available yet" };
  }
};

// Update admin profile
export const updateAdminProfile = async (profileData) => {
  try {
    const res = await http.put("/admin/profile", profileData);
    return { ok: true, data: res.data?.data || res.data };
  } catch (err) {
    console.warn("updateAdminProfile route not available yet:", err.message);
    return { ok: false, error: "Feature not available yet" };
  }
};

// Change admin password
export const changePassword = async (data) => {
  try {
    const res = await http.post("/admin/change-password", data);
    return { ok: true, data: res.data };
  } catch (err) {
    console.warn("changePassword route not available yet:", err.message);
    return { ok: false, error: "Feature not available yet" };
  }
};

// ---------- NOTIFICATION MANAGEMENT ----------

// Get all notifications for current admin
export const getNotifications = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.unread !== undefined) queryParams.append('unread', params.unread);
    
    const url = `/admin/notifications${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const res = await http.get(url);
    
    return { 
      ok: true, 
      data: res.data?.data || res.data,
      notifications: res.data?.data?.notifications || res.data?.notifications || [],
      unreadCount: res.data?.data?.unreadCount || res.data?.unreadCount || 0
    };
  } catch (err) {
    console.warn("getNotifications route not available yet:", err.message);
    // Return mock data for development
    return {
      ok: false,
      error: "Feature not available yet",
      data: { notifications: [], unreadCount: 0 }
    };
  }
};

// Mark specific notification as read
export const markNotificationAsRead = async (notificationId) => {
  try {
    const res = await http.put(`/admin/notifications/${notificationId}/read`);
    return { ok: true, data: res.data };
  } catch (err) {
    console.warn("markNotificationAsRead route not available yet:", err.message);
    return { ok: false, error: "Feature not available yet" };
  }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async () => {
  try {
    const res = await http.put("/admin/notifications/read-all");
    return { ok: true, data: res.data };
  } catch (err) {
    console.warn("markAllNotificationsAsRead route not available yet:", err.message);
    return { ok: false, error: "Feature not available yet" };
  }
};

// Delete specific notification
export const deleteNotification = async (notificationId) => {
  try {
    const res = await http.delete(`/admin/notifications/${notificationId}`);
    return { ok: true, data: res.data };
  } catch (err) {
    console.warn("deleteNotification route not available yet:", err.message);
    return { ok: false, error: "Feature not available yet" };
  }
};

// Clear all notifications
export const clearAllNotifications = async () => {
  try {
    const res = await http.delete("/admin/notifications/clear-all");
    return { ok: true, data: res.data };
  } catch (err) {
    console.warn("clearAllNotifications route not available yet:", err.message);
    return { ok: false, error: "Feature not available yet" };
  }
};

// Create new notification (for system use)
export const createNotification = async (notificationData) => {
  try {
    const res = await http.post("/admin/notifications", notificationData);
    return { ok: true, data: res.data };
  } catch (err) {
    console.warn("createNotification route not available yet:", err.message);
    return { ok: false, error: "Feature not available yet" };
  }
};

// Send bulk notifications
export const sendBulkNotifications = async (notificationData) => {
  try {
    const res = await http.post("/admin/bulk-notifications", notificationData);
    return { ok: true, data: res.data };
  } catch (err) {
    console.warn("sendBulkNotifications route not available yet:", err.message);
    return { ok: false, error: "Feature not available yet" };
  }
};

// ---------- NOTIFICATION SETTINGS ----------

// Get notification preferences
export const getNotificationSettings = async () => {
  try {
    const res = await http.get("/admin/notification-settings");
    return { 
      ok: true, 
      data: res.data?.data || {
        emailNotifications: true,
        systemAlerts: true,
        weeklyReports: false,
        assignmentNotifications: true,
        contractNotifications: true
      }
    };
  } catch (err) {
    console.warn("getNotificationSettings route not available yet:", err.message);
    // Return default settings
    return { 
      ok: false, 
      error: "Feature not available yet",
      data: {
        emailNotifications: true,
        systemAlerts: true,
        weeklyReports: false,
        assignmentNotifications: true,
        contractNotifications: true
      }
    };
  }
};

// Update notification preferences
export const updateNotificationSettings = async (settings) => {
  try {
    const res = await http.put("/admin/notification-settings", settings);
    return { ok: true, data: res.data?.data || res.data };
  } catch (err) {
    console.warn("updateNotificationSettings route not available yet:", err.message);
    return { ok: false, error: "Feature not available yet" };
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
      activeProjects: 0,
      revenue: {
        thisMonth: 0,
        lastMonth: 0
      },
      recentActivity: [],
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
      
      const activeProjects = contracts.filter(c => c.status === 'active' || c.status === 'in_progress').length;
      
      return {
        totalContracts: contracts.length,
        totalDevelopers: developers.length,
        pendingAssignments: contracts.filter(c => !c.assignedDeveloper && !c.talentId && !c.developerId).length,
        completedProjects: contracts.filter(c => c.status === 'completed').length,
        activeProjects,
        totalAdmins: 0,
        revenue: {
          thisMonth: 0,
          lastMonth: 0
        },
        recentActivity: [],
        message: "Stats calculated from available data"
      };
    } catch (fallbackErr) {
      return {
        totalContracts: 0,
        totalDevelopers: 0,
        totalAdmins: 0,
        pendingAssignments: 0,
        completedProjects: 0,
        activeProjects: 0,
        revenue: {
          thisMonth: 0,
          lastMonth: 0
        },
        recentActivity: [],
        message: "Stats unavailable"
      };
    }
  }
};

// ---------- SECURITY & SESSION MANAGEMENT ----------

// Get active sessions
export const getActiveSessions = async () => {
  try {
    const res = await http.get("/admin/active-sessions");
    return { ok: true, data: res.data?.data || [] };
  } catch (err) {
    console.warn("getActiveSessions route not available yet:", err.message);
    return { 
      ok: false, 
      error: "Feature not available yet",
      data: []
    };
  }
};

// Terminate specific session
export const terminateSession = async (sessionId) => {
  try {
    const res = await http.delete(`/admin/sessions/${sessionId}`);
    return { ok: true, data: res.data };
  } catch (err) {
    console.warn("terminateSession route not available yet:", err.message);
    return { ok: false, error: "Feature not available yet" };
  }
};

// ---------- ACTIVITY LOGS ----------

// Get activity logs
export const getActivityLogs = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.type) queryParams.append('type', params.type);
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    
    const url = `/admin/activity-logs${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const res = await http.get(url);
    
    return { ok: true, data: res.data?.data || res.data };
  } catch (err) {
    console.warn("getActivityLogs route not available yet:", err.message);
    return { 
      ok: false, 
      error: "Feature not available yet",
      data: { logs: [], totalCount: 0, page: 1, totalPages: 0 }
    };
  }
};

// ---------- NOTIFICATION TEMPLATES ----------

// Get notification templates
export const getNotificationTemplates = async () => {
  try {
    const res = await http.get("/admin/notification-templates");
    return { ok: true, data: res.data?.data || [] };
  } catch (err) {
    console.warn("getNotificationTemplates route not available yet:", err.message);
    return { 
      ok: false, 
      error: "Feature not available yet",
      data: []
    };
  }
};

// ---------- LEGACY ADMIN MANAGEMENT (Keeping for backward compatibility) ----------
export const approveAdmin = async (data) => {
  try {
    const res = await http.post("/admin/approve-admin", data);
    return { ok: true, data: res.data };
  } catch (err) {
    console.warn("approveAdmin route not available yet:", err.message);
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

// ---------- UTILITY FUNCTIONS ----------

// Helper to get contracts without assigned developers
export const getPendingContracts = async () => {
  try {
    const contracts = await listContracts();
    // Filter contracts that don't have assigned developers
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

// Helper to create system notifications for common actions
export const createSystemNotification = async (type, message, priority = 'medium', actionUrl = null) => {
  const notificationData = {
    title: getNotificationTitle(type),
    message,
    type,
    priority,
    actionUrl,
    actionText: getActionText(type)
  };
  
  return await createNotification(notificationData);
};

// Helper functions for notification creation
const getNotificationTitle = (type) => {
  const titles = {
    assignment: 'Developer Assignment',
    contract: 'New Contract',
    system: 'System Update',
    warning: 'System Warning',
    success: 'Action Completed'
  };
  return titles[type] || 'Notification';
};

const getActionText = (type) => {
  const actionTexts = {
    assignment: 'View Assignment',
    contract: 'View Contract',
    system: 'View Details',
    warning: 'View Issue',
    success: 'View Result'
  };
  return actionTexts[type] || 'View Details';
};

// Real-time notification helpers (for WebSocket/SSE integration)
export const subscribeToNotifications = (onNotification) => {
  // This would implement WebSocket or SSE connection
  // For now, returning a mock unsubscribe function
  console.warn("Real-time notifications not implemented yet");
  return () => console.log("Unsubscribed from notifications");
};

// Export helper for notification sound/visual alerts
export const playNotificationSound = () => {
  try {
    // Create a simple notification sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (error) {
    console.warn("Could not play notification sound:", error);
  }
};
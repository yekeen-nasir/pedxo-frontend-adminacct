import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { Bell, Menu, Settings } from "lucide-react";
import { useNotifications } from "../../../utility/notificationBus";
import { getToken } from "../../../utility/adminAuth.js";
import { useNavigate } from "react-router-dom";

export default function AdminLayout({ title, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { unreadCount, notifications, markAllRead } = useNotifications();
  const [panelOpen, setPanelOpen] = useState(false);
  const navigate = useNavigate();


  
  // CHECK ADMIN AUTH
  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/admin/login"); // redirect only if token is missing
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform lg:translate-x-0`}>
        <AdminSidebar close={() => setSidebarOpen(false)} />
      </div>

      {/* Main */}
      <div className={`${sidebarOpen ? "lg:pl-64" : ""} transition-all`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-md hover:bg-gray-100">
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold text-black">{title}</h1>
            </div>
            <div className="flex items-center gap-2 relative">
              <button
                className="p-2 rounded-md hover:bg-gray-100 relative"
                onClick={() => { setPanelOpen((v) => !v); markAllRead(); }}
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5 text-gray-700" />
                {unreadCount > 0 && <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />}
              </button>
              <button className="p-2 rounded-md hover:bg-gray-100" aria-label="Settings">
                <a href="/admin/settings">
                <Settings  className="h-5 w-5 text-gray-700" /></a>
              </button>
              <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>

              {/* Notification panel */}
              {panelOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="font-semibold text-black">Notifications</p>
                  </div>
                  <div className="max-h-80 overflow-auto divide-y divide-gray-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-sm text-gray-600">No notifications</div>
                    ) : (
                      notifications.map((n) => (
                        <div className="p-4" key={n.id}>
                          <p className="text-sm text-black">{n.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

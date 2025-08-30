import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { Bell, Menu, Settings, X } from "lucide-react";
import { useNotifications } from "../../../utility/notificationBus.jsx";
import { getToken } from "../../../utility/adminAuth.js";
import { useNavigate } from "react-router-dom";

export default function AdminLayout({ title, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { unreadCount, notifications, markAllRead, markAsRead, clearNotification } = useNotifications();
  const [panelOpen, setPanelOpen] = useState(false);
  const navigate = useNavigate();

  // CHECK ADMIN AUTH
  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/admin/login"); // redirect only if token is missing
    }
  }, [navigate]);

  // Close notification panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelOpen && !event.target.closest('.notification-panel') && !event.target.closest('.notification-bell')) {
        setPanelOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [panelOpen]);

  const handleNotificationClick = () => {
    setPanelOpen(!panelOpen);
    if (!panelOpen) {
      // Mark all as read when opening the panel
      markAllRead();
    }
  };

  const formatNotificationTime = (timestamp) => {
    if (!timestamp) return 'Just now';
    
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'assignment':
        return '👤';
      case 'contract':
        return '📋';
      case 'system':
        return '⚙️';
      case 'warning':
        return '⚠️';
      case 'success':
        return '✅';
      default:
        return '📢';
    }
  };

  const getNotificationPriority = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-red-500';
      case 'medium':
        return 'border-l-4 border-yellow-500';
      case 'low':
        return 'border-l-4 border-blue-500';
      default:
        return 'border-l-4 border-gray-300';
    }
  };

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
              {/* Notification Bell */}
              <button
                className="notification-bell p-2 rounded-md hover:bg-gray-100 relative transition-colors"
                onClick={handleNotificationClick}
                aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
              >
                <Bell className="h-5 w-5 text-gray-700" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Settings Button */}
              <button 
                className="p-2 rounded-md hover:bg-gray-100 transition-colors" 
                aria-label="Settings"
                onClick={() => navigate("/admin/settings")}
              >
                <Settings className="h-5 w-5 text-gray-700" />
              </button>

              {/* Admin Avatar */}
              <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>

              {/* Notification Panel */}
              {panelOpen && (
                <div className="notification-panel absolute right-0 top-12 w-96 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
                  {/* Panel Header */}
                  <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-black">Notifications</p>
                        <p className="text-xs text-gray-600">
                          {notifications.length === 0 
                            ? 'No notifications' 
                            : `${notifications.length} total, ${unreadCount} unread`
                          }
                        </p>
                      </div>
                      <button
                        onClick={() => setPanelOpen(false)}
                        className="p-1 rounded-md hover:bg-gray-200 text-gray-500"
                        aria-label="Close notifications"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Panel Content */}
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Bell className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 mb-1">No notifications yet</p>
                        <p className="text-xs text-gray-500">We'll notify you when something important happens</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-4 hover:bg-gray-50 transition-colors ${getNotificationPriority(notification.priority)} ${
                              notification.read ? 'bg-white' : 'bg-blue-50'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-3 flex-1">
                                {/* Notification Icon */}
                                <div className="text-lg">
                                  {getNotificationIcon(notification.type)}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  {/* Notification Title */}
                                  {notification.title && (
                                    <p className="text-sm font-medium text-black mb-1 truncate">
                                      {notification.title}
                                    </p>
                                  )}
                                  
                                  {/* Notification Message */}
                                  <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                                    {notification.message}
                                  </p>
                                  
                                  {/* Notification Time */}
                                  <p className="text-xs text-gray-500">
                                    {formatNotificationTime(notification.timestamp || notification.time)}
                                  </p>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-start gap-1">
                                {!notification.read && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      markAsRead(notification.id);
                                    }}
                                    className="p-1 rounded hover:bg-gray-200 text-gray-400"
                                    aria-label="Mark as read"
                                    title="Mark as read"
                                  >
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  </button>
                                )}
                                
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    clearNotification(notification.id);
                                  }}
                                  className="p-1 rounded hover:bg-gray-200 text-gray-400"
                                  aria-label="Delete notification"
                                  title="Delete notification"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            </div>

                            {/* Action Link */}
                            {notification.actionUrl && (
                              <div className="mt-3 pt-2 border-t border-gray-100">
                                <button
                                  onClick={() => {
                                    navigate(notification.actionUrl);
                                    setPanelOpen(false);
                                  }}
                                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                >
                                  {notification.actionText || 'View Details'}
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Panel Footer */}
                  {notifications.length > 0 && (
                    <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                      <div className="flex justify-between items-center">
                        <button
                          onClick={markAllRead}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                          disabled={unreadCount === 0}
                        >
                          Mark all as read
                        </button>
                        <button
                          onClick={() => {
                            // Clear all notifications
                            notifications.forEach(n => clearNotification(n.id));
                          }}
                          className="text-xs text-red-600 hover:text-red-800 font-medium"
                        >
                          Clear all
                        </button>
                      </div>
                    </div>
                  )}
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
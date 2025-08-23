import { createContext, useContext, useMemo, useState } from "react";

const Ctx = createContext(null);

// Wrap your app in <NotificationsProvider> in main.jsx if you want global,
// but we’ll export a singleton hook for simplicity.
let listeners = [];
let store = {
  unread: 0,
  list: [],
};

function emit() {
  listeners.forEach((l) => l({ unread: store.unread, list: store.list }));
}

export function pushNotification(message) {
  const n = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Math.random()),
    message,
    time: new Date().toLocaleString(),
  };
  store.list = [n, ...store.list].slice(0, 50);
  store.unread += 1;
  emit();
}

export function useNotifications() {
  const [state, setState] = useState({ unread: store.unread, list: store.list });

  useMemo(() => {
    const l = (s) => setState({ unread: s.unread, list: s.list });
    listeners.push(l);
    return () => (listeners = listeners.filter((x) => x !== l));
  }, []);

  const markAllRead = () => {
    store.unread = 0;
    emit();
  };

  return {
    unreadCount: state.unread,
    notifications: state.list,
    markAllRead,
  };
}

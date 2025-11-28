import { useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState({});

  const loginHandler = (userData) => {
    setUser(userData);
  };

  const logoutHandler = () => {
    setUser({});
  };

  // ⬅ THIS replaces contextValue in App.jsx
  const contextValue = {
    user,
    isAuthenticated: !!user.email,
    onLogin: loginHandler,
    onLogout: logoutHandler,
  };

  return contextValue;
}

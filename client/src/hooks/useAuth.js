import { useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState({});

  const loginHandler = (userData) => {
    setUser(userData);
  };

  const logoutHandler = () => {
    setUser({});
  };

  const deleteHandler = async (isAuthenticated, city, cityId, navigate) => {
    if (!isAuthenticated) {
      alert(`You must be logged in to delete ${city.name}.`);
      return navigate('/login');
    }
    const isConfirmed = confirm(`Are you sure you want to delete ${city.name}?`);

    if (!isConfirmed) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3030/jsonstore/cities/${cityId}`, {
        method: "DELETE"
      })

      if (!response.ok) {
        throw new Error('Failed to delete city.');
      }

      navigate(-1)
    } catch (err) {
      alert(err.message)
    }
  };

  // ⬅ THIS replaces contextValue in App.jsx
  const contextValue = {
    user,
    isAuthenticated: !!user.email,
    onLogin: loginHandler,
    onLogout: logoutHandler,
    onDelete: deleteHandler,
  };

  return contextValue;
}

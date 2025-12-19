import React, { createContext, useState, useContext } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || "Login failed");
        return false;
      }

      const data = await res.json();
console.log("Login response:", data); 
setUser({
  id: data.id,
  username: data.username,
  email: data.email,
  role: data.role, 
});
      return true;
    } catch {
      alert("Network error, please try again");
      return false;
    }
  };

  const signup = async (username, email, password) => {
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    return res.ok;
  };

  const logout = async () => {
    if (!user) return;

    // Show confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return; // stop if user cancels

    try {
      await fetch("http://localhost:5000/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      });

      setUser(null); // clear React state
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, login, signup, logout, isAuth: !!user }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);

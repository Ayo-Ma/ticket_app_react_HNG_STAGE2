/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
const SESSION_KEY = "ticketapp_session";
const USERS_KEY = "ticketapp_users"; 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const expired = new Date(parsed.expiresAt) < new Date();
      if (!expired) setUser(parsed.user);
      else localStorage.removeItem(SESSION_KEY);
    }
  }, []);

  
  const login = (email, password) => {
    if (!email || !password) return { error: "All fields required" };

    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!existingUser) return { error: "Invalid email or password" };

    const session = {
      user: { email: existingUser.email, name: "Demo User" },
      token: "mock-token-" + Math.random().toString(36).substring(2),
      expiresAt: new Date(Date.now() + 86400000).toISOString(), // 24h
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session.user);
    navigate("/dashboard");

    return { success: true };
  };

  
  const signup = (email, password) => {
    if (!email || !password) return { error: "All fields required" };

    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) return { error: "User already exists" };

    users.push({ email, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    return { success: true };
  };

  
  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

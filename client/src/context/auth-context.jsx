import React, { createContext, useContext, useState } from "react";
import fetchData from "../services/api";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);

  const login = async (userData) => {
    await fetchData("/auth/signIn", "login", null, userData)
      .then((res) => {
        setJwt(res.token);
        setUser(userData);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const register = async (userData) => {
    await fetchData("/auth/signup", "post", null, userData)
      .then(async (data) => {
        if (data) {
          await setUser(userData);
          await login(userData);
        }
      })
      .catch((error) => {
        throw error;
      });
    setUser(userData);
  };

  const logout = () => {
    // Implement logout logic here and remove the user object
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, jwt, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

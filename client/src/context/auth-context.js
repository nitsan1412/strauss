import React, { createContext, useContext, useState } from "react";
import fetchData from "../services/api";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);

  const login = (userData) => {
    console.log("userData");
    fetchData("/auth/signIn", "login", null, userData)
      .then((res) => {
        console.log("login data:", res);
        setJwt(res.token);
        // setUser(res.user);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
    // Implement login logic here and set the user object if successful
    setUser(userData);
  };

  const register = async (userData) => {
    await fetchData("/auth/signup", "post", null, userData)
      .then(async (data) => {
        console.log("/auth/signup data:", data);
        if (data.error) return data.error;
        await setUser(data.user);
        await login(data.user);
        // setJwt(data.jwt);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        return error;
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

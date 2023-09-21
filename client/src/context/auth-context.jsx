import React, { createContext, useContext, useState } from "react";
import fetchData from "../services/api";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);

  const signIn = async (userData) => {
    await fetchData("/auth/signin", "post", null, userData)
      .then((res) => {
        setJwt(res.token);
        setUser(userData);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const signup = async (userData) => {
    await fetchData("/auth/signup", "post", null, userData)
      .then(async (data) => {
        if (data.success) {
          await setUser(userData);
          await setJwt(data.token);
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <AuthContext.Provider value={{ user, jwt, signIn, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

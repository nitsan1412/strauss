import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/auth-context";
import { CandidatesProvider } from "./context/candidates-context";

import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Layout from "./components/Layout";

import Registration from "./pages/SignUp";
import ProtectedRoute from "./pages/ProtectedRoute";
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<SignIn />} />
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                <CandidatesProvider>
                  <Dashboard />
                </CandidatesProvider>
              }
            />

            {/* <ProtectedRoute path="/" component={<Home />} /> */}
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

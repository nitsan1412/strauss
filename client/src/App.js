import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/styles/App.css";
import { AuthProvider } from "./context/auth-context";
import { CandidatesProvider } from "./context/candidates-context";

import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Candidate from "./pages/Candidate";
import Layout from "./components/Layout";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/candidate"
              element={
                <CandidatesProvider>
                  <Candidate />
                </CandidatesProvider>
              }
            />
            <Route
              path="/dashboard"
              element={
                <CandidatesProvider>
                  <Dashboard />
                </CandidatesProvider>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

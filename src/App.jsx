import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <p className="text-lg font-semibold text-gray-700">Loading...</p>
    </div>
  );
}


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 via-gray-50 to-gray-200 text-gray-900">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

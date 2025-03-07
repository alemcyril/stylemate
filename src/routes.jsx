import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Wardrobe from "./pages/Wardrobe";
import Outfits from "./pages/Outfits";
import Recommendations from "./pages/Recommendations";
import NotFound from "./pages/NotFound";
import NewOutfit from "./pages/NewOutfit";
import UploadItem from "./pages/UploadItem";
import Weather from "./pages/Weather";
import CalendarPage from "./pages/Calendar";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage type="login" />} />
      <Route path="/signup" element={<AuthPage type="signup" />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wardrobe"
        element={
          <ProtectedRoute>
            <Wardrobe />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wardrobe/upload"
        element={
          <ProtectedRoute>
            <UploadItem />
          </ProtectedRoute>
        }
      />
      <Route
        path="/outfits"
        element={
          <ProtectedRoute>
            <Outfits />
          </ProtectedRoute>
        }
      />
      <Route
        path="/outfits/new"
        element={
          <ProtectedRoute>
            <NewOutfit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recommendations"
        element={
          <ProtectedRoute>
            <Recommendations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/weather"
        element={
          <ProtectedRoute>
            <Weather />
          </ProtectedRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <CalendarPage />
          </ProtectedRoute>
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

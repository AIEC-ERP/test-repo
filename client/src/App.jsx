import { useState } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./modules/auth/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";
import MainLayout from "./components/layout/MainLayout";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Optional: You can put a <Spinner /> here
    return <div>Loading...</div>; 
  }

  if (!user) {
    // User is not logged in? Redirect to Login
    return <Navigate to="/login" replace />;
  }

  // User is logged in? Show the page
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* PUBLIC ROUTE: Login */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED ROUTES: Wrapped in MainLayout */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* These are the "children" that go into the <Outlet /> */}
          
          {/* Default Redirect: / -> /dash */}
          <Route index element={<Navigate to="/dash" replace />} />
          
          <Route path="dash" element={<div>Dashboard Page</div>} />
          
          <Route path="inventory" element={<div>Inventory Page</div>} />
          
          <Route path="finance" element={<div>Finance Page</div>} />
          
          <Route path="settings" element={<div>Settings Page</div>} />

        </Route>

        {/* CATCH ALL: 404 Not Found */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </AuthProvider>
  );
}

export default App;


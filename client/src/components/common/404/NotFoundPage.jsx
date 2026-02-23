// src/pages/NotFoundPage.jsx
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css"; // Import the CSS

const NotFoundPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
console.log("user",user)
  if (loading) return <div>Loading...</div>;

  return (
    <div className="notfound-wrapper">
      <div className="notfound-card">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Page Not Found</h2>
        <p className="notfound-message">
          The page you are looking for doesn’t exist. Please check the URL or
          navigate back to a valid page.
        </p>
        <button
          className="notfound-button"
          onClick={() => navigate(user ? "/dashboard" : "/login")}
        >
          {user ? "Go to Dashboard" : "Go to Login"}
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaUser, FaBars } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { FaClock } from "react-icons/fa";
import "./Header.css";
import { useAuth } from "../../../context/AuthContext";

export function Menu(props) {
  return (
    <div>
      <Link to={props.link} className="text-decoration-none">
        <KeyboardBackspaceIcon
          style={{
            fontWeight: "bold",
            cursor: "pointer",
            marginLeft: "5px",
          }}
        />
        <p className="p-2 d-inline">Go back</p>
      </Link>
    </div>
  );
}

const Header = ({ onToggle, onToggleReportingManager }) => {
  const ac_token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const {user,loading} = useAuth();

  // Memoize user data parsing
  const userData = useMemo(() => {
    const data = localStorage.getItem("CurrentUserData");
    return data ? JSON.parse(data) : null;
  }, []);

  const username = user?.username || "Guest User";

  const [iconsVisible, setIconsVisible] = useState(false);
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const dropdownRef = useRef(null);

  // Redirect if no access token
  useEffect(() => {
    if (!ac_token) {
      navigate("/", { replace: true });
    }
  }, [ac_token, navigate]);

  // Toggle icons visibility on mobile
  const handleIconsVisible = () => {
    setIconsVisible((prev) => !prev);
  };

  // Logout handler with proper navigation
  const handleLogout = () => {
    onToggleReportingManager(false);
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("CurrentUserData");
    navigate("/", { replace: true });
  };

  // User menu open/close handlers
  const openUserMenu = () => setUserMenuVisible(true);
  const closeUserMenu = () => setUserMenuVisible(false);

  // Keyboard support for user menu toggle (on the icon)
  const handleUserMenuKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setUserMenuVisible((prev) => !prev);
    }
    if (e.key === "Escape") {
      setUserMenuVisible(false);
    }
  };

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Keyboard toggle support for vertical dots menu button
  const handleVerticalDotsKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleIconsVisible();
    }
  };

  return (
    <header className="header">
      <div className="title-wrapper">
        <div className="toggle">
          <button
            className="sidebar-toggle border-0"
            onClick={onToggle}
            aria-label="Toggle sidebar"
          >
            <FaBars />
          </button>
        </div>

        <div
          className="vertical-dots"
          onClick={handleIconsVisible}
          role="button"
          tabIndex={0}
          aria-label="Toggle menu icons"
          onKeyDown={handleVerticalDotsKeyDown}
        >
          <FaEllipsisVertical />
        </div>
      </div>

      {/* Right side: Welcome message + Icons */}
      <div className="right-section">
        <div className="welcome-message" tabIndex={0} aria-label={`Welcome message: ${username}`}>
          Welcome: {username}
        </div>

        <div className={`icons ${iconsVisible ? "icons-visible" : ""}`}>
          <div className="profile-icon">
            <FaBell
              className="icon"
              tabIndex={0}
              aria-label="Notifications"
              role="button"
            />
          </div>

          <div className="d-block">
            <Link to="/user/userpunch" aria-label="User Punch">
              <FaClock className="icon timer-icon" />
            </Link>
          </div>

          <div
            className="dropdown"
            ref={dropdownRef}
            onMouseEnter={openUserMenu}
            onMouseLeave={closeUserMenu}
            aria-haspopup="true"
            aria-expanded={userMenuVisible}
          >
            <FaUser
              className="icon"
              aria-label="User menu"
              tabIndex={0}
              role="button"
              onKeyDown={handleUserMenuKeyDown}
            />
            <div className={`dropdown-menu${userMenuVisible ? " show" : ""}`} role="menu">
              <div className="dropdown-item" role="menuitem" tabIndex={0}>
                Profile
              </div>
              <div className="dropdown-item" role="menuitem" tabIndex={0}>
                Settings
              </div>
              <Link
                className="text-decoration-none"
                to="/user/change-password-form"
              >
                <div className="dropdown-item" role="menuitem" tabIndex={0}>
                  Change Password
                </div>
              </Link>
              <div
                className="dropdown-item"
                role="menuitem"
                tabIndex={0}
                onClick={handleLogout}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleLogout();
                  }
                }}
              >
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

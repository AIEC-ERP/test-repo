// src/layouts/MainLayout.jsx
import { Outlet, NavLink } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import "./MainLayout.css";

const MainLayout = () => {
  const { user,logout } = useAuth();
  return (
    <>
      <div className="app-container">
      
      {/* HEADER SECTION */}
      <header className="app-header">
        <div className="header-logo">ATLAS ERP</div>
        
        <div className="header-user">
          <span>
            {user?.username} <small style={{ opacity: 0.8 }}></small>
          </span>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      {/* BODY SECTION (Sidebar + Content) */}
      <div className="app-body">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="app-sidebar">
          <nav>
            {/* Common Links */}
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Dashboard
            </NavLink>

            {/* ROLE-BASED LINKS: Only DIRECTOR or MANAGER sees Inventory */}
            {['DIRECTOR', 'MANAGER'].includes(user?.role) && (
              <NavLink 
                to="/inventory" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                Inventory
              </NavLink>
            )}

            {/* ROLE-BASED LINKS: Only DIRECTOR sees Finance */}
            {user?.role === 'DIRECTOR' && (
              <NavLink 
                to="/finance" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                Finance Reports
              </NavLink>
            )}

            <NavLink 
              to="/settings" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Settings
            </NavLink>
          </nav>
        </aside>

        {/* MAIN CONTENT CANVAS */}
        <main className="app-content">
          {/* <Outlet /> is the magic window where your pages appear */}
          <Outlet />
        </main>

      </div>
    </div>
    </>
  );
};

export default MainLayout;

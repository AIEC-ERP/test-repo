import React from "react";
import { useLocation, Link } from "react-router-dom";

const Breadcrumbs = () => {
  // 1. Get the current URL (e.g., "/finance/dashboard")
  const location = useLocation();
  
  // 2. Split the URL into an array and remove empty strings
  // "/finance/dashboard" becomes ["finance", "dashboard"]
  const pathnames = location.pathname.split("/").filter((x) => x);

  // 3. A "Dictionary" to make ugly URLs look pretty in the UI
  const routeNames = {
    "dashboard": "Dashboard",
    "hrdash": "HR Workspace",
    "finance": "Finance",
    "user": "User",
    "userpunch": "Punch Card",
    "employees": "Employee Directory"
  };

  // If we are on the exact root/login page, don't show breadcrumbs
  if (pathnames.length === 0) return null;

  return (
    <nav style={{ padding: "0 0 15px 0", fontSize: "0.875rem", color: "#6b7280" }}>
      {/* Always start with a Home link */}
      <Link to="/dashboard" style={{ color: "#3b82f6", textDecoration: "none" }}>
        Home
      </Link>

      {/* Loop through the URL pieces to generate the trail */}
      {pathnames.map((value, index) => {
        // Build the URL for this specific piece (e.g., "/finance")
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        
        // Check if it's the last item (we don't want the last item to be a clickable link)
        const isLast = index === pathnames.length - 1;
        
        // Look up the pretty name, or capitalize the raw URL if not in dictionary
        const title = routeNames[value] || value.charAt(0).toUpperCase() + value.slice(1);

        return (
          <span key={to}>
            <span style={{ margin: "0 8px" }}>/</span>
            {isLast ? (
              // The current page is just plain text
              <span style={{ color: "#1f2937", fontWeight: "600" }}>{title}</span>
            ) : (
              // Previous pages are clickable links
              <Link to={to} style={{ color: "#3b82f6", textDecoration: "none" }}>
                {title}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
import React from "react";
import "./Sidebar.css"; // We will create this next!

const Sidebar = ({ isOpen }) => {
  return (
    // The magic logic: add the 'collapsed' class if isOpen is false
    <aside className={`sidebar ${isOpen ? "" : "collapsed"}`}>
      
      <div style={{ padding: '20px' }}>
        {/* We will map out icons and text here later */}
        {isOpen ? "Full Sidebar" : "Icon"}
      </div>

    </aside>
  );
};

export default Sidebar;
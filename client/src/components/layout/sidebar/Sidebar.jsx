import React from "react";
import { LuPanelLeftClose } from "react-icons/lu";
import "./Sidebar.css"; // We will create this next!

const Sidebar = ({ toggleSidebar,isOpen }) => {
  return (
    // The magic logic: add the 'collapsed' class if isOpen is false
    <aside className={`sidebar ${isOpen ? "" : "collapsed"}`}>
      {isOpen===true ?
      <>
      <LuPanelLeftClose   className="close-btn"  onClick={toggleSidebar} />
      </>:null
      }
      

      <div style={{ padding: '20px' }}>
        {/* We will map out icons and text here later */}
        {isOpen ? "Full Sidebar" : "Icon"}
      </div>

    </aside>
  );
};

export default Sidebar;
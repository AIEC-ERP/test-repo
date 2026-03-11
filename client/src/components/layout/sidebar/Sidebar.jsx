import React from "react";
import { LuPanelLeftClose } from "react-icons/lu";
import "./Sidebar.css"; // We will create this next!
import Logo from "../../../assets/images/Atlas-Logo-white-bg.png";

const Sidebar = ({ toggleSidebar, isOpen }) => {
  return (
    // The magic logic: add the 'collapsed' class if isOpen is false
    <aside className={`sidebar ${isOpen ? "" : "collapsed"}`}>
      {isOpen === true ? (
        <div>
          <LuPanelLeftClose className="close-btn" onClick={toggleSidebar} />
        </div>
      ) : null}

      <div style={{ padding: "20px" }}>
        {/* {isOpen ? "Full Sidebar" : "Icon"} */}
        <div className="logo">
          <img src={Logo} alt="" />
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;

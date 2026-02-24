import React,{useState} from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import Breadcrumbs from "../common/Breadcrumbs";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    // Example layout structure using Flexbox. Adjust styles to match your design!
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      
      {/* Sidebar stays fixed on the left */}
      <Sidebar isOpen={isSidebarOpen} /> 

      {/* Main content area takes up the rest of the screen */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Header stays at the top */}
        <Header toggleSidebar={toggleSidebar} /> 

        {/* Scrollable content area */}
        <main style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', backgroundColor: '#f3f4f6' }}>
          
          {/* THIS IS THE MAGIC: React Router swaps pages in right here */}
          <Breadcrumbs />
          <Outlet /> 

        </main>
      </div>
    </div>
  );
};

export default MainLayout;
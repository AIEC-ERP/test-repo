import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";

const MainLayout = () => {
  return (
    // Example layout structure using Flexbox. Adjust styles to match your design!
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      
      {/* Sidebar stays fixed on the left */}
      <Sidebar /> 

      {/* Main content area takes up the rest of the screen */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Header stays at the top */}
        <Header /> 

        {/* Scrollable content area */}
        <main style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', backgroundColor: '#f3f4f6' }}>
          
          {/* THIS IS THE MAGIC: React Router swaps pages in right here */}
          <Outlet /> 

        </main>
      </div>
    </div>
  );
};

export default MainLayout;
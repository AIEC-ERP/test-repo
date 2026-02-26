import React from "react";

const Header = ({ toggleSidebar }) => {
  return (
    <header style={{ 
      height: '64px', 
      backgroundColor: 'white', 
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      padding: '0 1.5rem'
    }}>
      {/* This button fires the function in MainLayout */}
      <button 
        onClick={toggleSidebar} 
        style={{ cursor: 'pointer', fontSize: '1.5rem', background: 'none', border: 'none' }}
      >
        ☰
      </button>
      
      <h2 style={{ marginLeft: '1rem', fontSize: '1.25rem', color: '#1f2937' }}>
        Header Content
        வணக்கம் உலகம்!
      </h2>
    </header>
  );
};

export default Header;
import React from "react";

const Header = ({ toggleSidebar, isOpen}) => {
  return (
    <header style={{ 
      height: '64px', 
      backgroundColor: '#f9f7fd', 
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      padding: '0 1.5rem'
    }}>
      {isOpen === false?
      <>
      <button 
        onClick={toggleSidebar} 
        style={{ cursor: 'pointer', fontSize: '1.5rem', background: 'none', border: 'none' }}
      >
        ☰
      </button>
      </>
         :null
      }
      {/* This button fires the function in MainLayout */}
     
      
      <h2 style={{ marginLeft: '1rem', fontSize: '1.25rem', color: '#1f2937' }}>
        Header Content
      </h2>
    </header>
  );
};

export default Header;
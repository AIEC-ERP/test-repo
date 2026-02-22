import { createContext, useContext, useState, useEffect } from "react";
import apiHelper, { setStoredToken } from "../utils/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // // 1. Silent Refresh (Runs once on App Load)
  // useEffect(() => {
  //   const refreshAuth = async () => {
  //     try {
  //       // This calls the backend to check the HttpOnly Cookie
  //       const { data } = await apiHelper.get("/auth/refresh"); 
        
  //       // SYNC: Update the memory variable in axios.js
  //       setStoredToken(data.access_token); 
        
  //       // Update React State
  //       setUser(data.user);
  //     } catch (error) {
  //       console.log("No active session");
  //       setStoredToken(null);
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   refreshAuth();
  // }, []);

  // 2. Login Function (To be used in Login.jsx)
  const login = (accessToken, userData) => {
    setStoredToken(accessToken); // Update Axios
    setUser(userData);           // Update UI
  };

  // 3. Logout Function
  const logout = async () => {
    try {
      await apiHelper.post("/auth/logout");
      setStoredToken(null);
      setUser(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {/* {!loading && children} */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
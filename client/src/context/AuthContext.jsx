import { createContext, useContext, useState, useEffect } from "react";
import apiHelper, { setStoredToken } from "../utils/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // Initialize loading as TRUE so protected routes know we are checking the session
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const refreshAuth = async () => {
      try {
        const { data } = await apiHelper.get("/auth/refresh"); 

        if (data && data.access_token) {
          setStoredToken(data.access_token); 
          setUser(data.user);
        } else {
          throw new Error("Invalid session data");
        }
      } catch (error) {
        console.error("REFRESH FAILED:", error); 
        setStoredToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    refreshAuth();
  }, []);

  // 2. Login Function (To be called in Login.jsx)
  const login = (accessToken, userData) => {
    setStoredToken(accessToken); // Update Axios memory variable
    setUser(userData);           // Update UI Context
  };

  // 3. Logout Function
  const logout = async () => {
    try {
      // Tell the backend to clear the HttpOnly cookie
      await apiHelper.post("/auth/logout");
    } catch (e) {
      console.error("Logout error:", e);
    } finally {
      // Even if the backend fails, strictly wipe the frontend memory for security
      setStoredToken(null);
      setUser(null);
    }
  };

  return (
    // Pass the loading state down so ProtectedRoute can use it
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children} 
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
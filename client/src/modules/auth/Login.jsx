import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { showErrorToast,showSuccessToast } from "../../utils/ToastHelper";
import axios from "axios";
import apiHelper from "../../utils/axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // username validation
    if (!username || username.trim() === "") {
      showErrorToast("Username cannot be empty");
      return; 
    }
    if (username.length < 6) {
      showErrorToast("Username must be at least 6 characters");
      return; 
    }
    if (username.length > 20) {
      showErrorToast("Username cannot exceed 20 characters");
      return;
    }

   //password validation
    if (!password) {
      showErrorToast("Password cannot be empty");
      return;
    }
    if (password.length < 6) {
      showErrorToast("Password must be at least 6 characters");
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await apiHelper.post("/auth/login", {
        username,
        password,
      });

      if (response.data.success) {
        const { access_token, user } = response.data;
        login(access_token, user);
        showSuccessToast("LoggedIn successfully");
        navigate("/dashboard");
      }
    }catch (err) {
      console.error("Login Error:", err);
      const serverResponse = err.response?.data;
      if(serverResponse?.message==="Validation Error"){
        showErrorToast(Object.values(serverResponse.errors)[0])
      }
 
      else if (serverResponse && serverResponse.message) {
        showErrorToast(serverResponse.message);
      } 
      else {
        const fallbackMessage = "Something went wrong connecting to the server.";
        showErrorToast(fallbackMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' }}>
      <div style={{ background: 'white', padding: '2.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#1f2937' }}>ERP System Login</h2>
        
        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4b5563' }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4b5563' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              backgroundColor: isSubmitting ? '#9ca3af' : '#2563eb', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              fontSize: '1rem',
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
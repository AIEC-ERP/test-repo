import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import apiHelper from "../../utils/axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bring in the login function from our context
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // 1. Call your Express backend login API
      const response = await apiHelper.post("/auth/login", {
        username,
        password,
      });

      // 2. Check your backend's specific "success" flag
      if (response.data.success) {
        const { access_token, user } = response.data;

        // 3. Pass the data to your AuthContext 
        // (This saves the user to state and the token to memory/axios)
        login(access_token, user);

        // 4. Redirect to the dashboard
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      // Safely grab the error message from the backend if it exists
      setError(
        err.response?.data?.message || "Something went wrong connecting to the server."
      );
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
import React, { useState, useEffect, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import {showSuccessToast,showErrorToast} from "../../utils/ToastHelper.js";

const defaultTheme = createTheme();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://www.atlas-om.com/"
        sx={{ px: 0.5 }}
      >
        Atlas International
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  const api_url = import.meta.env.VITE_API_URL;



  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
      // Autofocus password if username prefilled for faster login
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
    }
    else{
      if(usernameRef.current){
        usernameRef.current.focus();
      }
    }

  }, []);

  const validateForm = () => {
    if (!username.trim()) {
      showErrorToast("Username is required");
      return false;
    }
      if (password.length === 0) {
      showErrorToast("Password is required");
      return false;
    }
    if (password.length < 6) {
      showErrorToast("Password must be at least 6 characters")
      return false;
    }
    return true;
  };

  const fetchData = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${api_url}/user/getbasicdetails/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem(
        "CurrentUserData",
        JSON.stringify(response.data.data)
      );
    } catch (err) {
      console.error("error fetching user details", err);
      showErrorToast("Internal Server Issue. Please contact the administrator")
    }
  };

 
const handleSubmit = async (event) => {
  event.preventDefault();
  await handlepost();
};

const handlepost = async () => {
  if (!validateForm()) return;
  setLoading(true);

  try {
    const response = await axios.post(`${api_url}/auth/login`, {
      username,
      password,
    });

    const { accessToken, success } = response.data;
    if (!success) {
      showErrorToast(response.data.message);
      return;
    }

   //storing username in localstorage
    if (rememberMe) {
      localStorage.setItem("username", username); 
    } else {
      localStorage.removeItem("username");
    }

    localStorage.setItem("accessToken", accessToken); 
    navigate("/dash");
    
  } catch (err) {
    console.error("Login error:", err);
    showErrorToast("Error during login. Please contact the administrator")
  } finally {
    setLoading(false);
  }
};



  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };


  const handleMouseDownPassword = (event) => {
    event.preventDefault();

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight="bold">
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              inputRef={usernameRef}
              onChange={(e) => setUsername(e.target.value)}
              inputProps={{ maxLength: 30 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              inputRef={passwordRef}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              inputProps={{ maxLength: 100 }}
              helperText="Password must be at least 6 characters"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  inputProps={{ "aria-label": "Remember me" }}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  sx={{ color: "gray", cursor: "not-allowed" }}
                  underline="none"
                  tabIndex={-1}
                  aria-disabled="true"
                >
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

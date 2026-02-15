// src/layouts/MainLayout.jsx
import { Outlet, Link } from "react-router-dom";
import { Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemButton, ListItemText, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const drawerWidth = 240;

const MainLayout = () => {
  const { user, logout } = useAuth();

  return (
    <Box sx={{ display: "flex" }}>
      {/* --- HEADER --- */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Atlas ERP
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user?.username} ({user?.role})
          </Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>

      {/* --- SIDEBAR --- */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar /> {/* Spacer for the AppBar */}
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/dash">
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>

            {/* --- ROLE BASED LINKS --- */}
            {user?.role === "Admin" && (
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/admin/users">
                  <ListItemText primary="User Management" />
                </ListItemButton>
              </ListItem>
            )}

            {(user?.role === "Admin" || user?.role === "Manager") && (
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/inventory">
                  <ListItemText primary="Inventory" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>

      {/* --- CONTENT PAGE (Outlet) --- */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
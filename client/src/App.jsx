import { useState } from "react";

import {Route, Routes} from "react-router-dom";
import "./App.css";
import Login from "./modules/auth/Login";
import Dashboard from "./modules/dashboard/Dashboard";

function App() {
  return (
    <>
     <Login></Login>
     <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dash" element={<Dashboard />} />
     </Routes>
      
    </>
  );
}

export default App;


import React from 'react'
import { Routes,Route,Navigate } from 'react-router-dom';

import Login from '../../modules/auth/Login';
import Dashboard from '../../modules/dashboard/Dashboard';
import ProtectedRoutes from './ProtectedRoutes';
import NotFoundPage from '../common/404/NotFoundPage';
import MainLayout from '../layout/MainLayout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login/>}/>
      {/* Protected Routes */}
     <Route element={<ProtectedRoutes />}>
        
       
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Route>
       <Route element={<ProtectedRoutes allowedRoles={["HR_MANAGER", "DIRECTOR", "SUPER_ADMIN"]} />}>
        <Route element={<MainLayout />}>
          {/* <Route path="/hrdash" element={<HRDashboard />} /> */}
          <Route path="/employees" element={<div>Employee List</div>} />
        </Route>
      </Route>
       <Route element={<ProtectedRoutes allowedRoles={["FINANCE_MANAGER", "ACCOUNTANT", "DIRECTOR", "SUPER_ADMIN"]} />}>
        <Route element={<MainLayout />}>
          {/* <Route path="/finance/dashboard" element={<FinanceDashboard />} /> */}
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    
  )
}

export default AppRoutes
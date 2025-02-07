import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SuperAdminPage from './pages/SuperAdminPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminContentPage from './pages/AdminContentPage';
import AdminGamificationPage from './pages/AdminGamificationPage';
import AdminTutoringPage from './pages/AdminTutoringPage';
import { useSuperAdminRedirect } from './hooks/useSuperAdminRedirect';

function AppRoutes() {
  const loading = useSuperAdminRedirect();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem' }}>
        Cargando...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/superadmin" element={<SuperAdminPage />} />
      <Route path="/adminlogin" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/users" element={<AdminUsersPage />} />
      <Route path="/admin/content" element={<AdminContentPage />} />
      <Route path="/admin/gamification" element={<AdminGamificationPage />} />
      <Route path="/admin/tutoring" element={<AdminTutoringPage />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;

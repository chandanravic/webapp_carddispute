import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import DisputeDetail from './pages/DisputeDetail';
import Layout from './components/Layout';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
      } />
      <Route path="/" element={
        isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="disputes/:id" element={<DisputeDetail />} />
      </Route>
    </Routes>
  );
}

export default App;

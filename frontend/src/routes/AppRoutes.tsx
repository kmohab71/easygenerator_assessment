// import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProtectedPage from '../pages/ProtectedPage';
import { useAuth } from '../components/Auth/AuthContext';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/protected" element={
          isAuthenticated ? <ProtectedPage /> : <Navigate to="/" />
        } />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
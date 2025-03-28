// import React from 'react';
import { AuthProvider } from './components/Auth/AuthContext';
import AppRoutes from './routes/AppRoutes';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
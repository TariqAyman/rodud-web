// src/App.js
import React, { useEffect, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from './pages/NavBar';
import Logout from './pages/Logout';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute'; // Import PublicRoute
import { AuthProvider, useAuth } from './context/AuthContext';
import './assets/css/app.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderRequestForm from './pages/OrderRequestForm';
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Home = lazy(() => import('./pages/Home'));

const App = () => {
  const { user, login } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('Authorization');
    if (token && !user) {
      login({ token });
    }
  }, [user, login]);

  return (
    <Router>
      <NavBar user={user} />
      <Container className="mt-5 pt-4 mainContainerCss">
        <Routes>
          {/* Protected Routes */}
          <Route path="/order-request" element={<ProtectedRoute element={<OrderRequestForm />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/logout" element={<ProtectedRoute element={<Logout />} />} />

          {/* Public Routes */}
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route path="/register" element={<PublicRoute element={<Register />} />} />

          {/* Default Route */}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
      <Footer />
      <ToastContainer />
    </Router>
  );
};

const AppWithProvider = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithProvider;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme, App as AntdApp } from 'antd';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/Login/LoginPage';
import ProductsPage from './pages/Products/ProductsPage';
import OrdersPage from './pages/Orders/OrdersPage';
import ReviewsPage from './pages/Reviews/ReviewsPage';

// Ant Design Light Theme Configuration
const lightTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#D4AF37',
    borderRadius: 10,
    colorBgBase: '#ffffff',
    colorBgContainer: '#ffffff',
    colorTextBase: '#1a1a1a',
    colorBorder: '#e2e8f0',
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      bodyBg: '#f8fafc',
    },
    Menu: {
      darkItemSelectedBg: 'rgba(212, 175, 55, 0.15)',
      darkItemColor: 'rgba(255, 255, 255, 0.65)',
      darkItemSelectedColor: '#D4AF37',
    }
  }
};

function App() {
  return (
    <Router>
      <ConfigProvider theme={lightTheme}>
        <AntdApp style={{ height: '100%' }}>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<ProductsPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="reviews" element={<ReviewsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AuthProvider>
        </AntdApp>
      </ConfigProvider>
    </Router>
  );
}

export default App;

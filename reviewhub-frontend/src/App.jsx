import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './store/slices/authSlice';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute, AdminRoute } from './components/AuthRoutes';
import DashboardLayout from './components/DashboardLayout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardHome from './pages/DashboardHome';
import ReviewsManagement from './pages/ReviewsManagement';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import ProfilePage from './pages/ProfilePage';
import UsersManagement from './pages/UsersManagement';
import { Toaster } from 'react-hot-toast';

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getMe());
    }
  }, [dispatch, token]);

  return (
    <ThemeProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DashboardHome />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/reviews" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ReviewsManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/analytics" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AnalyticsDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/profile" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ProfilePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/users" element={
              <AdminRoute>
                <DashboardLayout>
                  <UsersManagement />
                </DashboardLayout>
              </AdminRoute>
            } />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
    </ThemeProvider>
  );
}

export default App;

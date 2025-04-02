import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Hero } from './components/landing/Hero';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { Dashboard } from './components/dashboard/Dashboard';
import { WizardPage } from './pages/WizardPage';
import { CoursePage } from './pages/CoursePage';
import { PublicCoursesPage } from './pages/PublicCoursesPage';
import { useAuthStore } from './store/authStore';

const baseName = import.meta.env.BASE_URL;

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore(
    (state) => ({ isAuthenticated: state.isAuthenticated, isLoading: state.isLoading })
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export function App() {
  // Initialize auth state on app load
  useEffect(() => {
    useAuthStore.getState().initializeAuth();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <Router basename={baseName}>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/public-courses" element={<PublicCoursesPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/wizard"
            element={
              <PrivateRoute>
                <WizardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/course/:courseId"
            element={<CoursePage />}
          />
        </Routes>
      </MainLayout>
    </Router>
  );
}
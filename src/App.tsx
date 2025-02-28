import React from 'react';
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

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export function App() {
  return (
    <Router>
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
import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage   from './pages/LandingPage'
import LoginPage     from './pages/LoginPage'
import HomePage      from './pages/HomePage'
import EventsPage    from './pages/EventsPage'
import ClubsPage     from './pages/ClubsPage'
import DashboardPage from './pages/DashboardPage'
import AboutPage     from './pages/AboutPage'

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/"       element={<LandingPage />} />
          <Route path="/login"  element={<LoginPage />} />
          <Route path="/about"  element={<AboutPage />} />

          {/* Protected routes */}
          <Route path="/home"      element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/events"    element={<ProtectedRoute><EventsPage /></ProtectedRoute>} />
          <Route path="/clubs"     element={<ProtectedRoute><ClubsPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

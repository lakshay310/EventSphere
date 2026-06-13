import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import JudgeDashboard from './pages/JudgeDashboard'
import ManageEvents from './pages/ManageEvents'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import Criteria from './pages/Criteria'
import Submissions from './pages/Submissions'
import ParticipantSubmissions from './pages/ParticipantSubmissions'
import ViewSubmission from './pages/ViewSubmission'
import ManageJudges from './pages/ManageJudges'
import Overview from './pages/Overview'
import Events from './pages/Events'
import EventDetails from './pages/EventDetails'
import Clubs from './pages/Clubs'
import About from './pages/About'
import './App.css'

function App() {
  useEffect(() => {
    // Enable smooth scrolling globally
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Handle redirects to static pages
    const path = window.location.pathname
    if (path === '/index' && window.location.pathname !== '/index-react.html') {
      window.location.href = '/index.html'
    }
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/about" element={<About />} />
        
        {/* Participant Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/submissions" element={<ParticipantSubmissions />} />
        
        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manage-events" element={<ManageEvents />} />
        <Route path="/manage-judges" element={<ManageJudges />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin-submissions" element={<Submissions />} />
        
        {/* Judge Routes */}
        <Route path="/judge-dashboard" element={<JudgeDashboard />} />
        <Route path="/view-submission" element={<ViewSubmission />} />
        <Route path="/view-submission/:id" element={<ViewSubmission />} />
        <Route path="/criteria" element={<Criteria />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App

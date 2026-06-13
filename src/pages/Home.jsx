import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    if (!loggedInUser || loggedInUser.role !== 'participant') {
      navigate('/login')
      return
    }
    setUser(loggedInUser)

    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [navigate])

  const upcomingEvents = [
    { id: 1, name: 'Web Dev Hackathon', date: '2025-12-15', participants: 124, category: 'Development' },
    { id: 2, name: 'AI/ML Challenge', date: '2025-12-20', participants: 89, category: 'AI/ML' },
    { id: 3, name: 'CyberSec CTF', date: '2025-12-25', participants: 67, category: 'Security' },
  ]

  return (
    <div className="home-container">
      <Sidebar role="participant" />
      <main className="home-content">
        <header className="home-header">
          <div>
            <h1>Welcome to Event Sphere</h1>
            <p className="subtitle">Discover and participate in exciting tech events</p>
          </div>
          <div className="user-profile">
            <span className="welcome-text">Welcome,</span>
            <span className="user-name">{user?.email || 'Participant'}</span>
            <i className="fas fa-user-circle profile-icon"></i>
          </div>
        </header>

        <section className="hero-section">
          <div className="hero-content">
            <h2>Join the Innovation Revolution</h2>
            <p>Participate in hackathons, challenges, and competitions to showcase your skills</p>
            <Link to="/events" className="cta-button">
              <i className="fas fa-calendar"></i> Browse Events
            </Link>
          </div>
        </section>

        <section className="events-section">
          <h2><i className="fas fa-fire"></i> Trending Events</h2>
          <p className="events-message">
            <i className="fas fa-info-circle"></i> To view event details, navigate to the Events page
          </p>
          <div className="events-grid">
            {upcomingEvents.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-header">
                  <span className="event-category">{event.category}</span>
                  <span className="event-status">Upcoming</span>
                </div>
                <h3>{event.name}</h3>
                <div className="event-details">
                  <p><i className="fas fa-calendar-alt"></i> {new Date(event.date).toLocaleDateString()}</p>
                  <p><i className="fas fa-users"></i> {event.participants} registered</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="quick-actions-section">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/events" className="action-card">
              <i className="fas fa-search"></i>
              <h3>Browse Events</h3>
              <p>Explore all available events</p>
            </Link>
            <div onClick={() => navigate('/submissions')} className="action-card clickable">
              <i className="fas fa-upload"></i>
              <h3>My Submissions</h3>
              <p>View your submissions</p>
            </div>
            <Link to="/settings" className="action-card">
              <i className="fas fa-cog"></i>
              <h3>Settings</h3>
              <p>Manage your profile</p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home

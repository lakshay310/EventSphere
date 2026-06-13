import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    totalEvents: 12,
    activeEvents: 8,
    totalParticipants: 245,
    pendingReviews: 34
  })

  useEffect(() => {
    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Check authentication
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    if (!loggedInUser || loggedInUser.role !== 'admin') {
      navigate('/login')
      return
    }
    setUser(loggedInUser)

    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [navigate])

  const recentActivities = [
    { id: 1, action: 'New event created', event: 'AI/ML Challenge 2025', time: '2 hours ago' },
    { id: 2, action: 'Judge assigned', event: 'Web Dev Hackathon', time: '5 hours ago' },
    { id: 3, action: 'Submission received', event: 'CyberSec CTF', time: '1 day ago' },
    { id: 4, action: 'Event completed', event: 'IoT Innovation', time: '2 days ago' },
  ]

  const upcomingEvents = [
    { id: 1, name: 'Blockchain Summit', date: '2025-12-15', participants: 42 },
    { id: 2, name: 'Data Science Challenge', date: '2025-12-20', participants: 67 },
    { id: 3, name: 'Mobile App Contest', date: '2025-12-25', participants: 38 },
  ]

  return (
    <div className="dashboard-container">
      <Sidebar role="admin" />
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <div className="user-profile">
            <span className="welcome-text">Welcome,</span>
            <span className="user-name">{user?.email || 'Admin'}</span>
            <i className="fas fa-user-circle profile-icon"></i>
          </div>
        </header>

        <section className="quick-stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(88, 166, 255, 0.2)' }}>
              <i className="fas fa-calendar-alt" style={{ color: '#58A6FF' }}></i>
            </div>
            <div className="stat-info">
              <h3>{stats.totalEvents}</h3>
              <p>Total Events</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(63, 185, 80, 0.2)' }}>
              <i className="fas fa-play-circle" style={{ color: '#3FB950' }}></i>
            </div>
            <div className="stat-info">
              <h3>{stats.activeEvents}</h3>
              <p>Active Events</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(248, 140, 82, 0.2)' }}>
              <i className="fas fa-users" style={{ color: '#F88C52' }}></i>
            </div>
            <div className="stat-info">
              <h3>{stats.totalParticipants}</h3>
              <p>Total Participants</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(233, 78, 92, 0.2)' }}>
              <i className="fas fa-clock" style={{ color: '#E94E5C' }}></i>
            </div>
            <div className="stat-info">
              <h3>{stats.pendingReviews}</h3>
              <p>Pending Reviews</p>
            </div>
          </div>
        </section>

        <div className="dashboard-grid">
          <section className="dashboard-section">
            <h2>
              <i className="fas fa-calendar-check"></i> Upcoming Events
            </h2>
            <div className="events-list">
              {upcomingEvents.map(event => (
                <div key={event.id} className="event-item">
                  <div className="event-info">
                    <h4>{event.name}</h4>
                    <p className="event-date">
                      <i className="fas fa-calendar"></i> {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="event-stats">
                    <span className="participants-badge">
                      <i className="fas fa-user"></i> {event.participants}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-section">
            <h2>
              <i className="fas fa-history"></i> Recent Activities
            </h2>
            <div className="activities-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-circle"></i>
                  </div>
                  <div className="activity-details">
                    <p className="activity-action">{activity.action}</p>
                    <p className="activity-event">{activity.event}</p>
                    <p className="activity-time">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn create" onClick={() => navigate('/manage-events')}>
              <i className="fas fa-plus-circle"></i> Create Event
            </button>
            <button className="action-btn assign" onClick={() => navigate('/manage-judges')}>
              <i className="fas fa-user-plus"></i> Assign Judge
            </button>
            <button className="action-btn view" onClick={() => navigate('/admin-submissions')}>
              <i className="fas fa-eye"></i> View Submissions
            </button>
            <button className="action-btn analytics" onClick={() => navigate('/analytics')}>
              <i className="fas fa-chart-bar"></i> View Analytics
            </button>
            <button className="action-btn settings" onClick={() => navigate('/settings')}>
              <i className="fas fa-cog"></i> Settings
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminDashboard

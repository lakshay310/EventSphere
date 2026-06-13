import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ManageJudges.css';

const ManageJudges = () => {
  const navigate = useNavigate();
  const [judges, setJudges] = useState([]);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJudge, setSelectedJudge] = useState(null);
  const [assignedEvents, setAssignedEvents] = useState([]);

  const defaultJudges = [
    {
      id: 'J001',
      name: 'Dr. Sarah Mitchell',
      email: 'sarah.mitchell@tech.edu',
      expertise: 'Web Development',
      experience: '8 years',
      assignedEvents: ['Web Dev Hackathon 2024'],
      totalReviews: 45
    },
    {
      id: 'J002',
      name: 'Prof. Alex Chen',
      email: 'alex.chen@ai.institute',
      expertise: 'AI/ML',
      experience: '12 years',
      assignedEvents: ['AI/ML Challenge'],
      totalReviews: 62
    },
    {
      id: 'J003',
      name: 'James Rodriguez',
      email: 'james.r@security.com',
      expertise: 'Cybersecurity',
      experience: '10 years',
      assignedEvents: ['CyberSec CTF'],
      totalReviews: 38
    }
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    const storedJudges = JSON.parse(localStorage.getItem('judges') || '[]');
    setJudges(storedJudges.length > 0 ? storedJudges : defaultJudges);

    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents(storedEvents);

    document.documentElement.style.scrollBehavior = 'smooth';
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAssignEvents = (judge) => {
    setSelectedJudge(judge);
    setAssignedEvents(judge.assignedEvents || []);
    setShowModal(true);
  };

  const handleEventToggle = (eventName) => {
    setAssignedEvents(prev => 
      prev.includes(eventName)
        ? prev.filter(e => e !== eventName)
        : [...prev, eventName]
    );
  };

  const handleSaveAssignments = () => {
    const updatedJudges = judges.map(j =>
      j.id === selectedJudge.id
        ? { ...j, assignedEvents: assignedEvents }
        : j
    );
    setJudges(updatedJudges);
    localStorage.setItem('judges', JSON.stringify(updatedJudges));
    setShowModal(false);
    setSelectedJudge(null);
  };

  const handleRemoveJudge = (id) => {
    if (window.confirm('Are you sure you want to remove this judge?')) {
      const updatedJudges = judges.filter(j => j.id !== id);
      setJudges(updatedJudges);
      localStorage.setItem('judges', JSON.stringify(updatedJudges));
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">
          <i className="fas fa-microchip"></i> EventSphere Admin
        </h2>
        <nav>
          <ul>
            <li><Link to="/overview"><i className="fas fa-columns"></i> Overview</Link></li>
            <li><Link to="/manage-events"><i className="fas fa-calendar-alt"></i> Manage Events</Link></li>
            <li><Link to="/manage-judges" className="active"><i className="fas fa-user-tie"></i> Manage Judges</Link></li>
            <li><Link to="/admin-submissions"><i className="fas fa-file-code"></i> Submissions</Link></li>
            <li><Link to="/analytics"><i className="fas fa-chart-line"></i> Analytics</Link></li>
            <li><Link to="/settings"><i className="fas fa-cogs"></i> Settings</Link></li>
            <li className="logout-link">
              <Link to="/login" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Manage Judges</h1>
          <button className="add-btn" onClick={() => alert('Add Judge functionality')}>
            <i className="fas fa-user-plus"></i> Add New Judge
          </button>
        </header>

        <section className="judges-grid">
          {judges.map(judge => (
            <div key={judge.id} className="judge-card">
              <div className="judge-header">
                <div className="judge-avatar">
                  <i className="fas fa-user-circle"></i>
                </div>
                <div className="judge-info">
                  <h3>{judge.name}</h3>
                  <p className="judge-expertise">{judge.expertise}</p>
                </div>
              </div>

              <div className="judge-details">
                <div className="detail-item">
                  <i className="fas fa-envelope"></i>
                  <span>{judge.email}</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-briefcase"></i>
                  <span>{judge.experience} experience</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-clipboard-check"></i>
                  <span>{judge.totalReviews} reviews completed</span>
                </div>
              </div>

              <div className="assigned-events">
                <h4>Assigned Events:</h4>
                {judge.assignedEvents && judge.assignedEvents.length > 0 ? (
                  <div className="event-tags">
                    {judge.assignedEvents.map((event, idx) => (
                      <span key={idx} className="event-tag">{event}</span>
                    ))}
                  </div>
                ) : (
                  <p className="no-events">No events assigned</p>
                )}
              </div>

              <div className="judge-actions">
                <button 
                  className="btn-assign"
                  onClick={() => handleAssignEvents(judge)}
                >
                  <i className="fas fa-calendar-plus"></i> Assign Events
                </button>
                <button 
                  className="btn-remove"
                  onClick={() => handleRemoveJudge(judge.id)}
                >
                  <i className="fas fa-user-times"></i> Remove
                </button>
              </div>
            </div>
          ))}
        </section>

        {showModal && selectedJudge && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Assign Events to {selectedJudge.name}</h2>
                <button className="close-btn" onClick={() => setShowModal(false)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="modal-body">
                <p className="modal-description">
                  Select the events you want to assign to this judge:
                </p>
                
                <div className="events-checklist">
                  {events.length > 0 ? (
                    events.map(event => (
                      <label key={event.id} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={assignedEvents.includes(event.title)}
                          onChange={() => handleEventToggle(event.title)}
                        />
                        <span>{event.title}</span>
                        <span className="event-date">
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                      </label>
                    ))
                  ) : (
                    <p className="no-events">No events available</p>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn-save" onClick={handleSaveAssignments}>
                  <i className="fas fa-save"></i> Save Assignments
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageJudges;

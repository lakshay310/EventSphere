import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './ParticipantSubmissions.css';

const ParticipantSubmissions = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    projectTitle: '',
    teamName: '',
    description: '',
    githubUrl: '',
    liveUrl: '',
    videoUrl: ''
  });

  const availableEvents = [
    { id: 1, name: 'Web Dev Hackathon', deadline: '2025-12-15' },
    { id: 2, name: 'AI/ML Challenge', deadline: '2025-12-20' },
    { id: 3, name: 'CyberSec CTF', deadline: '2025-12-25' },
    { id: 4, name: 'IoT Innovation', deadline: '2025-12-30' }
  ];

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      navigate('/login');
      return;
    }
    setUser(loggedInUser);

    const userSubmissions = JSON.parse(localStorage.getItem('userSubmissions') || '[]');
    setSubmissions(userSubmissions);

    document.documentElement.style.scrollBehavior = 'smooth';
  }, [navigate]);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSubmission = {
      id: 'SUB-' + Date.now(),
      ...formData,
      eventId: selectedEvent.id,
      eventName: selectedEvent.name,
      submittedAt: new Date().toISOString(),
      status: 'pending',
      userEmail: user.email
    };

    const updatedSubmissions = [...submissions, newSubmission];
    setSubmissions(updatedSubmissions);
    localStorage.setItem('userSubmissions', JSON.stringify(updatedSubmissions));

    alert('Submission successful!');
    setShowSubmitModal(false);
    setFormData({
      projectTitle: '',
      teamName: '',
      description: '',
      githubUrl: '',
      liveUrl: '',
      videoUrl: ''
    });
    setSelectedEvent(null);
  };

  const handleNewSubmission = (event) => {
    setSelectedEvent(event);
    setShowSubmitModal(true);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { class: 'status-pending', text: 'Pending Review' },
      'under-review': { class: 'status-review', text: 'Under Review' },
      approved: { class: 'status-approved', text: 'Approved' },
      rejected: { class: 'status-rejected', text: 'Rejected' }
    };
    return statusMap[status] || statusMap.pending;
  };

  return (
    <div className="participant-submissions-container">
      <Sidebar role="participant" />
      <main className="submissions-content">
        <header className="submissions-header">
          <div>
            <h1>My Submissions</h1>
            <p className="subtitle">Track and manage your event submissions</p>
          </div>
        </header>

        <section className="available-events-section">
          <h2><i className="fas fa-calendar-plus"></i> Submit to Events</h2>
          <div className="events-grid">
            {availableEvents.map(event => (
              <div key={event.id} className="event-card">
                <h3>{event.name}</h3>
                <p><i className="fas fa-clock"></i> Deadline: {new Date(event.deadline).toLocaleDateString()}</p>
                <button 
                  className="submit-btn"
                  onClick={() => handleNewSubmission(event)}
                >
                  <i className="fas fa-upload"></i> Submit Project
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="submissions-list-section">
          <h2><i className="fas fa-list"></i> Your Submissions</h2>
          {submissions.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-inbox"></i>
              <p>No submissions yet. Submit to an event to get started!</p>
            </div>
          ) : (
            <div className="submissions-list">
              {submissions.map(submission => {
                const status = getStatusBadge(submission.status);
                return (
                  <div key={submission.id} className="submission-card">
                    <div className="submission-header">
                      <h3>{submission.projectTitle}</h3>
                      <span className={`status-badge ${status.class}`}>{status.text}</span>
                    </div>
                    <p className="submission-event"><strong>Event:</strong> {submission.eventName}</p>
                    <p className="submission-team"><strong>Team:</strong> {submission.teamName}</p>
                    <p className="submission-date">
                      <i className="fas fa-calendar"></i> Submitted: {new Date(submission.submittedAt).toLocaleDateString()}
                    </p>
                    <div className="submission-links">
                      {submission.githubUrl && (
                        <a href={submission.githubUrl} target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-github"></i> GitHub
                        </a>
                      )}
                      {submission.liveUrl && (
                        <a href={submission.liveUrl} target="_blank" rel="noopener noreferrer">
                          <i className="fas fa-external-link-alt"></i> Live Demo
                        </a>
                      )}
                      {submission.videoUrl && (
                        <a href={submission.videoUrl} target="_blank" rel="noopener noreferrer">
                          <i className="fas fa-video"></i> Video
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Submit Modal */}
        {showSubmitModal && selectedEvent && (
          <div className="modal-overlay" onClick={() => setShowSubmitModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowSubmitModal(false)}>×</button>
              <h2>Submit to {selectedEvent.name}</h2>
              <form className="submission-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Project Title *</label>
                  <input
                    type="text"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleFormChange}
                    required
                    placeholder="Enter your project title"
                  />
                </div>
                <div className="form-group">
                  <label>Team Name *</label>
                  <input
                    type="text"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleFormChange}
                    required
                    placeholder="Enter your team name"
                  />
                </div>
                <div className="form-group">
                  <label>Project Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    required
                    placeholder="Describe your project"
                    rows="4"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>GitHub Repository URL *</label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleFormChange}
                    required
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="form-group">
                  <label>Live Demo URL</label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleFormChange}
                    placeholder="https://..."
                  />
                </div>
                <div className="form-group">
                  <label>Video Demo URL</label>
                  <input
                    type="url"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleFormChange}
                    placeholder="https://youtube.com/..."
                  />
                </div>
                <button type="submit" className="submit-form-btn">
                  <i className="fas fa-paper-plane"></i> Submit Project
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ParticipantSubmissions;

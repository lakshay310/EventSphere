import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ManageEvents.css';

const ManageEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    venue: '',
    category: 'hackathon',
    status: 'upcoming',
    maxParticipants: ''
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    loadEvents();
    document.documentElement.style.scrollBehavior = 'smooth';
  }, [navigate]);

  const loadEvents = () => {
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    if (storedEvents.length === 0) {
      const defaultEvents = [
        {
          id: 'E001',
          title: 'Web Dev Hackathon 2024',
          description: 'Build innovative web applications',
          date: '2024-12-15',
          venue: 'Main Auditorium',
          category: 'hackathon',
          status: 'upcoming',
          maxParticipants: 100,
          registrations: 45
        },
        {
          id: 'E002',
          title: 'AI/ML Challenge',
          description: 'Solve real-world problems with AI',
          date: '2024-12-20',
          venue: 'Tech Lab 3',
          category: 'competition',
          status: 'upcoming',
          maxParticipants: 80,
          registrations: 62
        },
        {
          id: 'E003',
          title: 'CyberSec CTF',
          description: 'Capture the flag cybersecurity competition',
          date: '2024-12-10',
          venue: 'Computer Center',
          category: 'competition',
          status: 'ongoing',
          maxParticipants: 50,
          registrations: 48
        }
      ];
      localStorage.setItem('events', JSON.stringify(defaultEvents));
      setEvents(defaultEvents);
    } else {
      setEvents(storedEvents);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingEvent) {
      const updatedEvents = events.map(evt =>
        evt.id === editingEvent.id ? { ...evt, ...formData } : evt
      );
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
    } else {
      const newEvent = {
        ...formData,
        id: `E${String(events.length + 1).padStart(3, '0')}`,
        registrations: 0
      };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
    }

    resetForm();
    setShowModal(false);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      venue: event.venue,
      category: event.category,
      status: event.status,
      maxParticipants: event.maxParticipants
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const updatedEvents = events.filter(evt => evt.id !== id);
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      venue: '',
      category: 'hackathon',
      status: 'upcoming',
      maxParticipants: ''
    });
    setEditingEvent(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getStatusBadge = (status) => {
    const badges = {
      upcoming: { class: 'badge-upcoming', text: 'Upcoming' },
      ongoing: { class: 'badge-ongoing', text: 'Ongoing' },
      completed: { class: 'badge-completed', text: 'Completed' }
    };
    return badges[status] || badges.upcoming;
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
            <li><Link to="/manage-events" className="active"><i className="fas fa-calendar-alt"></i> Manage Events</Link></li>
            <li><Link to="/manage-judges"><i className="fas fa-user-tie"></i> Manage Judges</Link></li>
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
          <h1>Manage Events</h1>
          <button className="create-btn" onClick={() => setShowModal(true)}>
            <i className="fas fa-plus"></i> Create New Event
          </button>
        </header>

        <section className="events-grid">
          {events.map(event => {
            const badge = getStatusBadge(event.status);
            return (
              <div key={event.id} className="event-card">
                <div className="event-header">
                  <h3>{event.title}</h3>
                  <span className={`status-badge ${badge.class}`}>{badge.text}</span>
                </div>
                <p className="event-description">{event.description}</p>
                <div className="event-details">
                  <div className="detail-item">
                    <i className="fas fa-calendar"></i>
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{event.venue}</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-users"></i>
                    <span>{event.registrations}/{event.maxParticipants} registered</span>
                  </div>
                </div>
                <div className="event-actions">
                  <button className="btn-edit" onClick={() => handleEdit(event)}>
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(event.id)}>
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        {showModal && (
          <div className="modal-overlay" onClick={() => { setShowModal(false); resetForm(); }}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingEvent ? 'Edit Event' : 'Create New Event'}</h2>
                <button className="close-btn" onClick={() => { setShowModal(false); resetForm(); }}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Event Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter event title"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    placeholder="Event description"
                    rows="4"
                  ></textarea>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Venue</label>
                    <input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                      required
                      placeholder="Event venue"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange}>
                      <option value="hackathon">Hackathon</option>
                      <option value="competition">Competition</option>
                      <option value="workshop">Workshop</option>
                      <option value="seminar">Seminar</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select name="status" value={formData.status} onChange={handleInputChange}>
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Max Participants</label>
                  <input
                    type="number"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleInputChange}
                    required
                    min="1"
                    placeholder="Maximum participants"
                  />
                </div>
                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={() => { setShowModal(false); resetForm(); }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    <i className="fas fa-save"></i> {editingEvent ? 'Update Event' : 'Create Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageEvents;

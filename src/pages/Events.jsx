import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Events.css';

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: ''
  });

  const defaultEvents = [
    {
      id: 'E001',
      title: 'Web Dev Hackathon 2025',
      description: 'Build innovative web applications',
      date: '2024-12-15',
      venue: 'Main Auditorium',
      category: 'hackathon',
      image: '/img/person-working-html-computer.jpg'
    },
    {
      id: 'E002',
      title: 'AI/ML Challenge',
      description: 'Solve real-world problems with AI',
      date: '2024-12-20',
      venue: 'Tech Lab',
      category: 'hackathon',
      image: '/img/corporate-businessman-giving-presentation-large-audience.jpg'
    },
    {
      id: 'E003',
      title: 'CyberSec CTF',
      description: 'Test your cybersecurity skills',
      date: '2024-12-25',
      venue: 'Security Lab',
      category: 'hackathon',
      image: '/img/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space.jpg'
    },
    {
      id: 'E004',
      title: 'HACKFORGE',
      description: 'Discover your potential by turning ideas into reality. Code, create, and compete to shape the future.',
      date: '2024-12-28',
      venue: 'Main Auditorium',
      category: 'hackathon',
      image: '/img/person-working-html-computer.jpg'
    },
    {
      id: 'E005',
      title: 'INSPIRE TALKS',
      description: 'Unlock your potential with powerful seminars designed to motivate, educate, and inspire.',
      date: '2024-12-30',
      venue: 'Conference Hall',
      category: 'seminar',
      image: '/img/corporate-businessman-giving-presentation-large-audience.jpg'
    },
    {
      id: 'E006',
      title: 'NIGHTPULSE',
      description: 'Feel the energy come alive with beats, lights, and endless celebration.',
      date: '2025-01-05',
      venue: 'Outdoor Arena',
      category: 'entertainment',
      image: '/img/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space.jpg'
    },
    {
      id: 'E007',
      title: 'JOKE NIGHTS',
      description: 'Discover joy in laughter! Join us for hilarious moments and non-stop entertainment.',
      date: '2025-01-10',
      venue: 'Comedy Club',
      category: 'entertainment',
      image: '/img/35105922_8248639.jpg'
    }
  ];

  useEffect(() => {
    // Always use defaultEvents to show all 7 events
    localStorage.setItem('events', JSON.stringify(defaultEvents));
    setEvents(defaultEvents);
    setFilteredEvents(defaultEvents);

    // Check if user is logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    setIsLoggedIn(!!loggedInUser);

    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(event => event.category === categoryFilter);
    }

    setFilteredEvents(filtered);
  }, [searchTerm, categoryFilter, events]);

  const handleRegister = (event) => {
    if (!isLoggedIn) {
      alert('Please login first to register for events!');
      navigate('/login');
      return;
    }
    setSelectedEvent(event);
    setShowRegistrationModal(true);
  };

  const handleFormChange = (e) => {
    setRegistrationForm({
      ...registrationForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    const registrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
    registrations.push({
      eventId: selectedEvent.id,
      eventName: selectedEvent.title,
      ...registrationForm,
      registeredAt: new Date().toISOString()
    });
    localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
    alert(`Successfully registered for ${selectedEvent.title}!`);
    setShowRegistrationModal(false);
    setRegistrationForm({ name: '', email: '', phone: '', college: '', year: '' });
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="events-page">
      <header className="events-header">
        <nav className="nav-bar">
          <ul className="nav-links">
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/home'); }}>HOME</a></li>
            <li><a href="#" className="active">EVENTS</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/clubs'); }}>CLUBS</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/about'); }}>ABOUT</a></li>
          </ul>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="login-btn logout-btn">
              Logout
            </button>
          ) : (
            <button onClick={() => navigate('/login')} className="login-btn">
              Login
            </button>
          )}
        </nav>
      </header>

      <section className="hero-section">
        <h1>DISCOVER YOUR POTENTIAL</h1>
        <p>
          Discovering your potential begins with believing in your ability to grow beyond limitations.
        </p>
        <button className="scroll-btn" onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}>
          Explore Now!
        </button>
      </section>

      <section className="filter-section">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="category-filter"
        >
          <option value="all">All Categories</option>
          <option value="hackathon">Hackathons</option>
          <option value="seminar">Seminars</option>
          <option value="workshop">Workshops</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </section>

      <section className="cards-section" id="events">
        {filteredEvents.map(event => (
          <div key={event.id} className="card-container">
            <div className="card">
              <img src={event.image} alt={event.title} />
              <div className="card-content">
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <div className="event-meta">
                  <span><i className="fas fa-calendar"></i> {new Date(event.date).toLocaleDateString()}</span>
                  <span><i className="fas fa-map-marker-alt"></i> {event.venue}</span>
                </div>
                <button className="btn" onClick={() => handleRegister(event)}>
                  Join Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Registration Modal */}
      {showRegistrationModal && selectedEvent && (
        <div className="modal-overlay" onClick={() => setShowRegistrationModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowRegistrationModal(false)}>×</button>
            <h2>Register for {selectedEvent.title}</h2>
            <form className="registration-form" onSubmit={handleSubmitRegistration}>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={registrationForm.name}
                  onChange={handleFormChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={registrationForm.email}
                  onChange={handleFormChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={registrationForm.phone}
                  onChange={handleFormChange}
                  required
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="form-group">
                <label>College/University *</label>
                <input
                  type="text"
                  name="college"
                  value={registrationForm.college}
                  onChange={handleFormChange}
                  required
                  placeholder="Enter your college name"
                />
              </div>
              <div className="form-group">
                <label>Year of Study *</label>
                <select
                  name="year"
                  value={registrationForm.year}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Select year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                  <option value="graduate">Graduate</option>
                </select>
              </div>
              <button type="submit" className="submit-btn">
                <i className="fas fa-check-circle"></i> Complete Registration
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;

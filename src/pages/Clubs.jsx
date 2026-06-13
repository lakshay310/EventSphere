import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Clubs.css';

const Clubs = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showEventsModal, setShowEventsModal] = useState(false);
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: ''
  });

  const clubs = [
    {
      id: 1,
      name: 'Technical Club',
      description: 'Empowering students with technical skills through workshops, hackathons, and tech talks.',
      category: 'technical',
      image: '/img/tech-club.jpeg'
    },
    {
      id: 2,
      name: 'Coding Club',
      description: 'Master programming languages and competitive coding through practice and mentorship.',
      category: 'technical',
      image: '/img/PHOTO-2025-10-27-11-26-55.jpg'
    },
    {
      id: 3,
      name: 'Innovation Club',
      description: 'Nurturing innovative thinking and entrepreneurial spirit among students.',
      category: 'technical',
      image: '/img/innovation-club.jpeg'
    },
    {
      id: 4,
      name: 'Cultural Club',
      description: 'Celebrating arts, music, dance, and cultural diversity through vibrant events.',
      category: 'cultural',
      image: '/img/cultural-club.png'
    },
    {
      id: 5,
      name: 'Music & Dance Club',
      description: 'Express yourself through music and dance performances and competitions.',
      category: 'arts',
      image: '/img/music.jpg'
    },
    {
      id: 6,
      name: 'Drama Club',
      description: 'Explore theatrical arts through plays, skits, and drama workshops.',
      category: 'arts',
      image: '/img/tech-club.jpeg'
    },
    {
      id: 7,
      name: 'Sports Club',
      description: 'Promoting fitness and sportsmanship through various sporting events.',
      category: 'sports',
      image: '/img/tech-club.jpeg'
    }
  ];

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    setIsLoggedIn(!!loggedInUser);
    document.documentElement.style.scrollBehavior = 'smooth';
    filterClubs('all');
  }, []);

  const filterClubs = (category) => {
    setCategoryFilter(category);
    if (category === 'all') {
      setFilteredClubs(clubs);
    } else {
      setFilteredClubs(clubs.filter(club => club.category === category));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLearnMore = (club) => {
    setSelectedClub(club);
    setShowLearnMoreModal(true);
  };

  const handleOurEvents = (club) => {
    setSelectedClub(club);
    setShowEventsModal(true);
  };

  const handleJoinClub = (club) => {
    if (!isLoggedIn) {
      alert('Please login first to join a club!');
      navigate('/login');
      return;
    }
    setSelectedClub(club);
    setShowJoinModal(true);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitJoin = (e) => {
    e.preventDefault();
    const memberships = JSON.parse(localStorage.getItem('clubMemberships') || '[]');
    memberships.push({
      clubId: selectedClub.id,
      clubName: selectedClub.name,
      ...formData,
      joinedAt: new Date().toISOString()
    });
    localStorage.setItem('clubMemberships', JSON.stringify(memberships));
    alert(`Successfully joined ${selectedClub.name}!`);
    setShowJoinModal(false);
    setFormData({ name: '', email: '', phone: '', reason: '' });
  };

  const clubEvents = [
    { id: 1, name: 'Tech Talk Series', date: '2025-12-01', type: 'Workshop' },
    { id: 2, name: 'Coding Competition', date: '2025-12-10', type: 'Competition' },
    { id: 3, name: 'Innovation Showcase', date: '2025-12-15', type: 'Exhibition' }
  ];

  return (
    <div className="clubs-page">
      <header className="clubs-header">
        <nav className="nav-bar">
          <ul className="nav-links">
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/home'); }}>HOME</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/events'); }}>EVENTS</a></li>
            <li><a href="#" className="active">CLUBS</a></li>
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
        <h1>Passion Meets Purpose</h1>
        <p>
          A one-stop platform to connect with clubs, explore their initiatives, 
          and experience the vibrant events they organize across our campus.
        </p>
        <button className="scroll-btn" onClick={() => document.getElementById('clubs')?.scrollIntoView({ behavior: 'smooth' })}>
          Explore Now!
        </button>
      </section>

      <section className="clubs-section" id="clubs">
        <h1 className="section-title">OUR CLUBS</h1>
        
        <div className="filter-bar">
          <button 
            className={`filter-btn ${categoryFilter === 'all' ? 'active' : ''}`}
            onClick={() => filterClubs('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${categoryFilter === 'technical' ? 'active' : ''}`}
            onClick={() => filterClubs('technical')}
          >
            Technical
          </button>
          <button 
            className={`filter-btn ${categoryFilter === 'cultural' ? 'active' : ''}`}
            onClick={() => filterClubs('cultural')}
          >
            Cultural
          </button>
          <button 
            className={`filter-btn ${categoryFilter === 'arts' ? 'active' : ''}`}
            onClick={() => filterClubs('arts')}
          >
            Arts
          </button>
          <button 
            className={`filter-btn ${categoryFilter === 'sports' ? 'active' : ''}`}
            onClick={() => filterClubs('sports')}
          >
            Sports
          </button>
        </div>

        <div className="cards-section">
          {filteredClubs.map(club => (
            <div key={club.id} className="card-container">
              <div className="card">
                <img src={club.image} alt={club.name} />
                <div className="card-content">
                  <h2>{club.name}</h2>
                  <p>{club.description}</p>
                  <div className="btn-group">
                    <button className="btn learn-more" onClick={() => handleLearnMore(club)}>Learn More</button>
                    <button className="btn events-btn" onClick={() => handleOurEvents(club)}>Our Events</button>
                  </div>
                  <button className="btn join-club-btn" onClick={() => handleJoinClub(club)}>
                    <i className="fas fa-user-plus"></i> Join Club
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Learn More Modal */}
      {showLearnMoreModal && selectedClub && (
        <div className="modal-overlay" onClick={() => setShowLearnMoreModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowLearnMoreModal(false)}>×</button>
            <h2>{selectedClub.name}</h2>
            <div className="modal-body">
              <p><strong>Category:</strong> {selectedClub.category}</p>
              <p><strong>Description:</strong> {selectedClub.description}</p>
              <div className="club-details">
                <h3>About the Club</h3>
                <p>Our club is dedicated to fostering excellence and providing opportunities for students to grow their skills and network with like-minded individuals.</p>
                <h3>What We Offer</h3>
                <ul>
                  <li>Regular workshops and seminars</li>
                  <li>Networking opportunities</li>
                  <li>Hands-on projects and competitions</li>
                  <li>Mentorship programs</li>
                  <li>Community events and social gatherings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Our Events Modal */}
      {showEventsModal && selectedClub && (
        <div className="modal-overlay" onClick={() => setShowEventsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowEventsModal(false)}>×</button>
            <h2>{selectedClub.name} - Upcoming Events</h2>
            <div className="modal-body">
              <div className="events-list">
                {clubEvents.map(event => (
                  <div key={event.id} className="event-item">
                    <div className="event-info">
                      <h3>{event.name}</h3>
                      <p><i className="fas fa-calendar"></i> {event.date}</p>
                      <span className="event-type">{event.type}</span>
                    </div>
                    <button className="btn register-event-btn" onClick={() => {
                      if (!isLoggedIn) {
                        alert('Please login to register for events!');
                        navigate('/login');
                      } else {
                        const registrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
                        registrations.push({
                          eventId: event.id,
                          eventName: event.name,
                          clubName: selectedClub.name,
                          registeredAt: new Date().toISOString()
                        });
                        localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
                        alert(`Registered for ${event.name}!`);
                        setShowEventsModal(false);
                      }
                    }}>
                      Register
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Join Club Modal */}
      {showJoinModal && selectedClub && (
        <div className="modal-overlay" onClick={() => setShowJoinModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowJoinModal(false)}>×</button>
            <h2>Join {selectedClub.name}</h2>
            <form className="join-form" onSubmit={handleSubmitJoin}>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
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
                  value={formData.email}
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
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="form-group">
                <label>Why do you want to join? *</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleFormChange}
                  required
                  placeholder="Tell us why you're interested in joining this club"
                  rows="4"
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">Join Club</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clubs;

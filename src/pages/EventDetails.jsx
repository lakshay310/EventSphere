import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EventDetails.css';

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const foundEvent = events.find(e => e.id === id);
    
    if (foundEvent) {
      setEvent(foundEvent);
    }

    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (user.email) {
      setIsRegistered(registrations.some(r => r.eventId === id && r.userEmail === user.email));
    }

    document.documentElement.style.scrollBehavior = 'smooth';
  }, [id]);

  const handleRegister = () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    
    if (!user.email) {
      navigate('/login');
      return;
    }

    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    registrations.push({
      eventId: id,
      userEmail: user.email,
      registeredAt: new Date().toISOString()
    });
    localStorage.setItem('registrations', JSON.stringify(registrations));
    setIsRegistered(true);
    alert('Successfully registered for the event!');
  };

  if (!event) {
    return (
      <div className="loading-container">
        <div className="loading">Loading event details...</div>
      </div>
    );
  }

  return (
    <div className="event-details-page">
      <header className="details-header">
        <button className="back-btn" onClick={() => navigate('/events')}>
          <i className="fas fa-arrow-left"></i> Back to Events
        </button>
      </header>

      <section className="event-hero">
        <div className="event-hero-content">
          <h1>{event.title}</h1>
          <p className="event-tagline">{event.description}</p>
        </div>
      </section>

      <section className="event-info-section">
        <div className="info-card">
          <i className="fas fa-calendar-alt"></i>
          <div>
            <h3>Date</h3>
            <p>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        <div className="info-card">
          <i className="fas fa-clock"></i>
          <div>
            <h3>Time</h3>
            <p>10:00 AM - 6:00 PM</p>
          </div>
        </div>

        <div className="info-card">
          <i className="fas fa-map-marker-alt"></i>
          <div>
            <h3>Venue</h3>
            <p>{event.venue}</p>
          </div>
        </div>

        <div className="info-card">
          <i className="fas fa-users"></i>
          <div>
            <h3>Participants</h3>
            <p>{event.registrations || 0}/{event.maxParticipants || 100} Registered</p>
          </div>
        </div>
      </section>

      <section className="event-description">
        <h2>About This Event</h2>
        <p>
          {event.description} Join us for an amazing experience that will help you grow, learn, and connect with like-minded individuals.
          This event is designed to provide you with valuable insights, networking opportunities, and hands-on experience.
        </p>
        <h3>What to Expect:</h3>
        <ul>
          <li>Engaging sessions with industry experts</li>
          <li>Networking opportunities with peers</li>
          <li>Hands-on workshops and activities</li>
          <li>Prizes and recognition for top performers</li>
          <li>Certificate of participation</li>
        </ul>
      </section>

      <section className="registration-section">
        {isRegistered ? (
          <div className="registered-message">
            <i className="fas fa-check-circle"></i>
            <h3>You're Registered!</h3>
            <p>We'll send you event details via email.</p>
          </div>
        ) : (
          <>
            <h2>Ready to Join?</h2>
            <p>Don't miss out on this amazing opportunity!</p>
            <button className="register-btn" onClick={handleRegister}>
              <i className="fas fa-ticket-alt"></i> Register Now
            </button>
          </>
        )}
      </section>
    </div>
  );
};

export default EventDetails;

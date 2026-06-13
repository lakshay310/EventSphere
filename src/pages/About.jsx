import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

const About = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    setIsLoggedIn(!!loggedInUser);
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="about-page">
      <header className="about-header">
        <nav className="nav-bar">
          <ul className="nav-links">
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/home'); }}>HOME</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/events'); }}>EVENTS</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/clubs'); }}>CLUBS</a></li>
            <li><a href="#" className="active">ABOUT</a></li>
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
        <div className="hero-overlay">
          <h1>ABOUT OUR EVENT SPHERE</h1>
        </div>
      </section>

      <section className="content-section">
        <div className="content-box">
          <h2>WHO WE ARE</h2>
          <p>
            We are a dedicated team of innovators passionate about creating a seamless platform to connect 
            students with various events, clubs, and communities. Our mission is to empower individuals to 
            explore their interests, discover new opportunities, and build lasting memories through engaging 
            events and activities.
          </p>
        </div>

        <div className="content-box">
          <h2>OUR MISSION</h2>
          <p>
            Our mission is to create a vibrant ecosystem where students can easily discover, participate in, 
            and organize events that align with their passions. We strive to foster a sense of community, 
            encourage collaboration, and provide a platform that makes event management effortless and 
            accessible for everyone.
          </p>
        </div>

        <div className="content-box">
          <h2>WHAT WE OFFER</h2>
          <ul className="features-list">
            <li>Comprehensive event discovery and registration platform</li>
            <li>Easy-to-use club management system</li>
            <li>Real-time updates on upcoming events and activities</li>
            <li>Seamless communication between organizers and participants</li>
            <li>Analytics and insights for event organizers</li>
            <li>Mobile-friendly interface for on-the-go access</li>
          </ul>
        </div>

        <div className="content-box">
          <h2>JOIN US</h2>
          <p>
            Whether you're looking to attend exciting events, join vibrant clubs, or organize your own 
            activities, Event Sphere is here to make it happen. Join our growing community today and be 
            part of something extraordinary!
          </p>
          <button className="cta-btn" onClick={() => navigate('/signup')}>
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;

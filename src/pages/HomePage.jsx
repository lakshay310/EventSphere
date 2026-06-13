import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import './HomePage.css'

const slides = [
  { bg: '/img/event technology platforms.webp', label: 'Technology Events' },
  { bg: '/img/images (1).jpeg',                 label: 'Cultural Festivals' },
  { bg: '/img/images.jpeg',                     label: 'Campus Activities' },
]

const categories = [
  {
    img: '/img/programming-background-with-person-working-with-codes-computer.jpg',
    title: 'Academic & Skill Building',
    desc: 'Workshops, hackathons, and competitions to sharpen your mind.',
    tag: 'hackathon',
  },
  {
    img: '/img/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space.jpg',
    title: 'Cultural & Creative',
    desc: 'Music, dance, drama, and cultural celebrations.',
    tag: 'cultural',
  },
  {
    img: '/img/front-view-people-holding-copy-space-cardboards.jpg',
    title: 'Social Impact',
    desc: 'Community initiatives and social-change events.',
    tag: 'social',
  },
]

const HomePage = () => {
  const [slide, setSlide] = useState(0)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % slides.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="home-page page-with-nav">
      <Navbar />

      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-left fade-in-up">
          <div className="home-hello">👋 Hello, {user?.name || user?.email?.split('@')[0] || 'Student'}!</div>
          <h1 className="home-hero-title">
            WELCOME TO<br />
            <span className="home-hero-accent">EVENT SPHERE</span>
          </h1>
          <p className="home-hero-text">
            Where every occasion finds its perfect shape — from corporate events
            to hackathons. We handle every detail with care, turning moments into
            celebrations that shine.
          </p>
          <div className="home-hero-btns">
            <button className="btn-primary" onClick={() => navigate('/events')}>
              Explore Events →
            </button>
            <button className="btn-secondary" onClick={() => navigate('/dashboard')}>
              My Dashboard
            </button>
          </div>
        </div>

        {/* Slideshow */}
        <div className="home-slideshow fade-in">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`home-slide ${i === slide ? 'active' : ''}`}
              style={{ backgroundImage: `url('${s.bg}')` }}
            />
          ))}
          <div className="slide-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`slide-dot ${i === slide ? 'active' : ''}`}
                onClick={() => setSlide(i)}
              />
            ))}
          </div>
          <div className="slide-label">{slides[slide].label}</div>
        </div>
      </section>

      {/* What sets us apart */}
      <section className="home-apart">
        <div className="home-apart-inner">
          <img
            src="/img/person-playing-3d-video-games-device.jpg"
            alt="Experience"
            className="apart-img"
          />
          <div className="apart-content fade-in-up">
            <h2 className="apart-title">WHAT SETS US APART</h2>
            <ul className="apart-list">
              <li><span>✨</span> We create experiences that leave a lasting impact.</li>
              <li><span>💡</span> Combining technology, artistry, and expertise.</li>
              <li><span>🎯</span> Every detail handled with precision.</li>
              <li><span>🤝</span> Building engagement, inspiration, and connections.</li>
            </ul>
            <button className="btn-primary" onClick={() => navigate('/clubs')}>
              Browse Clubs
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="home-events-section">
        <h2 className="section-heading">Our Upcoming Events</h2>
        <div className="home-cards-grid">
          {categories.map((c, i) => (
            <div key={i} className="home-card fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="home-card-img-wrap">
                <img src={c.img} alt={c.title} className="home-card-img" />
                <div className="home-card-overlay" />
              </div>
              <div className="home-card-body">
                <h3 className="home-card-title">{c.title}</h3>
                <p className="home-card-desc">{c.desc}</p>
                <button className="btn-primary home-card-btn" onClick={() => navigate('/events')}>
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './LandingPage.css'

const LandingPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (user) navigate('/home', { replace: true })
  }, [user, navigate])

  return (
    <div className="landing-page">
      {/* Animated background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Stars */}
      <div className="stars-layer stars-sm" />
      <div className="stars-layer stars-md" />
      <div className="stars-layer stars-lg" />

      <div className="landing-content">
        <div className="landing-badge fade-in">✦ CAMPUS EVENT PLATFORM ✦</div>
        <h1 className="landing-title fade-in-up">
          EVENT<br /><span className="title-accent">SPHERE</span>
        </h1>
        <p className="landing-subtitle fade-in-up">
          Where every occasion finds its perfect shape — from hackathons to<br />
          cultural fests. Discover, register, and connect with your campus.
        </p>
        <div className="landing-actions fade-in-up">
          <button className="btn-primary landing-cta" onClick={() => navigate('/login')}>
            Get Started →
          </button>
          <button className="btn-secondary landing-learn" onClick={() => navigate('/about')}>
            Learn More
          </button>
        </div>

        {/* Feature pills */}
        <div className="feature-pills fade-in">
          <span className="pill">🎓 Events</span>
          <span className="pill">🏛️ Clubs</span>
          <span className="pill">📊 Analytics</span>
          <span className="pill">🎟️ Registration</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span className="scroll-dot" />
        <span className="scroll-dot" />
        <span className="scroll-dot" />
      </div>
    </div>
  )
}

export default LandingPage

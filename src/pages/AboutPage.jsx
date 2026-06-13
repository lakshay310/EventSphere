import React from 'react'
import Navbar from '../components/Navbar'
import './AboutPage.css'

const AboutPage = () => (
  <div className="about-page page-with-nav">
    <Navbar />

    {/* Hero */}
    <section className="about-hero">
      <div className="about-hero-orb-1" />
      <div className="about-hero-orb-2" />
      <div className="about-hero-content fade-in-up">
        <div className="about-badge">✦ OUR STORY ✦</div>
        <h1 className="about-hero-title">ABOUT <span className="accent-text">EVENT SPHERE</span></h1>
        <p className="about-hero-sub">
          Event Sphere connects students, clubs, and organizers to create vibrant campus experiences.
        </p>
      </div>
    </section>

    {/* Who We Are */}
    <section className="about-section">
      <div className="about-section-inner">
        <div className="about-section-icon">🌐</div>
        <h2 className="about-section-title">WHO WE ARE</h2>
        <p className="about-section-text">
          Event Sphere is a campus hub that brings together students, clubs,
          and organizers in one seamless platform. From cultural fests and
          technical workshops to community initiatives, we make discovering,
          joining, and managing events simple, engaging, and fun.
        </p>
      </div>
    </section>

    {/* Mission */}
    <section className="about-section about-section-alt">
      <div className="about-section-inner">
        <div className="about-section-icon">🎯</div>
        <h2 className="about-section-title">OUR MISSION</h2>
        <p className="about-section-text">
          We aim to create a vibrant community where ideas thrive, opportunities
          are shared, and collaboration drives innovation. Event Sphere empowers
          students to explore, connect, and contribute to their campus culture.
        </p>
      </div>
    </section>

    {/* Stats */}
    <section className="about-stats">
      <div className="about-stats-grid">
        {[
          { num: '12+', label: 'Active Clubs' },
          { num: '50+', label: 'Events Annually' },
          { num: '1000+', label: 'Students Connected' },
          { num: '4', label: 'Club Categories' },
        ].map((s, i) => (
          <div key={i} className="about-stat-card fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="about-stat-num">{s.num}</div>
            <div className="about-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>

    {/* Values */}
    <section className="about-values">
      <h2 className="section-heading">Our Values</h2>
      <div className="about-values-grid">
        {[
          { icon: '✨', title: 'Excellence', desc: 'We create experiences that leave a lasting impact.' },
          { icon: '💡', title: 'Innovation', desc: 'Combining technology, artistry, and expertise.' },
          { icon: '🤝', title: 'Community', desc: 'Building engagement, inspiration, and connections.' },
          { icon: '🎯', title: 'Precision', desc: 'Every detail handled with care and dedication.' },
        ].map((v, i) => (
          <div key={i} className="about-value-card fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="about-value-icon">{v.icon}</div>
            <h3 className="about-value-title">{v.title}</h3>
            <p className="about-value-desc">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
)

export default AboutPage

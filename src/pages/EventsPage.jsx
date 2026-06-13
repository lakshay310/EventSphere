import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import './EventsPage.css'

const ALL_EVENTS = [
  {
    id: 'E001',
    title: 'HACKFORGE',
    category: 'hackathon',
    img: '/img/person-working-html-computer.jpg',
    description: 'Turn your innovative ideas into working prototypes and showcase your coding skills!',
    date: 'Nov 15–16, 2025',
    venue: 'Tech Hall, Chitkara University',
    tag: '💻 Hackathon',
  },
  {
    id: 'E002',
    title: 'INSPIRE TALKS',
    category: 'seminar',
    img: '/img/corporate-businessman-giving-presentation-large-audience.jpg',
    description: 'Get motivated by speakers from top industries and explore new horizons.',
    date: 'Nov 22, 2025',
    venue: 'Main Auditorium, Chitkara University',
    tag: '🎙 Seminar',
  },
  {
    id: 'E003',
    title: 'NIGHTPULSE',
    category: 'entertainment',
    img: '/img/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space.jpg',
    description: 'A vibrant DJ night filled with beats, lights, and high energy!',
    date: 'Dec 5, 2025',
    venue: 'Open Ground, Chitkara University',
    tag: '🎵 Entertainment',
  },
  {
    id: 'E004',
    title: 'JOKE NIGHTS',
    category: 'entertainment',
    img: '/img/35105922_8248639.jpg',
    description: 'Laugh your heart out with stand-up performances from top comedians!',
    date: 'Dec 10, 2025',
    venue: 'Cultural Center, Chitkara University',
    tag: '😂 Comedy',
  },
  {
    id: 'E005',
    title: 'WEB DEV HACKATHON',
    category: 'hackathon',
    img: '/img/programming-background-with-person-working-with-codes-computer.jpg',
    description: 'Build innovative web applications and compete for exciting prizes.',
    date: 'Dec 15, 2025',
    venue: 'CS Department, Chitkara University',
    tag: '💻 Hackathon',
  },
  {
    id: 'E006',
    title: 'AI/ML CHALLENGE',
    category: 'workshop',
    img: '/img/corporate-businessman-giving-presentation-large-audience.jpg',
    description: 'Solve real-world problems with the power of Artificial Intelligence.',
    date: 'Dec 20, 2025',
    venue: 'Tech Lab, Chitkara University',
    tag: '🤖 Workshop',
  },
  {
    id: 'E007',
    title: 'SPORTS DAY',
    category: 'sports',
    img: '/img/front-view-people-holding-copy-space-cardboards.jpg',
    description: 'Inter-college sports tournament — compete, connect, conquer!',
    date: 'Jan 10, 2026',
    venue: 'Sports Complex, Chitkara University',
    tag: '⚽ Sports',
  },
]

const CATEGORIES = ['all', 'hackathon', 'seminar', 'workshop', 'entertainment', 'sports']

const EventsPage = () => {
  const { user } = useAuth()
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState('all')
  const [selected, setSelected] = useState(null)      // popup event
  const [msg, setMsg]           = useState(null)       // { text, type: 'success'|'warn'|'error' }
  const [loading, setLoading]   = useState(false)

  const filtered = ALL_EVENTS.filter(e => {
    const matchCat = category === 'all' || e.category === category
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
                        e.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const openPopup = (event) => {
    setSelected(event)
    setMsg(null)
  }
  const closePopup = () => {
    setSelected(null)
    setMsg(null)
  }

  const handleRegister = async () => {
    if (!user) {
      setMsg({ text: '⚠️ Please login to register!', type: 'warn' })
      return
    }
    setLoading(true)
    setMsg(null)
    try {
      // Check duplicate
      const checkRes = await fetch(
        `http://localhost:3000/registrations?userId=${user.id}&eventId=${selected.id}`
      )
      const existing = await checkRes.json()
      if (existing.length > 0) {
        setMsg({ text: '⚠️ You are already registered for this event!', type: 'warn' })
        setLoading(false)
        return
      }

      const reg = {
        userId:        user.id,
        userEmail:     user.email,
        userName:      user.name || user.email,
        eventId:       selected.id,
        eventName:     selected.title,
        eventCategory: selected.category,
        eventDate:     selected.date,
        eventVenue:    selected.venue,
        registeredAt:  new Date().toISOString(),
      }

      const res = await fetch('http://localhost:3000/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reg),
      })

      if (res.ok) {
        setMsg({ text: '✅ Successfully registered! See you there!', type: 'success' })
      } else {
        setMsg({ text: '❌ Registration failed. Please try again.', type: 'error' })
      }
    } catch {
      setMsg({ text: '❌ Cannot connect to server. Make sure json-server is running.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  // Scroll to events section
  const scrollToEvents = () => {
    document.getElementById('events-grid')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="events-page page-with-nav">
      <Navbar />

      {/* Hero */}
      <section className="events-hero">
        <div className="events-hero-orb" />
        <div className="events-hero-content fade-in-up">
          <div className="events-badge">✦ CAMPUS EVENTS ✦</div>
          <h1 className="events-hero-title">DISCOVER YOUR<br /><span className="accent-text">POTENTIAL</span></h1>
          <p className="events-hero-sub">
            Discovering your potential begins with believing in your ability to grow beyond limitations.
          </p>
          <button className="btn-primary" onClick={scrollToEvents}>Explore Now ↓</button>
        </div>
      </section>

      {/* Filter + Search */}
      <section className="events-filter-bar">
        <div className="events-filter-inner">
          <div className="events-search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="events-search"
              placeholder="Search events..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="events-cat-btns">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`cat-btn ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="events-grid-section" id="events-grid">
        {filtered.length === 0 ? (
          <div className="events-empty">No events match your search.</div>
        ) : (
          <div className="events-grid">
            {filtered.map((ev, i) => (
              <div
                key={ev.id}
                className="event-card fade-in-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="event-card-img-wrap">
                  <img src={ev.img} alt={ev.title} className="event-card-img" />
                  <span className="event-tag">{ev.tag}</span>
                </div>
                <div className="event-card-body">
                  <h2 className="event-card-title">{ev.title}</h2>
                  <p className="event-card-desc">{ev.description}</p>
                  <div className="event-card-meta">
                    <span>📅 {ev.date}</span>
                    <span>📍 {ev.venue.split(',')[0]}</span>
                  </div>
                  <button className="btn-primary event-join-btn" onClick={() => openPopup(ev)}>
                    Join Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Popup Modal */}
      {selected && (
        <div className="modal-overlay" onClick={closePopup}>
          <div className="modal-box events-popup" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closePopup}>×</button>

            <div className="popup-left">
              <img src={selected.img} alt={selected.title} className="popup-img" />
              <span className="event-tag popup-tag">{selected.tag}</span>
            </div>

            <div className="popup-right">
              <h2>{selected.title}</h2>
              <p className="popup-desc">{selected.description}</p>

              <div className="popup-details">
                <div className="popup-detail">
                  <span className="detail-icon">📅</span>
                  <div>
                    <div className="detail-label">Date</div>
                    <div className="detail-val">{selected.date}</div>
                  </div>
                </div>
                <div className="popup-detail">
                  <span className="detail-icon">📍</span>
                  <div>
                    <div className="detail-label">Venue</div>
                    <div className="detail-val">{selected.venue}</div>
                  </div>
                </div>
              </div>

              {msg && (
                <div className={`popup-msg ${msg.type}`}>{msg.text}</div>
              )}

              {!user && (
                <p className="popup-login-hint">💡 Login to register for this event.</p>
              )}

              <button
                className="btn-primary popup-register-btn"
                onClick={handleRegister}
                disabled={loading || msg?.type === 'success'}
              >
                {loading ? <span className="spinner" /> : msg?.type === 'success' ? '✅ Registered' : 'Register Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventsPage

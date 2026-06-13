import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import './ClubsPage.css'

const CLUBS = [
  { id: 1, name: 'Technical Club',        category: 'technical', img: '/img/tech-club.jpeg',                  desc: 'Empowering students with technical skills through workshops, hackathons, and tech talks.' },
  { id: 2, name: 'Coding Club',           category: 'technical', img: '/img/PHOTO-2025-10-27-11-26-55.jpg',  desc: 'Master programming languages and competitive coding through practice and mentorship.' },
  { id: 3, name: 'Innovation Club',       category: 'technical', img: '/img/innovation-club.jpeg',            desc: 'Nurturing innovative thinking and entrepreneurial spirit among students.' },
  { id: 4, name: 'Cultural Club',         category: 'cultural',  img: '/img/cultural-club.png',              desc: 'Celebrating arts, music, dance, and cultural diversity through vibrant events.' },
  { id: 5, name: 'Music & Dance Club',    category: 'cultural',  img: '/img/music.jpg',                      desc: 'Expressing creativity through music, dance, and performing arts.' },
  { id: 6, name: 'Drama & Film Club',     category: 'cultural',  img: '/img/drama.webp',                     desc: 'Bringing stories to life through theatre, filmmaking, and dramatic performances.' },
  { id: 7, name: 'Literary Club',         category: 'arts',      img: '/img/literacy-club.jpeg',             desc: 'Fostering love for literature, creative writing, poetry, and literary discussions.' },
  { id: 8, name: 'Photography Club',      category: 'arts',      img: '/img/photography.webp',               desc: 'Capturing moments and developing photography skills through workshops and photo walks.' },
  { id: 9, name: 'Art & Design Club',     category: 'arts',      img: '/img/PHOTO-2025-10-27-11-29-17.jpg',  desc: 'Exploring creativity through painting, sketching, graphic design, and digital art.' },
  { id: 10, name: 'Sports Club',          category: 'sports',    img: '/img/sports-club.jpg',                desc: 'Promoting fitness, sportsmanship, and athletic excellence through various sports.' },
  { id: 11, name: 'Fitness & Wellness Club', category: 'sports', img: '/img/PHOTO-2025-10-27-11-35-42.jpg', desc: 'Dedicated to health, fitness, yoga, and overall wellness of students.' },
  { id: 12, name: 'Adventure Club',       category: 'sports',    img: '/img/PHOTO-2025-10-27-11-37-59.jpg',  desc: 'Organizing treks, camping, and outdoor adventure activities for thrill-seekers.' },
]

const CLUB_EVENTS = {
  'Technical Club':        [{ id:'tc1', name:'HACKFORGE 2025',        date:'Nov 15, 2025', time:'9:00 AM – 5:00 PM',  venue:'Tech Hall' }],
  'Coding Club':           [{ id:'cc1', name:'CodeSprint Competition', date:'Nov 10, 2025', time:'10:00 AM – 6:00 PM', venue:'Computer Lab' }],
  'Innovation Club':       [{ id:'ic1', name:'Startup Pitch Day',      date:'Nov 12, 2025', time:'1:00 PM – 5:00 PM',  venue:'Incubation Center' }],
  'Cultural Club':         [{ id:'cuc1', name:'NIGHTPULSE Festival',   date:'Nov 8, 2025',  time:'6:00 PM – 11:00 PM', venue:'Open Ground' }],
  'Music & Dance Club':    [{ id:'mc1', name:'Live Band Night',        date:'Nov 9, 2025',  time:'7:00 PM – 10:00 PM', venue:'Auditorium' }],
  'Drama & Film Club':     [{ id:'dc1', name:'Theatre Workshop',       date:'Nov 11, 2025', time:'2:00 PM – 5:00 PM',  venue:'Drama Hall' }],
  'Literary Club':         [{ id:'lc1', name:'INSPIRE TALKS',          date:'Nov 7, 2025',  time:'3:00 PM – 5:00 PM',  venue:'Conference Room' }],
  'Photography Club':      [{ id:'pc1', name:'Photo Walk Campus',      date:'Nov 13, 2025', time:'7:00 AM – 10:00 AM', venue:'Campus' }],
  'Art & Design Club':     [{ id:'adc1', name:'Canvas Painting Session',date:'Nov 6, 2025', time:'11:00 AM – 2:00 PM', venue:'Art Room' }],
  'Sports Club':           [{ id:'sc1', name:'Inter-College Tournament',date:'Nov 5, 2025', time:'8:00 AM – 5:00 PM',  venue:'Sports Complex' }],
  'Fitness & Wellness Club':[{ id:'fw1', name:'Yoga & Meditation',     date:'Nov 4, 2025',  time:'6:00 AM – 8:00 AM',  venue:'Yoga Hall' }],
  'Adventure Club':        [{ id:'ac1', name:'Trekking Expedition',    date:'Nov 26, 2025', time:'5:00 AM – 8:00 PM',  venue:'Off Campus' }],
}

const CATS = ['all', 'technical', 'cultural', 'arts', 'sports']
const CAT_ICONS = { technical:'⚙️', cultural:'🎭', arts:'🎨', sports:'⚽' }

const EMPTY_JOIN = { name:'', phone:'', year:'', department:'', reason:'', experience:'' }

const ClubsPage = () => {
  const { user } = useAuth()
  const [filter, setFilter]         = useState('all')
  const [modal, setModal]           = useState(null)   // 'learn'|'events'|'join'
  const [selectedClub, setSelected] = useState(null)
  const [joinForm, setJoinForm]     = useState(EMPTY_JOIN)
  const [evtMsg, setEvtMsg]         = useState(null)
  const [joinMsg, setJoinMsg]       = useState(null)
  const [loading, setLoading]       = useState(false)

  const filtered = filter === 'all' ? CLUBS : CLUBS.filter(c => c.category === filter)

  const open = (type, club) => {
    setSelected(club)
    setModal(type)
    setEvtMsg(null)
    setJoinMsg(null)
    setJoinForm(EMPTY_JOIN)
  }
  const close = () => { setModal(null); setSelected(null) }

  const requireLogin = () => {
    if (!user) { alert('Please login to use this feature.'); return false }
    return true
  }

  // Register for a club event
  const handleEventRegister = async (ev) => {
    if (!requireLogin()) return
    setLoading(true)
    setEvtMsg(null)
    try {
      const checkRes = await fetch(
        `http://localhost:3000/registrations?userId=${user.id}&eventId=${ev.id}`
      )
      const existing = await checkRes.json()
      if (existing.length > 0) {
        setEvtMsg({ text:'⚠️ Already registered!', type:'warn' })
        return
      }
      const reg = {
        userId: user.id, userEmail: user.email, userName: user.name || user.email,
        eventId: ev.id, eventName: ev.name, eventCategory: selectedClub.category,
        eventDate: ev.date, eventVenue: ev.venue, clubName: selectedClub.name,
        registeredAt: new Date().toISOString()
      }
      const res = await fetch('http://localhost:3000/registrations', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reg)
      })
      setEvtMsg(res.ok
        ? { text:`✅ Registered for ${ev.name}!`, type:'success' }
        : { text:'❌ Registration failed.', type:'error' }
      )
    } catch {
      setEvtMsg({ text:'❌ Server error. Is json-server running?', type:'error' })
    } finally {
      setLoading(false)
    }
  }

  // Submit join club request
  const handleJoinSubmit = async (e) => {
    e.preventDefault()
    if (!requireLogin()) return
    if (!joinForm.name || !joinForm.phone || !joinForm.year || !joinForm.department || !joinForm.reason) {
      setJoinMsg({ text:'⚠️ Fill all required fields.', type:'warn' })
      return
    }
    setLoading(true)
    setJoinMsg(null)
    try {
      const req = {
        requestId: 'req_' + Date.now().toString(36),
        userId: user.id, userEmail: user.email,
        clubName: selectedClub.name, clubId: selectedClub.id,
        ...joinForm,
        requestedAt: new Date().toISOString(), status: 'pending'
      }
      const res = await fetch('http://localhost:3000/clubJoinRequests', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req)
      })
      setJoinMsg(res.ok
        ? { text:`✅ Request submitted! We'll get back to you within 2–3 days.`, type:'success' }
        : { text:'❌ Failed to submit. Please try again.', type:'error' }
      )
    } catch {
      setJoinMsg({ text:'❌ Server error. Is json-server running?', type:'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="clubs-page page-with-nav">
      <Navbar />

      {/* Hero */}
      <section className="clubs-hero">
        <div className="clubs-hero-orb" />
        <div className="clubs-hero-content fade-in-up">
          <div className="clubs-badge">✦ CAMPUS CLUBS ✦</div>
          <h1 className="clubs-hero-title">PASSION MEETS<br /><span className="accent-text">PURPOSE</span></h1>
          <p className="clubs-hero-sub">
            A one-stop platform to connect with clubs, explore their initiatives,
            and experience the vibrant events they organize across our campus.
          </p>
          <button className="btn-primary" onClick={() => document.getElementById('clubs-grid')?.scrollIntoView({ behavior:'smooth' })}>
            Explore Clubs ↓
          </button>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="clubs-grid-section" id="clubs-grid">
        <h2 className="section-heading">OUR CLUBS</h2>

        <div className="clubs-filter-bar">
          {CATS.map(cat => (
            <button
              key={cat}
              className={`cat-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat !== 'all' && <span>{CAT_ICONS[cat]} </span>}
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="clubs-grid">
          {filtered.map((club, i) => (
            <div key={club.id} className="club-card fade-in-up" style={{ animationDelay:`${i * 0.05}s` }}>
              <div className="club-card-img-wrap">
                <img src={club.img} alt={club.name} className="club-card-img" />
                <div className="club-card-overlay" />
                <span className="club-cat-badge">{CAT_ICONS[club.category]} {club.category}</span>
              </div>
              <div className="club-card-body">
                <h3 className="club-card-name">{club.name}</h3>
                <p className="club-card-desc">{club.desc}</p>
                <div className="club-btn-row">
                  <button className="btn-secondary club-btn" onClick={() => open('learn', club)}>Learn More</button>
                  <button className="btn-secondary club-btn" onClick={() => open('events', club)}>Our Events</button>
                </div>
                <button className="btn-primary club-join-btn" onClick={() => open('join', club)}>
                  + Join Club
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== LEARN MORE MODAL ===== */}
      {modal === 'learn' && selectedClub && (
        <div className="modal-overlay" onClick={close}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={close}>×</button>
            <h2>{selectedClub.name}</h2>
            <img src={selectedClub.img} alt={selectedClub.name} className="club-modal-img" />
            <p className="club-modal-desc">{selectedClub.desc}</p>
            <div className="club-modal-offers">
              <h4>What We Offer</h4>
              <ul>
                <li>✅ Regular workshops and seminars</li>
                <li>✅ Networking opportunities</li>
                <li>✅ Hands-on projects and competitions</li>
                <li>✅ Mentorship programs</li>
                <li>✅ Community events and social gatherings</li>
              </ul>
            </div>
            <button className="btn-primary" onClick={() => { setModal('join') }}>Join This Club</button>
          </div>
        </div>
      )}

      {/* ===== OUR EVENTS MODAL ===== */}
      {modal === 'events' && selectedClub && (
        <div className="modal-overlay" onClick={close}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={close}>×</button>
            <h2>{selectedClub.name} — Events</h2>
            {evtMsg && <div className={`popup-msg ${evtMsg.type}`}>{evtMsg.text}</div>}
            <div className="club-events-list">
              {(CLUB_EVENTS[selectedClub.name] || []).map(ev => (
                <div key={ev.id} className="club-event-item">
                  <div className="club-event-info">
                    <div className="club-event-name">{ev.name}</div>
                    <div className="club-event-meta">📅 {ev.date} &nbsp;·&nbsp; ⏰ {ev.time}</div>
                    <div className="club-event-meta">📍 {ev.venue}</div>
                  </div>
                  <button
                    className="btn-primary club-event-reg-btn"
                    onClick={() => handleEventRegister(ev)}
                    disabled={loading}
                  >
                    {loading ? <span className="spinner" /> : 'Register'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== JOIN CLUB MODAL ===== */}
      {modal === 'join' && selectedClub && (
        <div className="modal-overlay" onClick={close}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={close}>×</button>
            <h2>Join {selectedClub.name}</h2>
            {joinMsg && <div className={`popup-msg ${joinMsg.type}`}>{joinMsg.text}</div>}
            {!joinMsg?.type === 'success' && (
              <form className="join-modal-form" onSubmit={handleJoinSubmit} noValidate>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" placeholder="Your full name" value={joinForm.name} onChange={e => setJoinForm({...joinForm, name: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={user?.email || ''} readOnly style={{ opacity: 0.6 }} />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" value={joinForm.phone} onChange={e => setJoinForm({...joinForm, phone: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Year of Study *</label>
                  <select value={joinForm.year} onChange={e => setJoinForm({...joinForm, year: e.target.value})} required>
                    <option value="">-- Select Year --</option>
                    <option>1st Year</option><option>2nd Year</option>
                    <option>3rd Year</option><option>4th Year</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Department *</label>
                  <input type="text" placeholder="e.g. Computer Science" value={joinForm.department} onChange={e => setJoinForm({...joinForm, department: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Why do you want to join? *</label>
                  <textarea rows={4} placeholder="Tell us about your interest..." value={joinForm.reason} onChange={e => setJoinForm({...joinForm, reason: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Relevant Experience (optional)</label>
                  <textarea rows={3} placeholder="Any relevant skills or experience..." value={joinForm.experience} onChange={e => setJoinForm({...joinForm, experience: e.target.value})} />
                </div>
                <button type="submit" className="btn-primary" style={{ width:'100%' }} disabled={loading}>
                  {loading ? <span className="spinner" /> : 'Submit Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ClubsPage

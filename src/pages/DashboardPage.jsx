import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement,
  ArcElement, Title, Tooltip, Legend,
} from 'chart.js'
import { Bar, Pie, Doughnut } from 'react-chartjs-2'
import './DashboardPage.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

const CHART_COLORS = [
  'rgba(255,204,0,0.85)',
  'rgba(99,102,241,0.85)',
  'rgba(34,197,94,0.85)',
  'rgba(239,68,68,0.85)',
  'rgba(59,130,246,0.85)',
  'rgba(236,72,153,0.85)',
  'rgba(249,115,22,0.85)',
]
const CHART_BORDERS = CHART_COLORS.map(c => c.replace('0.85)', '1)'))

const ALL_EVENTS_COUNT = 7
const ALL_CLUBS_COUNT  = 12

const DashboardPage = () => {
  const { user } = useAuth()
  const [myRegs, setMyRegs]   = useState([])
  const [allRegs, setAllRegs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [myRes, allRes] = await Promise.all([
          fetch(`http://localhost:3000/registrations?userId=${user?.id}`),
          fetch(`http://localhost:3000/registrations`),
        ])
        const myData  = await myRes.json()
        const allData = await allRes.json()
        setMyRegs(Array.isArray(myData) ? myData : [])
        setAllRegs(Array.isArray(allData) ? allData : [])
      } catch {
        setError('Cannot connect to server. Make sure json-server is running (npm run dev).')
      } finally {
        setLoading(false)
      }
    }
    if (user) fetchData()
  }, [user])

  // ---- Chart data: My registrations by event name ----
  const myEventNames   = [...new Set(myRegs.map(r => r.eventName))]
  const myEventCounts  = myEventNames.map(name => myRegs.filter(r => r.eventName === name).length)

  const barData = {
    labels: myEventNames.length > 0 ? myEventNames : ['No registrations yet'],
    datasets: [{
      label: 'My Registrations',
      data:  myEventCounts.length > 0 ? myEventCounts : [0],
      backgroundColor: CHART_COLORS,
      borderColor:     CHART_BORDERS,
      borderWidth: 2,
      borderRadius: 6,
    }],
  }

  // ---- Chart data: All registrations by category (pie) ----
  const catMap = {}
  allRegs.forEach(r => {
    const cat = r.eventCategory || 'Other'
    catMap[cat] = (catMap[cat] || 0) + 1
  })
  const catLabels = Object.keys(catMap)
  const catValues = Object.values(catMap)

  const pieData = {
    labels: catLabels.length > 0 ? catLabels : ['No data yet'],
    datasets: [{
      data:            catValues.length > 0 ? catValues : [1],
      backgroundColor: CHART_COLORS,
      borderColor:     CHART_BORDERS,
      borderWidth: 2,
    }],
  }

  // ---- Chart data: Club categories (doughnut — hardcoded proportions) ----
  const doughnutData = {
    labels:   ['Technical', 'Cultural', 'Arts', 'Sports'],
    datasets: [{
      data:            [3, 3, 3, 3],
      backgroundColor: CHART_COLORS,
      borderColor:     CHART_BORDERS,
      borderWidth: 2,
    }],
  }

  const chartOptions = (title) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#b0b0cc', font: { family: 'Montserrat', size: 12 } } },
      title:  { display: true, text: title, color: '#ffcc00', font: { family: 'Montserrat', size: 14, weight: '700' } },
      tooltip: { bodyFont: { family: 'Montserrat' }, titleFont: { family: 'Montserrat' } },
    },
    scales: title.includes('Registration') ? {
      x: { ticks: { color: '#b0b0cc', font: { family: 'Montserrat' } }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { ticks: { color: '#b0b0cc', font: { family: 'Montserrat' }, stepSize: 1 }, grid: { color: 'rgba(255,255,255,0.05)' }, beginAtZero: true },
    } : undefined,
  })

  const stats = [
    { icon: '🎟️', label: 'My Registrations',   val: myRegs.length,          sub: `out of ${ALL_EVENTS_COUNT} events` },
    { icon: '🏛️', label: 'Total Events',        val: ALL_EVENTS_COUNT,       sub: 'on campus' },
    { icon: '🎭', label: 'Total Clubs',          val: ALL_CLUBS_COUNT,        sub: 'to explore' },
    { icon: '📊', label: 'Campus Registrations', val: allRegs.length,         sub: 'by all users' },
  ]

  return (
    <div className="dash-page page-with-nav">
      <Navbar />

      <div className="dash-inner">
        {/* Header */}
        <div className="dash-header fade-in-up">
          <div>
            <h1 className="dash-title">My Dashboard</h1>
            <p className="dash-sub">Welcome back, <span className="dash-name">{user?.name || user?.email}</span></p>
          </div>
          <div className="dash-badge">📊 Analytics</div>
        </div>

        {/* Error */}
        {error && <div className="dash-error">⚠️ {error}</div>}

        {/* Stats row */}
        <div className="dash-stats fade-in-up">
          {stats.map((s, i) => (
            <div key={i} className="dash-stat-card" style={{ animationDelay:`${i * 0.08}s` }}>
              <div className="dash-stat-icon">{s.icon}</div>
              <div className="dash-stat-val">{loading ? '—' : s.val}</div>
              <div className="dash-stat-label">{s.label}</div>
              <div className="dash-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="dash-charts-row">
          <div className="dash-chart-card fade-in-up">
            <div className="chart-wrap">
              {loading
                ? <div className="chart-loading">Loading chart…</div>
                : <Bar data={barData} options={chartOptions('My Event Registrations')} />
              }
            </div>
          </div>

          <div className="dash-chart-card fade-in-up" style={{ animationDelay:'0.1s' }}>
            <div className="chart-wrap">
              {loading
                ? <div className="chart-loading">Loading chart…</div>
                : <Pie data={pieData} options={chartOptions('Campus Registrations by Category')} />
              }
            </div>
          </div>

          <div className="dash-chart-card fade-in-up" style={{ animationDelay:'0.2s' }}>
            <div className="chart-wrap">
              <Doughnut data={doughnutData} options={chartOptions('Clubs by Category')} />
            </div>
          </div>
        </div>

        {/* My Registrations Table */}
        <div className="dash-table-card fade-in-up">
          <h2 className="dash-section-title">My Registered Events</h2>
          {loading ? (
            <div className="chart-loading">Loading…</div>
          ) : myRegs.length === 0 ? (
            <div className="dash-empty">
              <div className="dash-empty-icon">🎟️</div>
              <p>You haven't registered for any events yet.</p>
              <a href="/events" className="btn-primary" style={{ textDecoration:'none', marginTop:'12px', display:'inline-flex', padding:'10px 24px', borderRadius:'50px', background:'var(--accent)', color:'#000', fontWeight:'700', fontSize:'0.88rem' }}>
                Browse Events
              </a>
            </div>
          ) : (
            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Event Name</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Venue</th>
                    <th>Registered At</th>
                  </tr>
                </thead>
                <tbody>
                  {myRegs.map((r, i) => (
                    <tr key={r.id || i}>
                      <td>{i + 1}</td>
                      <td><strong>{r.eventName}</strong></td>
                      <td><span className="cat-chip">{r.eventCategory}</span></td>
                      <td>{r.eventDate || '—'}</td>
                      <td>{r.eventVenue || '—'}</td>
                      <td>{r.registeredAt ? new Date(r.registeredAt).toLocaleDateString() : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

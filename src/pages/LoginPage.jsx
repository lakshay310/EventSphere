import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './LoginPage.css'

const LoginPage = () => {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const { login, user }         = useAuth()
  const navigate                = useNavigate()

  // Already logged in → go home
  React.useEffect(() => {
    if (user) navigate('/home', { replace: true })
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res   = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`)
      const users = await res.json()
      const found = users.find(u => u.email === email && u.password === password)

      if (found) {
        login(found)
        navigate('/home')
      } else {
        setError('Invalid email or password. Please try again.')
      }
    } catch {
      setError('Cannot reach server. Make sure json-server is running (npm run dev).')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="orb login-orb-1" />
      <div className="orb login-orb-2" />

      <div className="login-card fade-in-up">
        {/* Logo */}
        <div className="login-logo">
          <div className="login-logo-icon">⬡</div>
          <div>
            <h1 className="login-brand">EVENT SPHERE</h1>
            <p className="login-tagline">Campus Event Platform</p>
          </div>
        </div>

        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to access events, clubs & more</p>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && <div className="login-error">⚠ {error}</div>}

          <button type="submit" className="btn-primary login-submit" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Sign In →'}
          </button>
        </form>

        {/* Demo hint */}
        <div className="demo-box">
          <p className="demo-label">Demo Credentials</p>
          <div className="demo-creds">
            <span>📧 lakshay@example.com</span>
            <span>🔑 password123</span>
          </div>
        </div>

        <p className="login-footer">
          <Link to="/about" className="login-link">Learn about EventSphere</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage

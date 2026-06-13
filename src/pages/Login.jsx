import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const { email, password, role } = formData

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) || password.length < 5 || !role) {
      setError('Please check your email, password (min 5 chars), and select a role.')
      return
    }

    try {
      // Try API server first
      const response = await fetch(`http://localhost:3000/users?email=${email}`)
      const users = await response.json()

      const verifiedUser = users.find(
        u => u.password === password && u.role === role
      )

      if (verifiedUser) {
        alert('Login successful!')
        localStorage.setItem('loggedInUser', JSON.stringify(verifiedUser))

        if (role === 'participant') {
          navigate('/home')
        } else if (role === 'judge') {
          navigate('/judge-dashboard')
        } else if (role === 'admin') {
          navigate('/admin-dashboard')
        }
      } else {
        setError('Invalid email, password, or you selected the wrong role.')
      }
    } catch (err) {
      console.log('API server not available, using localStorage fallback')
      
      // Fallback to localStorage
      const users = JSON.parse(localStorage.getItem('users')) || []
      
      const verifiedUser = users.find(
        u => u.email === email && u.password === password && u.role === role
      )

      if (verifiedUser) {
        alert('Login successful!')
        localStorage.setItem('loggedInUser', JSON.stringify(verifiedUser))

        if (role === 'participant') {
          navigate('/home')
        } else if (role === 'judge') {
          navigate('/judge-dashboard')
        } else if (role === 'admin') {
          navigate('/admin-dashboard')
        }
      } else {
        setError('Invalid email, password, or you selected the wrong role. Please register first.')
      }
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>EVENT SPHERE</h1>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="role">Select Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select your role</option>
              <option value="participant">Participant</option>
              <option value="judge">Judge</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit">Login</button>
          {error && <p className="error-message">{error}</p>}

          <p className="signup-text">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login

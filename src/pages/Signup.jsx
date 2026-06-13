import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Signup.css'

const Signup = () => {
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
      setError('Please check all fields and select a role.')
      return
    }

    try {
      // Try API server first
      const response = await fetch(`http://localhost:3000/users?email=${email}`)
      const existingUsers = await response.json()

      if (existingUsers.length > 0) {
        setError('User already exists!')
        return
      }

      const registrationRes = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, email, password })
      })

      if (registrationRes.ok) {
        alert('Registration successful! Please login.')
        navigate('/login')
      } else {
        setError('Error during registration.')
      }
    } catch (err) {
      console.log('API server not available, using localStorage fallback')
      
      // Fallback to localStorage
      const users = JSON.parse(localStorage.getItem('users')) || []
      
      const existingUser = users.find(u => u.email === email)
      if (existingUser) {
        setError('User already exists!')
        return
      }

      // Add new user to localStorage
      users.push({ id: Date.now(), role, email, password })
      localStorage.setItem('users', JSON.stringify(users))
      
      alert('Registration successful! Please login.')
      navigate('/login')
    }
  }

  return (
    <div className="signup-page">
      <div className="login-container">
        <h1>EVENT SPHERE</h1>
        <h2>Sign Up</h2>
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
              placeholder="Create password"
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

          <button type="submit">Register</button>
          {error && <p className="error-message">{error}</p>}

          <p className="signup-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup

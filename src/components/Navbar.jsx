import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const Navbar = ({ activePage }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <span className="navbar-logo">⬡ EVENT SPHERE</span>

        <nav className="navbar-links">
          <NavLink to="/home"      className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>HOME</NavLink>
          <NavLink to="/events"    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>EVENTS</NavLink>
          <NavLink to="/clubs"     className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>CLUBS</NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>DASHBOARD</NavLink>
          <NavLink to="/about"     className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>ABOUT</NavLink>
        </nav>

        <div className="navbar-right">
          {user && (
            <span className="navbar-username">👤 {user.name || user.email}</span>
          )}
          {user ? (
            <button className="nav-auth-btn logout" onClick={handleLogout}>Logout</button>
          ) : (
            <button className="nav-auth-btn login" onClick={() => navigate('/login')}>Login</button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar

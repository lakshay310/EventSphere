import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = ({ role }) => {
  const location = useLocation()

  const getMenuItems = () => {
    if (role === 'admin') {
      return [
        { path: '/admin-dashboard', icon: 'fa-th-large', label: 'Dashboard' },
        { path: '/manage-events', icon: 'fa-calendar-alt', label: 'Manage Events' },
        { path: '/manage-judges', icon: 'fa-user-shield', label: 'Manage Judges' },
        { path: '/analytics', icon: 'fa-chart-line', label: 'Analytics' },
        { path: '/overview', icon: 'fa-eye', label: 'Overview' },
        { path: '/settings', icon: 'fa-cog', label: 'Settings' },
      ]
    } else if (role === 'judge') {
      return [
        { path: '/judge-dashboard', icon: 'fa-star-half-alt', label: 'Judging Tasks' },
        { path: '/view-submission', icon: 'fa-check-circle', label: 'Complete Reviews' },
        { path: '/criteria', icon: 'fa-scroll', label: 'Judging Criteria' },
      ]
    } else {
      return [
        { path: '/home', icon: 'fa-home', label: 'Home' },
        { path: '/events', icon: 'fa-calendar', label: 'Events' },
        { path: '/submissions', icon: 'fa-upload', label: 'My Submissions' },
      ]
    }
  }

  const menuItems = getMenuItems()

  return (
    <aside className="sidebar">
      <h2 className="logo">
        <i className={`fas ${role === 'admin' ? 'fa-shield-alt' : role === 'judge' ? 'fa-gavel' : 'fa-bolt'}`}></i>
        {role === 'admin' ? 'Admin Panel' : role === 'judge' ? 'Judge Panel' : 'Event Sphere'}
      </h2>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                <i className={`fas ${item.icon}`}></i>
                {item.label}
              </Link>
            </li>
          ))}
          <li className="logout-link">
            <Link to="/login">
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar

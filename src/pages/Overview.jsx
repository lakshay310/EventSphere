import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Overview.css';

const Overview = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    document.documentElement.style.scrollBehavior = 'smooth';
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">
          <i className="fas fa-microchip"></i> EventSphere Admin
        </h2>
        <nav>
          <ul>
            <li><Link to="/overview" className="active"><i className="fas fa-columns"></i> Overview</Link></li>
            <li><Link to="/manage-events"><i className="fas fa-calendar-alt"></i> Manage Events</Link></li>
            <li><Link to="/manage-judges"><i className="fas fa-user-tie"></i> Manage Judges</Link></li>
            <li><Link to="/admin-submissions"><i className="fas fa-file-code"></i> Submissions</Link></li>
            <li><Link to="/analytics"><i className="fas fa-chart-line"></i> Analytics</Link></li>
            <li><Link to="/settings"><i className="fas fa-cogs"></i> Settings</Link></li>
            <li className="logout-link">
              <Link to="/login" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Admin Overview</h1>
        </header>

        <section className="dashboard-section info-section">
          <h2><i className="fas fa-info-circle"></i> Platform Summary</h2>
          <p>
            Welcome to the EventSphere Admin Dashboard. This panel allows you to manage events,
            participants, and judges efficiently. View analytics and handle submissions all in one place.
          </p>
        </section>

        <section className="quick-stats-grid">
          <div className="stat-card">
            <i className="fas fa-calendar-check"></i>
            <h3>Active Events</h3>
            <p>08</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-users"></i>
            <h3>Total Participants</h3>
            <p>1245</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-medal"></i>
            <h3>Judges</h3>
            <p>15</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-file-alt"></i>
            <h3>Submissions</h3>
            <p>320</p>
          </div>
        </section>

        <section className="dashboard-section recent-activity">
          <h2><i className="fas fa-history"></i> Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <i className="fas fa-plus-circle activity-icon"></i>
              <div>
                <h4>New Event Created</h4>
                <p>Web Dev Hackathon 2024 was created</p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <i className="fas fa-user-check activity-icon"></i>
              <div>
                <h4>Judge Assigned</h4>
                <p>Dr. Sarah Mitchell assigned to AI/ML Challenge</p>
                <span className="activity-time">5 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <i className="fas fa-upload activity-icon"></i>
              <div>
                <h4>New Submission</h4>
                <p>Team AlphaDevs submitted their project</p>
                <span className="activity-time">1 day ago</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Overview;

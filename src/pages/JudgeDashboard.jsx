import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './JudgeDashboard.css';

const JudgeDashboard = () => {
  const navigate = useNavigate();
  const [judgeName, setJudgeName] = useState('Judge Alex Smith');
  const [judgeStatus, setJudgeStatus] = useState({ completed: [], pending: [] });
  const [stats, setStats] = useState({
    totalAssigned: 0,
    completed: 0,
    pending: 0,
    avgScore: '4.1/5'
  });

  const ALL_PROJECTS_LIST = [
    { id: "P001", title: "Innovation & Hackathon Collaboration Platform", team: "Team AlphaDevs", event: "Web Dev Hackathon" },
    { id: "P002", title: "Eco-Friendly Shopping Assistant App", team: "The Sustainers", event: "AI/ML Challenge" },
    { id: "P004", title: "Decentralized Voting System", team: "SecureVote", event: "CyberSec CTF" },
    { id: "P003", title: "IoT Smart Farm Monitoring System", team: "AgriTech Wizards", event: "IoT Challenge" },
    { id: "P005", title: "Real-time Language Translator", team: "LinguaTech", event: "AI/ML Challenge" },
    { id: "P006", title: "Quantum Cryptography Simulator", team: "Team Qubit", event: "Advanced Computing" },
  ];

  useEffect(() => {
    // Check authentication
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (!user || user.role !== 'judge') {
      navigate('/login');
      return;
    }

    setJudgeName(user.name || 'Judge Alex Smith');

    // Load judge status from localStorage
    const loadJudgeStatus = () => {
      try {
        const data = localStorage.getItem('judgeStatus');
        let status;
        
        if (data) {
          status = JSON.parse(data);
          const allProjectIds = ALL_PROJECTS_LIST.map(p => p.id);
          status.completed = status.completed.filter(id => allProjectIds.includes(id));
          
          if (status.completed.length === 0) {
            status.completed = ["P003", "P004", "P005"];
          }
        } else {
          status = { completed: ["P003", "P004", "P005"] };
        }

        const allProjectIds = ALL_PROJECTS_LIST.map(p => p.id);
        status.pending = allProjectIds.filter(id => !status.completed.includes(id));
        
        localStorage.setItem('judgeStatus', JSON.stringify(status));
        return status;
      } catch (e) {
        return { completed: ["P003", "P004", "P005"], pending: ["P001", "P002", "P006"] };
      }
    };

    const status = loadJudgeStatus();
    setJudgeStatus(status);

    // Update stats
    setStats({
      totalAssigned: ALL_PROJECTS_LIST.length,
      completed: status.completed.length,
      pending: status.pending.length,
      avgScore: '4.1/5'
    });

    // Smooth scroll
    document.documentElement.style.scrollBehavior = 'smooth';
  }, [navigate]);

  const handleReview = (projectId) => {
    navigate(`/view-submission/${projectId}`);
  };

  const handleViewAll = () => {
    navigate('/view-submission');
  };

  const handleCriteria = () => {
    navigate('/criteria');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const pendingProjects = ALL_PROJECTS_LIST.filter(p => judgeStatus.pending.includes(p.id));

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">
          <i className="fas fa-gavel"></i> Judge Panel
        </h2>
        <nav>
          <ul>
            <li>
              <Link to="/judge-dashboard" className="active">
                <i className="fas fa-star-half-alt"></i> Judging Tasks
              </Link>
            </li>
            <li>
              <Link to="/view-submission">
                <i className="fas fa-check-circle"></i> Complete Reviews
              </Link>
            </li>
            <li>
              <Link to="/criteria">
                <i className="fas fa-scroll"></i> Judging Criteria
              </Link>
            </li>
            <li className="logout-link">
              <Link to="/login" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>My Judging Tasks</h1>
          <div className="user-profile">
            <span className="welcome-text">Welcome,</span>
            <span className="user-name">{judgeName}</span>
            <i className="fas fa-user-circle profile-icon"></i>
          </div>
        </header>

        <section className="quick-stats-grid">
          <div className="stat-card">
            <i className="fas fa-clipboard-list stat-icon"></i>
            <h3>Total Assigned</h3>
            <p className="stat-value">{stats.totalAssigned}</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-check-circle stat-icon" style={{ color: 'var(--accent-green)' }}></i>
            <h3>Completed</h3>
            <p className="stat-value">{stats.completed}</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-hourglass-half stat-icon" style={{ color: 'var(--accent-orange)' }}></i>
            <h3>Pending</h3>
            <p className="stat-value">{stats.pending}</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-star stat-icon" style={{ color: 'var(--accent-blue)' }}></i>
            <h3>Avg Score</h3>
            <p className="stat-value">{stats.avgScore}</p>
          </div>
        </section>

        <section className="dashboard-section pending-reviews-section">
          <h2>
            <i className="fas fa-code-branch"></i> Submissions for Review
          </h2>
          <div className="project-list">
            {pendingProjects.length === 0 ? (
              <div className="no-projects">
                <i className="fas fa-check-circle"></i>
                <p>All projects reviewed! Great job!</p>
              </div>
            ) : (
              pendingProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <span className="project-badge pending-badge">Pending Review</span>
                  </div>
                  <div className="project-meta">
                    <p>
                      <i className="fas fa-users"></i> <strong>Team:</strong> {project.team}
                    </p>
                    <p>
                      <i className="fas fa-trophy"></i> <strong>Event:</strong> {project.event}
                    </p>
                  </div>
                  <div className="project-actions">
                    <button 
                      className="action-btn review-btn"
                      onClick={() => handleReview(project.id)}
                    >
                      <i className="fas fa-clipboard-check"></i> Start Review
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default JudgeDashboard;

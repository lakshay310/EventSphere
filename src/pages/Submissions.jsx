import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Submissions.css';

const Submissions = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const defaultSubmissions = [
    {
      id: 'S001',
      projectTitle: 'Innovation Platform',
      teamName: 'Team AlphaDevs',
      event: 'Web Dev Hackathon',
      submittedDate: '2024-11-15',
      status: 'pending',
      liveDemo: 'https://demo.platform.dev',
      repository: 'https://github.com/team/project'
    },
    {
      id: 'S002',
      projectTitle: 'Eco Shopping Assistant',
      teamName: 'The Sustainers',
      event: 'AI/ML Challenge',
      submittedDate: '2024-11-14',
      status: 'under-review',
      liveDemo: 'https://eco-app.demo',
      repository: 'https://github.com/sustainers/eco'
    },
    {
      id: 'S003',
      projectTitle: 'Smart Farm Monitor',
      teamName: 'AgriTech Wizards',
      event: 'IoT Challenge',
      submittedDate: '2024-11-10',
      status: 'evaluated',
      score: 42,
      liveDemo: 'https://farm.demo',
      repository: 'https://github.com/agri/farm'
    }
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    const storedSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    setSubmissions(storedSubmissions.length > 0 ? storedSubmissions : defaultSubmissions);
    
    document.documentElement.style.scrollBehavior = 'smooth';
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: 'badge-pending', text: 'Pending', icon: 'fa-clock' },
      'under-review': { class: 'badge-review', text: 'Under Review', icon: 'fa-spinner' },
      evaluated: { class: 'badge-evaluated', text: 'Evaluated', icon: 'fa-check-circle' },
      rejected: { class: 'badge-rejected', text: 'Rejected', icon: 'fa-times-circle' }
    };
    return badges[status] || badges.pending;
  };

  const filteredSubmissions = submissions.filter(sub => {
    const matchesStatus = filterStatus === 'all' || sub.status === filterStatus;
    const matchesSearch = sub.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sub.teamName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleViewDetails = (id) => {
    navigate(`/view-submission?id=${id}`);
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">
          <i className="fas fa-microchip"></i> EventSphere Admin
        </h2>
        <nav>
          <ul>
            <li><Link to="/overview"><i className="fas fa-columns"></i> Overview</Link></li>
            <li><Link to="/manage-events"><i className="fas fa-calendar-alt"></i> Manage Events</Link></li>
            <li><Link to="/manage-judges"><i className="fas fa-user-tie"></i> Manage Judges</Link></li>
            <li><Link to="/admin-submissions" className="active"><i className="fas fa-file-code"></i> Submissions</Link></li>
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
          <h1>Submissions</h1>
          <div className="header-actions">
            <input
              type="text"
              placeholder="Search submissions..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="under-review">Under Review</option>
              <option value="evaluated">Evaluated</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </header>

        <section className="submissions-grid">
          {filteredSubmissions.length === 0 ? (
            <div className="no-submissions">
              <i className="fas fa-inbox"></i>
              <p>No submissions found</p>
            </div>
          ) : (
            filteredSubmissions.map(submission => {
              const badge = getStatusBadge(submission.status);
              return (
                <div key={submission.id} className="submission-card">
                  <div className="submission-header">
                    <h3>{submission.projectTitle}</h3>
                    <span className={`status-badge ${badge.class}`}>
                      <i className={`fas ${badge.icon}`}></i> {badge.text}
                    </span>
                  </div>
                  
                  <div className="submission-details">
                    <div className="detail-row">
                      <i className="fas fa-users"></i>
                      <span><strong>Team:</strong> {submission.teamName}</span>
                    </div>
                    <div className="detail-row">
                      <i className="fas fa-trophy"></i>
                      <span><strong>Event:</strong> {submission.event}</span>
                    </div>
                    <div className="detail-row">
                      <i className="fas fa-calendar"></i>
                      <span><strong>Submitted:</strong> {new Date(submission.submittedDate).toLocaleDateString()}</span>
                    </div>
                    {submission.score && (
                      <div className="detail-row">
                        <i className="fas fa-star"></i>
                        <span><strong>Score:</strong> {submission.score}/50</span>
                      </div>
                    )}
                  </div>

                  <div className="submission-links">
                    <a href={submission.liveDemo} target="_blank" rel="noopener noreferrer" className="link-btn">
                      <i className="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a href={submission.repository} target="_blank" rel="noopener noreferrer" className="link-btn">
                      <i className="fab fa-github"></i> Repository
                    </a>
                  </div>

                  <div className="submission-actions">
                    <button 
                      className="btn-view"
                      onClick={() => handleViewDetails(submission.id)}
                    >
                      <i className="fas fa-eye"></i> View Details
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </section>
      </main>
    </div>
  );
};

export default Submissions;

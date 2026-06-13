import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Criteria.css';

const Criteria = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState('webdev');

  const criteriaData = {
    'webdev': {
      points: 20,
      items: [
        { 
          icon: 'fas fa-code', 
          title: 'Technical Implementation', 
          points: 5, 
          color: 'card-blue', 
          details: ['Code quality and readability.', 'Use of advanced frameworks.', 'Mobile responsiveness.'] 
        },
        { 
          icon: 'fas fa-lightbulb', 
          title: 'Innovation & Creativity', 
          points: 5, 
          color: 'card-purple', 
          details: ['Novelty of the solution.', 'Originality of the concept.'] 
        },
        { 
          icon: 'fas fa-palette', 
          title: 'User Experience & Design', 
          points: 5, 
          color: 'card-orange', 
          details: ['Intuitive navigation.', 'Aesthetic appeal.', 'Accessibility compliance.'] 
        },
        { 
          icon: 'fas fa-chart-line', 
          title: 'Impact & Viability', 
          points: 5, 
          color: 'card-green', 
          details: ['Market size and business potential.', 'Scalability.', 'Clarity of pitch.'] 
        }
      ]
    },
    'aiml': {
      points: 25,
      items: [
        { 
          icon: 'fas fa-brain', 
          title: 'Model Accuracy', 
          points: 10, 
          color: 'card-purple', 
          details: ['Accuracy and performance metrics.', 'Data quality and pre-processing.', 'Model choice justification.'] 
        },
        { 
          icon: 'fas fa-database', 
          title: 'Data Handling', 
          points: 5, 
          color: 'card-blue', 
          details: ['Efficiency of data pipeline.', 'Handling of edge cases.'] 
        },
        { 
          icon: 'fas fa-cogs', 
          title: 'Deployment & Integration', 
          points: 5, 
          color: 'card-green', 
          details: ['Ease of deployment (if applicable).', 'Integration with existing systems.'] 
        },
        { 
          icon: 'fas fa-shield-alt', 
          title: 'Ethics & Bias', 
          points: 5, 
          color: 'card-orange', 
          details: ['Consideration of ethical implications.', 'Bias mitigation efforts.'] 
        }
      ]
    },
    'cybersec': {
      points: 20,
      items: [
        { 
          icon: 'fas fa-lock', 
          title: 'Security Posture', 
          points: 5, 
          color: 'card-green', 
          details: ['Robustness against common exploits.', 'Use of secure coding practices.'] 
        },
        { 
          icon: 'fas fa-tools', 
          title: 'Tool Efficiency', 
          points: 5, 
          color: 'card-blue', 
          details: ['Efficiency and speed of the tool/script.', 'Automation level.'] 
        },
        { 
          icon: 'fas fa-user-secret', 
          title: 'Complexity of Challenge', 
          points: 5, 
          color: 'card-purple', 
          details: ['Difficulty of the security challenge solved.', 'Elegance of the solution.'] 
        },
        { 
          icon: 'fas fa-file-invoice', 
          title: 'Documentation & Report', 
          points: 5, 
          color: 'card-orange', 
          details: ['Clarity of the vulnerability report.', 'Actionable recommendations provided.'] 
        }
      ]
    }
  };

  useEffect(() => {
    // Check authentication
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (!user || user.role !== 'judge') {
      navigate('/login');
      return;
    }

    document.documentElement.style.scrollBehavior = 'smooth';
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const currentCriteria = criteriaData[selectedEvent];

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">
          <i className="fas fa-gavel"></i> Judge Panel
        </h2>
        <nav>
          <ul>
            <li>
              <Link to="/judge-dashboard">
                <i className="fas fa-star-half-alt"></i> Judging Tasks
              </Link>
            </li>
            <li>
              <Link to="/view-submission">
                <i className="fas fa-check-circle"></i> Complete Reviews
              </Link>
            </li>
            <li>
              <Link to="/criteria" className="active">
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
          <h1>Event Judging Criteria</h1>
          <div className="user-profile">
            <span className="welcome-text">Select Event:</span>
            <select 
              className="event-selector" 
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              <option value="webdev">Web Dev Hackathon 2024</option>
              <option value="aiml">AI/ML Challenge</option>
              <option value="cybersec">CyberSec CTF</option>
            </select>
            <i className="fas fa-scroll profile-icon"></i>
          </div>
        </header>

        <section className="dashboard-section">
          <h2>
            <i className="fas fa-balance-scale"></i> Core Evaluation Pillars (
            <span>{currentCriteria.points}</span> Points)
          </h2>

          <div className="criteria-container">
            {currentCriteria.items.map((criterion, index) => (
              <div key={index} className={`criteria-card ${criterion.color}`}>
                <h3>
                  <i className={criterion.icon}></i> {criterion.title}
                </h3>
                <p>
                  <strong>Points:</strong> {criterion.points}/
                  {currentCriteria.points}
                </p>
                <ul className="criteria-detail-list">
                  {criterion.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="score-note">
            <strong>Scoring Guide:</strong> The default scale is 1 to 5 points per
            criterion (5 = Excellent, 1 = Poor). Please use the{' '}
            <strong>Overall Recommendation Score</strong> (1-10) for your final
            subjective ranking.
          </div>
        </section>
      </main>
    </div>
  );
};

export default Criteria;

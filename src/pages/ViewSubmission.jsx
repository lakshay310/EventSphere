import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import './ViewSubmission.css';

const ViewSubmission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: routeId } = useParams();
  const [project, setProject] = useState(null);
  const [scores, setScores] = useState({});
  const [overallScore, setOverallScore] = useState(7);
  const [feedback, setFeedback] = useState('');

  const ALL_PROJECTS = {
    "P001": { id: "P001", title: "Innovation & Collaboration Platform", team: "Team AlphaDevs", event: "Web Dev Hackathon", eventKey: "webdev", demo: "https://live.platform.dev/p001", repo: "https://github.com/alphadevs-repo" },
    "P002": { id: "P002", title: "Eco-Friendly Shopping Assistant App", team: "The Sustainers", event: "AI/ML Challenge", eventKey: "aiml", demo: "https://eco-assist.app/p002", repo: "https://github.com/sustainers-eco" },
    "P003": { id: "P003", title: "IoT Smart Farm Monitoring System", team: "AgriTech Wizards", event: "IoT Challenge", eventKey: "webdev", demo: "https://iotfarm.app/p003", repo: "https://github.com/iot-wizards" },
    "P004": { id: "P004", title: "Decentralized Voting System", team: "SecureVote", event: "CyberSec CTF", eventKey: "cybersec", demo: "https://securevote.ctf/p004", repo: "https://github.com/secure-vote-repo" },
    "P005": { id: "P005", title: "Real-time Language Translator", team: "LinguaTech", event: "AI/ML Challenge", eventKey: "aiml", demo: "https://lingua.live/p005", repo: "https://github.com/lingu-tech" },
    "P006": { id: "P006", title: "Quantum Cryptography Simulator", team: "Team Qubit", event: "Advanced Computing", eventKey: "cybersec", demo: "https://quantum.sim/p006", repo: "https://github.com/qubit-repo" },
  };

  const criteriaByEvent = {
    'webdev': [
      { key: 'tech', label: 'Technical Implementation', max: 5 },
      { key: 'innovation', label: 'Innovation & Creativity', max: 5 },
      { key: 'ux', label: 'User Experience & Design', max: 5 },
      { key: 'impact', label: 'Impact & Viability', max: 5 }
    ],
    'aiml': [
      { key: 'accuracy', label: 'Model Accuracy', max: 10 },
      { key: 'data', label: 'Data Handling', max: 5 },
      { key: 'deployment', label: 'Deployment & Integration', max: 5 },
      { key: 'ethics', label: 'Ethics & Bias', max: 5 }
    ],
    'cybersec': [
      { key: 'security', label: 'Security Posture', max: 5 },
      { key: 'efficiency', label: 'Tool Efficiency', max: 5 },
      { key: 'complexity', label: 'Complexity of Challenge', max: 5 },
      { key: 'documentation', label: 'Documentation & Report', max: 5 }
    ]
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (!user || user.role !== 'judge') {
      navigate('/login');
      return;
    }

    // Get project ID from route params or query params
    const params = new URLSearchParams(location.search);
    const projectId = routeId || params.get('id');
    
    if (projectId && ALL_PROJECTS[projectId]) {
      const proj = ALL_PROJECTS[projectId];
      setProject(proj);
      
      const criteria = criteriaByEvent[proj.eventKey] || criteriaByEvent['webdev'];
      const initialScores = {};
      criteria.forEach(c => {
        initialScores[c.key] = Math.floor(c.max / 2);
      });
      setScores(initialScores);
    }

    document.documentElement.style.scrollBehavior = 'smooth';
  }, [navigate, location, routeId]);

  const handleScoreChange = (key, value) => {
    setScores(prev => ({ ...prev, [key]: parseInt(value) }));
  };

  const handleSubmitReview = () => {
    const totalScore = Object.values(scores).reduce((sum, val) => sum + val, 0);
    
    alert(`Review Submitted!\nTotal Score: ${totalScore}\nOverall: ${overallScore}/10\nFeedback: ${feedback || 'No feedback provided'}`);
    
    const judgeStatus = JSON.parse(localStorage.getItem('judgeStatus') || '{"completed": [], "pending": []}');
    if (!judgeStatus.completed.includes(project.id)) {
      judgeStatus.completed.push(project.id);
      judgeStatus.pending = judgeStatus.pending.filter(id => id !== project.id);
      localStorage.setItem('judgeStatus', JSON.stringify(judgeStatus));
    }
    
    navigate('/judge-dashboard');
  };

  const handleSaveDraft = () => {
    alert('Draft saved successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!project) {
    return <div className="loading">Loading...</div>;
  }

  const criteria = criteriaByEvent[project.eventKey] || criteriaByEvent['webdev'];
  const totalScore = Object.values(scores).reduce((sum, val) => sum + val, 0);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">
          <i className="fas fa-gavel"></i> Judge Panel
        </h2>
        <nav>
          <ul>
            <li><Link to="/judge-dashboard"><i className="fas fa-star-half-alt"></i> Judging Tasks</Link></li>
            <li><Link to="/view-submission" className="active"><i className="fas fa-check-circle"></i> Complete Reviews</Link></li>
            <li><Link to="/criteria"><i className="fas fa-scroll"></i> Judging Criteria</Link></li>
            <li className="logout-link">
              <Link to="/login" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Review Submission: {project.title}</h1>
          <div className="user-profile">
            <span className="welcome-text">Team:</span>
            <span className="user-name">{project.team}</span>
            <button className="action-btn back-btn" onClick={() => navigate('/judge-dashboard')}>
              <i className="fas fa-arrow-left"></i> Back
            </button>
          </div>
        </header>

        <section className="dashboard-section form-card">
          <h2><i className="fas fa-clipboard-list"></i> Evaluation Form</h2>

          <div className="form-group">
            <label>Submission Links</label>
            <p className="submission-links-text">
              <i className="fas fa-link"></i> Live Demo:{' '}
              <a href={project.demo} target="_blank" rel="noopener noreferrer">{project.demo}</a>
              <span style={{ marginLeft: '20px' }}>
                <i className="fab fa-github"></i> Repository:{' '}
                <a href={project.repo} target="_blank" rel="noopener noreferrer">{project.repo}</a>
              </span>
            </p>
          </div>

          <h3 className="scoring-header">
            Scoring Criteria (Total: {totalScore}/{criteria.reduce((sum, c) => sum + c.max, 0)})
          </h3>
          <div className="criteria-grid">
            {criteria.map(criterion => (
              <div key={criterion.key} className="criterion-item">
                <label>{criterion.label} ({scores[criterion.key] || 0}/{criterion.max})</label>
                <div className="score-slider-group">
                  <input
                    type="range"
                    min="0"
                    max={criterion.max}
                    value={scores[criterion.key] || 0}
                    onChange={(e) => handleScoreChange(criterion.key, e.target.value)}
                  />
                  <span className="score-display">{scores[criterion.key] || 0}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="form-group feedback-group">
            <label htmlFor="feedback">Detailed Feedback & Comments</label>
            <textarea
              id="feedback"
              rows="6"
              placeholder="Provide constructive feedback for the team. This will be shared after judging is complete."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="overall">Overall Recommendation Score (1-10): {overallScore}</label>
            <div className="score-slider-group">
              <input
                type="range"
                id="overall"
                min="1"
                max="10"
                value={overallScore}
                onChange={(e) => setOverallScore(parseInt(e.target.value))}
              />
              <span className="score-display overall-score">{overallScore}</span>
            </div>
          </div>

          <div className="form-actions">
            <button className="action-btn download-btn" onClick={() => alert('Download functionality')}>
              <i className="fas fa-download"></i> Download Artifacts
            </button>
            <button className="action-btn save-btn" onClick={handleSaveDraft}>
              <i className="fas fa-save"></i> Save Draft
            </button>
            <button className="action-btn submit-btn" onClick={handleSubmitReview}>
              <i className="fas fa-paper-plane"></i> Submit Final Review
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ViewSubmission;

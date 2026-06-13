import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import './Analytics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('month');

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

  // Participation Trend Chart Data
  const participationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Participants',
        data: [120, 190, 300, 250, 400, 380, 450, 500, 480, 550, 600, 650],
        borderColor: '#3FB950',
        backgroundColor: 'rgba(63, 185, 80, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Event Distribution Chart Data
  const eventDistributionData = {
    labels: ['Hackathons', 'Workshops', 'Seminars', 'Competitions', 'Tech Talks'],
    datasets: [
      {
        label: 'Events',
        data: [12, 19, 8, 15, 10],
        backgroundColor: [
          '#58A6FF',
          '#3FB950',
          '#F88C52',
          '#7B1FA2',
          '#E94E5C',
        ],
      },
    ],
  };

  // Submissions Status Chart Data
  const submissionsData = {
    labels: ['Pending', 'Under Review', 'Evaluated', 'Rejected'],
    datasets: [
      {
        data: [45, 32, 180, 23],
        backgroundColor: [
          '#F88C52',
          '#58A6FF',
          '#3FB950',
          '#E94E5C',
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#C9D1D9',
          font: {
            family: 'Montserrat',
          },
        },
      },
      tooltip: {
        backgroundColor: '#161B22',
        titleColor: '#FFFFFF',
        bodyColor: '#C9D1D9',
        borderColor: '#58A6FF',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#C9D1D9',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#C9D1D9',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#C9D1D9',
          font: {
            family: 'Montserrat',
          },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: '#161B22',
        titleColor: '#FFFFFF',
        bodyColor: '#C9D1D9',
        borderColor: '#58A6FF',
        borderWidth: 1,
      },
    },
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
            <li><Link to="/admin-submissions"><i className="fas fa-file-code"></i> Submissions</Link></li>
            <li><Link to="/analytics" className="active"><i className="fas fa-chart-line"></i> Analytics</Link></li>
            <li><Link to="/settings"><i className="fas fa-cogs"></i> Settings</Link></li>
            <li className="logout-link">
              <Link to="/login" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Analytics Dashboard</h1>
          <select 
            className="time-selector"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </header>

        <section className="stats-overview">
          <div className="stat-card">
            <i className="fas fa-users stat-icon"></i>
            <div className="stat-details">
              <h3>Total Participants</h3>
              <p className="stat-value">1,245</p>
              <span className="stat-change positive">
                <i className="fas fa-arrow-up"></i> 12.5%
              </span>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-calendar-check stat-icon"></i>
            <div className="stat-details">
              <h3>Active Events</h3>
              <p className="stat-value">8</p>
              <span className="stat-change positive">
                <i className="fas fa-arrow-up"></i> 3
              </span>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-file-alt stat-icon"></i>
            <div className="stat-details">
              <h3>Submissions</h3>
              <p className="stat-value">320</p>
              <span className="stat-change positive">
                <i className="fas fa-arrow-up"></i> 8.3%
              </span>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-trophy stat-icon"></i>
            <div className="stat-details">
              <h3>Completion Rate</h3>
              <p className="stat-value">87%</p>
              <span className="stat-change positive">
                <i className="fas fa-arrow-up"></i> 5.2%
              </span>
            </div>
          </div>
        </section>

        <section className="charts-grid">
          <div className="chart-card large">
            <h2>
              <i className="fas fa-chart-line"></i> Participation Trend
            </h2>
            <div className="chart-container">
              <Line data={participationData} options={chartOptions} />
            </div>
          </div>

          <div className="chart-card">
            <h2>
              <i className="fas fa-chart-bar"></i> Event Distribution
            </h2>
            <div className="chart-container">
              <Bar data={eventDistributionData} options={chartOptions} />
            </div>
          </div>

          <div className="chart-card">
            <h2>
              <i className="fas fa-chart-pie"></i> Submission Status
            </h2>
            <div className="chart-container">
              <Doughnut data={submissionsData} options={doughnutOptions} />
            </div>
          </div>
        </section>

        <section className="insights-section">
          <h2>
            <i className="fas fa-lightbulb"></i> Key Insights
          </h2>
          <div className="insights-grid">
            <div className="insight-card">
              <i className="fas fa-star"></i>
              <div>
                <h4>Peak Engagement</h4>
                <p>Most participants register between 6-9 PM on weekdays</p>
              </div>
            </div>
            <div className="insight-card">
              <i className="fas fa-fire"></i>
              <div>
                <h4>Top Event Type</h4>
                <p>Hackathons have the highest participation rate (78%)</p>
              </div>
            </div>
            <div className="insight-card">
              <i className="fas fa-medal"></i>
              <div>
                <h4>Best Performing</h4>
                <p>Web Dev events show 92% completion rate</p>
              </div>
            </div>
            <div className="insight-card">
              <i className="fas fa-chart-line"></i>
              <div>
                <h4>Growth Trend</h4>
                <p>25% increase in registrations month-over-month</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Analytics;

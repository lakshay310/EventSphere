import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Settings.css';

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    eventReminders: true,
    weeklyDigest: true,
    autoApproval: false,
    publicProfile: true,
    twoFactor: false,
    maintenanceMode: false
  });

  const [profile, setProfile] = useState({
    organizationName: 'EventSphere',
    email: 'admin@eventsphere.com',
    phone: '+1 234 567 8900',
    timezone: 'UTC-5'
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    const savedSettings = JSON.parse(localStorage.getItem('settings') || '{}');
    if (Object.keys(savedSettings).length > 0) {
      setSettings(prev => ({ ...prev, ...savedSettings }));
    }

    document.documentElement.style.scrollBehavior = 'smooth';
  }, [navigate]);

  const handleToggle = (setting) => {
    const newSettings = { ...settings, [setting]: !settings[setting] };
    setSettings(newSettings);
    localStorage.setItem('settings', JSON.stringify(newSettings));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('profile', JSON.stringify(profile));
    alert('Profile updated successfully!');
  };

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
            <li><Link to="/overview"><i className="fas fa-columns"></i> Overview</Link></li>
            <li><Link to="/manage-events"><i className="fas fa-calendar-alt"></i> Manage Events</Link></li>
            <li><Link to="/manage-judges"><i className="fas fa-user-tie"></i> Manage Judges</Link></li>
            <li><Link to="/admin-submissions"><i className="fas fa-file-code"></i> Submissions</Link></li>
            <li><Link to="/analytics"><i className="fas fa-chart-line"></i> Analytics</Link></li>
            <li><Link to="/settings" className="active"><i className="fas fa-cogs"></i> Settings</Link></li>
            <li className="logout-link">
              <Link to="/login" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Settings</h1>
        </header>

        <div className="settings-container">
          <div className="settings-card">
            <h3><i className="fas fa-bell"></i> Notification Preferences</h3>
            
            <div className="setting-item">
              <div>
                <label>Email Notifications</label>
                <p>Receive email updates about events and submissions</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div>
                <label>Push Notifications</label>
                <p>Get real-time push notifications on your device</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.pushNotifications}
                  onChange={() => handleToggle('pushNotifications')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div>
                <label>Event Reminders</label>
                <p>Receive reminders before events start</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.eventReminders}
                  onChange={() => handleToggle('eventReminders')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div>
                <label>Weekly Digest</label>
                <p>Get a weekly summary of platform activities</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.weeklyDigest}
                  onChange={() => handleToggle('weeklyDigest')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <div className="settings-card">
            <h3><i className="fas fa-shield-alt"></i> Security & Privacy</h3>
            
            <div className="setting-item">
              <div>
                <label>Auto-Approval for Submissions</label>
                <p>Automatically approve participant submissions</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.autoApproval}
                  onChange={() => handleToggle('autoApproval')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div>
                <label>Public Profile</label>
                <p>Make your profile visible to all users</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.publicProfile}
                  onChange={() => handleToggle('publicProfile')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div>
                <label>Two-Factor Authentication</label>
                <p>Add an extra layer of security to your account</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.twoFactor}
                  onChange={() => handleToggle('twoFactor')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <div className="settings-card">
            <h3><i className="fas fa-user-cog"></i> Organization Profile</h3>
            
            <form onSubmit={handleSaveProfile}>
              <div className="form-group">
                <label>Organization Name</label>
                <input
                  type="text"
                  name="organizationName"
                  value={profile.organizationName}
                  onChange={handleProfileChange}
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                />
              </div>

              <div className="form-group">
                <label>Timezone</label>
                <select name="timezone" value={profile.timezone} onChange={handleProfileChange}>
                  <option value="UTC-8">Pacific Time (UTC-8)</option>
                  <option value="UTC-7">Mountain Time (UTC-7)</option>
                  <option value="UTC-6">Central Time (UTC-6)</option>
                  <option value="UTC-5">Eastern Time (UTC-5)</option>
                  <option value="UTC+0">GMT (UTC+0)</option>
                  <option value="UTC+5:30">IST (UTC+5:30)</option>
                </select>
              </div>

              <button type="submit" className="save-btn">
                <i className="fas fa-save"></i> Save Changes
              </button>
            </form>
          </div>

          <div className="settings-card">
            <h3><i className="fas fa-tools"></i> System Settings</h3>
            
            <div className="setting-item">
              <div>
                <label>Maintenance Mode</label>
                <p>Enable maintenance mode to prevent user access</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.maintenanceMode}
                  onChange={() => handleToggle('maintenanceMode')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="danger-zone">
              <h4><i className="fas fa-exclamation-triangle"></i> Danger Zone</h4>
              <p>These actions are irreversible. Please be careful.</p>
              <button className="danger-btn">
                <i className="fas fa-database"></i> Clear All Data
              </button>
              <button className="danger-btn">
                <i className="fas fa-trash-alt"></i> Delete Account
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;

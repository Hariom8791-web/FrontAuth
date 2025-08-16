import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, redirect, useNavigate } from 'react-router-dom'
import config from './Config.json'
import './Dash.css'

const Dashboard = () => {
  const navigate = useNavigate()
  const [Name, setName] = useState('')
  const [Appemail, setAppemail] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  axios.defaults.withCredentials = true;
  
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get(config.API_URL + '/auth/Dashboard')
      .then(res => {
        if (res.data.status) {
          setName(res.data.username);
          setAppemail(res.data.Appemail)
        }
        if (!res.data.status) {
          alert("You've been logged out")
          navigate('/login')
        }
      })
      .catch(err => console.log(err))
  }, [])

  const logout = () => {
    axios.post(config.API_URL + '/auth/Logout')
      .then((res) => {
        if (res.status) { navigate('/login'); }
        else { console.log("Error during logout") }
      })
      .catch(err => console.error('Logout error:', err));
  };

  const checkAppemail = () => {
    if (Appemail) {
      navigate('/ChetakMail')
    }
    else {
      alert("To use Chetak Mail Service, please enter your business email and app password. Redirecting you to credentials setup.")
      navigate('/AppPasssword')
    }
  }

  return (
    <div className='dashboard-container'>
      {/* Mobile Header */}
      <div className="mobile-header">
        <div className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="mobile-title">Brain Radar</div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="logo-details">
          <i className="fas fa-mask"></i>
          <span className="logo_name">Brain Radar</span>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#" className="active">
              <i className='bx bx-grid-alt'></i>
              <span className="links_name">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="https://gulal-revolution.vercel.app">
              <i className='bx bx-home'></i>
              <span className="links_name">Home</span>
            </a>
          </li>
          <li className="log_out">
            <a onClick={logout}>
              <i className='bx bx-log-out'></i>
              <span className="links_name">Log out</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <section className="main-content">
        <div className="welcome-section">
          <h1>Welcome, {Name}</h1>
          <p>Manage your services and account</p>
        </div>

        <div className="dashboard-grid">
          <div className="card email-card">
            <div className="card-content">
              <i className='bx bx-envelope'></i>
              <div className="card-text">
                <h3>Chetak Email Service</h3>
                <p>3000 emails/month with HTML templates</p>
                <div className="pricing">Free</div>
              </div>
            </div>
            <button className="btn-primary" onClick={checkAppemail}>
              {Appemail ? 'Access Service' : 'Setup Credentials'}
            </button>
          </div>

          <div className="card coming-soon">
            <div className="card-content">
              <i className='bx bx-code-alt'></i>
              <div className="card-text">
                <h3>Developer API</h3>
                <p>Integrate with our services</p>
              </div>
            </div>
            <button className="btn-secondary">Coming Soon</button>
          </div>

          <div className="card coming-soon">
            <div className="card-content">
              <i className='bx bx-bar-chart'></i>
              <div className="card-text">
                <h3>Analytics Dashboard</h3>
                <p>Track your email performance</p>
              </div>
            </div>
            <button className="btn-secondary">Coming Soon</button>
          </div>

          <div className="card profile-card">
            <div className="card-content">
              <i className='bx bx-user'></i>
              <div className="card-text">
                <h3>Account Settings</h3>
                <p>Update your profile and preferences</p>
              </div>
            </div>
            <button className="btn-secondary">Manage Account</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard

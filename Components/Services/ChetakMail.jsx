import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import config from '../Config.json';
import { FiChevronDown, FiChevronUp, FiX, FiMail, FiFileText, FiHelpCircle, FiLogOut, FiHome, FiSettings } from 'react-icons/fi';
import './ChetakMail.css';

function ChetakMail() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  
  const [displaytext, setdisplaytext] = useState('This service is available when our server is running. Contact 7081920944 (WhatsApp) for Membership, Sales, and DEMO!');
  const [emails, setEmails] = useState([]);
  const [textmsg, setTextmsg] = useState('');
  const [subject, setSubject] = useState('');
  const [htmlFile, setHtmlFile] = useState(null);
  const [name, setName] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [emailCount, setEmailCount] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      complete: (result) => {
        if (result.data && result.data.length > 0) {
          const extractedEmails = result.data.map(row => row[0]).filter(email => email);
          setEmails(extractedEmails);
          setEmailCount(extractedEmails.length);
        } else {
          setdisplaytext('CSV file is empty or invalid');
        }
      },
      header: false,
      error: (error) => {
        setdisplaytext('Error parsing CSV file');
        console.error('CSV parsing error:', error);
      }
    });
  };

  useEffect(() => {
    axios.get(config.API_URL + '/auth/Dashboard')
      .then(res => {
        if (!res.data.status) {
          alert("You are logged out");
          navigate('/login');
        } else {
          setName(res.data.username);
        }
      })
      .catch(err => {
        console.log(err);
        setdisplaytext('Error verifying session');
      });
  }, [navigate]);

  const handleSendEmails = () => {
    if (emails.length === 0) {
      setdisplaytext('Please upload a CSV file with email addresses');
      return;
    }
    
    setIsSending(true);
    setdisplaytext(`Sending ${emailCount} emails... Please wait`);

    axios.post(`${config.API_URL}/auth/ChetakMail`, { 
      emails, 
      textmsg, 
      subject, 
      htmlFile, 
      name 
    })
    .then(res => { 
      console.log("Server Response:", res.data);
      if (res.data.status) {
        setdisplaytext(`Success! ${emailCount} emails sent`);
        window.open(
          'https://docs.google.com/forms/d/e/1FAIpQLSeb50p6jiZKTfeNBhatuB91tlLY30DlinRd_drNv0hIjxdYTQ/viewform?usp=sf_link',
          '_blank'
        );
      } else {
        setdisplaytext(res.data.message || "Email sending failed");
      }
      setIsSending(false);
    })
    .catch(err => {
      console.error("Error:", err);
      setdisplaytext(err.response?.data?.message || "Error sending emails");
      setIsSending(false);
    });
  };

  const handleHtmlUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => setHtmlFile(reader.result);
    reader.onerror = () => setdisplaytext('Error reading HTML file');
    reader.readAsText(file);
  };

  const logout = () => {
    axios.post(config.API_URL + '/auth/logout')
      .then(() => navigate('/login'))
      .catch(err => console.error('Logout error:', err));
  };

  return (
    <div className="chetak-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Chetak Mail</h3>
        </div>
        <nav>
          <Link to="/dashboard" className="sidebar-link">
            <FiHome className="icon" /> Dashboard
          </Link>
          <Link to="/AppPasssword" className="sidebar-link">
            <FiSettings className="icon" /> Email Settings
          </Link>
          <button onClick={logout} className="sidebar-link logout-btn">
            <FiLogOut className="icon" /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <div className="header">
          <h1>Welcome, {name}</h1>
          <button 
            onClick={() => setShowInstructions(!showInstructions)} 
            className="instruction-toggle"
          >
            {showInstructions ? <FiChevronUp /> : <FiChevronDown />} 
            {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
          </button>
        </div>

        {/* Instruction Panel */}
        {showInstructions && (
          <div className="instruction-panel">
            <button 
              className="close-btn" 
              onClick={() => setShowInstructions(false)}
            >
              <FiX />
            </button>
            <h2><FiHelpCircle className="icon" /> How to Use Chetak Mail</h2>
            
            <div className="video-container">
              <h3>Watch the Tutorial Video</h3>
              <div className="video-placeholder">
                [Video Embed Placeholder]
                <p>Coming soon - video tutorial</p>
              </div>
            </div>

            <div className="quick-guide">
              <h3>Quick Guide</h3>
              <ul>
                <li><strong>Chetak Email Service</strong> lets you send emails to multiple recipients with one click</li>
                <li>Perfect for <strong>digital marketing campaigns</strong></li>
                <li>Supports beautiful <strong>HTML templates</strong> (like Swiggy/Zomato)</li>
              </ul>
            </div>

            <div className="step-by-step">
              <h3>Step-by-Step Instructions</h3>
              <ol>
                <li>
                  <strong>Prepare your CSV file:</strong>
                  <ul>
                    <li>Single column with email addresses only</li>
                    <li>No headers, extra spaces, or symbols</li>
                    <a href="../../elements/example.jpg" target="_blank" rel="noopener noreferrer">
                      View CSV sample
                    </a>
                  </ul>
                </li>
                <li>
                  <strong>Prepare your HTML template:</strong>
                  <ul>
                    <li>Use inline CSS only</li>
                    <li>Host all resources (images, GIFs) online</li>
                    <a href="../../elements/sample.html" target="_blank" rel="noopener noreferrer">
                      View HTML sample
                    </a>
                  </ul>
                </li>
                <li>
                  <strong>Enable HTML in your Gmail account settings</strong>
                </li>
                <li>
                  <strong>Upload files and send!</strong>
                </li>
              </ol>
            </div>

            <div className="support-section">
              <h3>Need Help?</h3>
              <p>Contact us for assistance:</p>
              <div className="contact-options">
                <a href="https://wa.me/7599028269" target="_blank" rel="noopener noreferrer">
                  WhatsApp: 7599028269
                </a>
                <a href="https://github.com/Hariom8791-web" target="_blank" rel="noopener noreferrer">
                  GitHub: Hariom8791-web
                </a>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSeb50p6jiZKTfeNBhatuB91tlLY30DlinRd_drNv0hIjxdYTQ/viewform" 
                  target="_blank" rel="noopener noreferrer">
                  Feedback Form
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Email Form */}
        <div className="email-form">
          <div className="status-message">
            {displaytext}
            {emailCount > 0 && (
              <span className="email-count">Emails to send: {emailCount}</span>
            )}
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>
                <FiFileText className="icon" /> CSV File (Email List)
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="file-input"
                required
              />
              <p className="hint">Single column with email addresses only</p>
            </div>

            <div className="form-group">
              <label>
                <FiFileText className="icon" /> HTML Template (Optional)
              </label>
              <input
                type="file"
                accept=".html"
                onChange={handleHtmlUpload}
                className="file-input"
              />
              <p className="hint">Use inline CSS and hosted resources</p>
            </div>

            <div className="form-group full-width">
              <label>
                <FiMail className="icon" /> Email Subject
              </label>
              <input
                type="text"
                placeholder="Enter your subject line"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="text-input"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>
                <FiMail className="icon" /> Email Body
              </label>
              <textarea
                placeholder="Enter your message (plain text)"
                value={textmsg}
                onChange={(e) => setTextmsg(e.target.value)}
                className="text-area"
                rows="5"
              />
              <p className="hint">This will be used if no HTML template is provided</p>
            </div>
          </div>

          <button 
            onClick={handleSendEmails}
            className="send-btn"
            disabled={isSending}
          >
            {isSending ? 'Sending...' : 'Send Emails'}
          </button>
        </div>
      </main>
    </div>
  );
}

export default ChetakMail;

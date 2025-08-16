import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import config from '../Config.json';
import { FiX, FiMail, FiFileText, FiHelpCircle, FiLogOut, FiHome, FiSettings, FiSend } from 'react-icons/fi';
import { FaFileCsv, FaFileCode } from 'react-icons/fa';
import './ChetakMail.css';

function ChetakMail() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  
  const [statusMessage, setStatusMessage] = useState('Ready to send emails');
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
    if (!file) return;
    
    setStatusMessage('Processing CSV file...');
    
    Papa.parse(file, {
      complete: (result) => {
        if (result.data && result.data.length > 0) {
          const extractedEmails = result.data
            .map(row => row[0]?.trim())
            .filter(email => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
          
          if (extractedEmails.length > 0) {
            setEmails(extractedEmails);
            setEmailCount(extractedEmails.length);
            setStatusMessage(`Loaded ${extractedEmails.length} valid emails`);
          } else {
            setStatusMessage('No valid emails found in CSV');
          }
        } else {
          setStatusMessage('CSV file is empty or invalid');
        }
      },
      header: false,
      error: (error) => {
        setStatusMessage('Error parsing CSV file');
        console.error('CSV parsing error:', error);
      }
    });
  };

  useEffect(() => {
    axios.get(config.API_URL + '/auth/Dashboard')
      .then(res => {
        if (!res.data.status) {
          alert("Session expired - please login again");
          navigate('/login');
        } else {
          setName(res.data.username);
        }
      })
      .catch(err => {
        console.log(err);
        setStatusMessage('Error verifying your session');
      });
  }, [navigate]);

  const handleSendEmails = async () => {
    if (emails.length === 0) {
      setStatusMessage('Please upload a CSV file with valid email addresses');
      return;
    }
    
    setIsSending(true);
    setStatusMessage(`Sending ${emailCount} emails... Please wait`);

    try {
      const response = await axios.post(`${config.API_URL}/auth/ChetakMail`, { 
        emails, 
        textmsg, 
        subject, 
        htmlFile, 
        name 
      });
      
      console.log("Server Response:", response.data);
      if (response.data.status) {
        setStatusMessage(`Success! ${emailCount} emails sent`);
        window.open(
          'https://docs.google.com/forms/d/e/1FAIpQLSeb50p6jiZKTfeNBhatuB91tlLY30DlinRd_drNv0hIjxdYTQ/viewform?usp=sf_link',
          '_blank'
        );
      } else {
        setStatusMessage(response.data.message || "Email sending failed");
      }
    } catch (err) {
      console.error("Error:", err);
      setStatusMessage(err.response?.data?.message || "Error sending emails");
    } finally {
      setIsSending(false);
    }
  };

  const handleHtmlUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setStatusMessage('Processing HTML template...');
    
    const reader = new FileReader();
    reader.onload = () => {
      setHtmlFile(reader.result);
      setStatusMessage('HTML template loaded successfully');
    };
    reader.onerror = () => setStatusMessage('Error reading HTML file');
    reader.readAsText(file);
  };

  const logout = () => {
    axios.post(config.API_URL + '/auth/logout')
      .then(() => navigate('/login'))
      .catch(err => console.error('Logout error:', err));
  };

  return (
    <div className="chetak-container">
      {/* Navigation Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Chetak Mail</h2>
          <p className="welcome">Welcome, {name}</p>
        </div>
        <nav>
          <Link to="/dashboard" className="sidebar-link">
            <FiHome className="icon" /> Dashboard
          </Link>
          <Link to="/AppPasssword" className="sidebar-link">
            <FiSettings className="icon" /> Email Settings
          </Link>
          <button 
            onClick={() => setShowInstructions(true)} 
            className="sidebar-link"
          >
            <FiHelpCircle className="icon" /> Instructions
          </button>
          <button onClick={logout} className="sidebar-link logout-btn">
            <FiLogOut className="icon" /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="email-service-header">
          <h1>
            <FiMail className="header-icon" /> 
            Chetak Email Service
          </h1>
          <p className="subheader">Send bulk emails with HTML templates</p>
        </div>

        {/* Status Bar */}
        <div className={`status-bar ${isSending ? 'sending' : ''}`}>
          <div className="status-content">
            <span className="status-message">{statusMessage}</span>
            {emailCount > 0 && (
              <span className="email-count">
                {emailCount} {emailCount === 1 ? 'email' : 'emails'} ready
              </span>
            )}
          </div>
        </div>

        {/* Email Form */}
        <div className="email-form">
          <div className="form-section">
            <h3 className="section-title">
              <FaFileCsv className="section-icon" />
              Email List
            </h3>
            <div className="file-upload">
              <label className="file-upload-label">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="file-input"
                  required
                />
                <span className="file-upload-button">Choose CSV File</span>
                <span className="file-upload-text">
                  {emailCount > 0 ? `${emailCount} emails loaded` : 'No file selected'}
                </span>
              </label>
              <p className="file-hint">Single column with email addresses only</p>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <FaFileCode className="section-icon" />
              HTML Template (Optional)
            </h3>
            <div className="file-upload">
              <label className="file-upload-label">
                <input
                  type="file"
                  accept=".html"
                  onChange={handleHtmlUpload}
                  className="file-input"
                />
                <span className="file-upload-button">Choose HTML File</span>
                <span className="file-upload-text">
                  {htmlFile ? 'Template loaded' : 'No template selected'}
                </span>
              </label>
              <p className="file-hint">Use inline CSS and hosted resources</p>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <FiMail className="section-icon" />
              Email Content
            </h3>
            <div className="input-group">
              <label>Subject Line</label>
              <input
                type="text"
                placeholder="Enter your subject line"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="text-input"
                required
              />
            </div>
            <div className="input-group">
              <label>Plain Text Version</label>
              <textarea
                placeholder="Enter your message (will be used if no HTML template)"
                value={textmsg}
                onChange={(e) => setTextmsg(e.target.value)}
                className="text-area"
                rows="5"
              />
            </div>
          </div>

          <button 
            onClick={handleSendEmails}
            className="send-button"
            disabled={isSending || emailCount === 0}
          >
            <FiSend className="button-icon" />
            {isSending ? 'Sending...' : 'Send Emails'}
          </button>
        </div>
      </main>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="modal-overlay">
          <div className="instruction-modal">
            <div className="modal-header">
              <h2>
                <FiHelpCircle className="modal-icon" />
                Chetak Mail Instructions
              </h2>
              <button 
                className="close-modal"
                onClick={() => setShowInstructions(false)}
              >
                <FiX />
              </button>
            </div>
            
            <div className="modal-content">
              <div className="instruction-section">
                <h3>Getting Started</h3>
                <p>
                  Chetak Mail allows you to send bulk emails with optional HTML templates.
                  Follow these steps to use the service:
                </p>
                <ol className="steps-list">
                  <li>
                    <strong>Prepare your email list</strong> as a CSV file with one email address per line
                    <div className="example-image">
                      <img src="../../elements/example.jpg" alt="CSV example" />
                    </div>
                  </li>
                  <li>
                    <strong>Create your HTML template</strong> (if desired) with inline CSS
                    <div className="example-image">
                      <img src="../../elements/sample.html" alt="HTML example" />
                    </div>
                  </li>
                  <li>
                    <strong>Upload your files</strong> using the form
                  </li>
                  <li>
                    <strong>Enter your subject line</strong> and plain text version
                  </li>
                  <li>
                    <strong>Click "Send Emails"</strong> to deliver your campaign
                  </li>
                </ol>
              </div>

              <div className="instruction-section tips-section">
                <h3>Pro Tips</h3>
                <ul>
                  <li>Test with a small list first before sending to all recipients</li>
                  <li>Keep your HTML file under 100KB for best performance</li>
                  <li>Use email validation services to clean your list first</li>
                  <li>Enable HTML emails in your Gmail account settings</li>
                </ul>
              </div>

              <div className="instruction-section support-section">
                <h3>Need Help?</h3>
                <p>Contact our support team for assistance:</p>
                <div className="contact-methods">
                  <a href="https://wa.me/7599028269" target="_blank" rel="noopener noreferrer">
                    WhatsApp: +91 7599028269
                  </a>
                  <a href="mailto:support@chetakmail.com">
                    Email: support@chetakmail.com
                  </a>
                  <a href="https://github.com/Hariom8791-web" target="_blank" rel="noopener noreferrer">
                    GitHub Issues
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChetakMail;

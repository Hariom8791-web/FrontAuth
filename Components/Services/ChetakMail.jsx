import React, { useState, useEffect } from 'react';
import { FiX, FiMail, FiFileText, FiHelpCircle, FiSend } from 'react-icons/fi';
import { FaFileCsv, FaFileCode } from 'react-icons/fa';
import Papa from 'papaparse';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './ChetakMail.css';

const ChetakMail = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    emails: [],
    textmsg: '',
    subject: '',
    htmlFile: null,
    name: '',
    emailCount: 0,
    isSending: false,
    status: 'Ready to send emails'
  });

  const [showInstructions, setShowInstructions] = useState(false);

  // Toggle instruction modal with animation
  const toggleInstructions = () => {
    document.body.style.overflow = showInstructions ? 'auto' : 'hidden';
    setShowInstructions(!showInstructions);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setState(prev => ({ ...prev, status: 'Processing CSV...' }));

    Papa.parse(file, {
      complete: (result) => {
        const validEmails = result.data
          .flatMap(row => row[0]?.trim())
          .filter(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

        if (validEmails.length) {
          setState(prev => ({
            ...prev,
            emails: validEmails,
            emailCount: validEmails.length,
            status: `Loaded ${validEmails.length} valid emails`
          }));
        } else {
          setState(prev => ({ ...prev, status: 'No valid emails found' }));
        }
      },
      error: () => {
        setState(prev => ({ ...prev, status: 'CSV parsing failed' }));
      },
      header: false
    });
  };

  const handleSendEmails = async () => {
    if (!state.emailCount) {
      setState(prev => ({ ...prev, status: 'No emails to send' }));
      return;
    }

    setState(prev => ({ ...prev, isSending: true, status: `Sending ${state.emailCount} emails...` }));

    try {
      const response = await axios.post(`${config.API_URL}/auth/ChetakMail`, {
        emails: state.emails,
        textmsg: state.textmsg,
        subject: state.subject,
        htmlFile: state.htmlFile,
        name: state.name
      });

      if (response.data.status) {
        setState(prev => ({ ...prev, status: `Success! ${state.emailCount} emails sent` }));
        window.open(FEEDBACK_FORM_URL, '_blank');
      } else {
        setState(prev => ({ ...prev, status: response.data.message || 'Sending failed' }));
      }
    } catch (err) {
      setState(prev => ({ ...prev, status: err.response?.data?.message || 'Server error' }));
    } finally {
      setState(prev => ({ ...prev, isSending: false }));
    }
  };

  useEffect(() => {
    axios.get(`${config.API_URL}/auth/Dashboard`)
      .then(res => {
        if (!res.data.status) navigate('/login');
        else setState(prev => ({ ...prev, name: res.data.username }));
      })
      .catch(() => navigate('/login'));
  }, [navigate]);

  return (
    <div className="chetak-app">
      {/* Main Interface */}
      <div className="main-interface">
        <header className="app-header">
          <h1><FiMail /> Chetak Mail Service</h1>
          <button onClick={toggleInstructions} className="help-btn">
            <FiHelpCircle /> Instructions
          </button>
        </header>

        <div className={`status-bar ${state.isSending ? 'sending' : ''}`}>
          <span>{state.status}</span>
          {state.emailCount > 0 && (
            <span className="count-badge">{state.emailCount} emails</span>
          )}
        </div>

        <div className="email-form">
          <div className="form-section">
            <label>
              <FaFileCsv /> Email List (CSV)
              <input type="file" accept=".csv" onChange={handleFileUpload} />
            </label>
            <p className="hint">Single column with email addresses only</p>
          </div>

          <div className="form-section">
            <label>
              <FaFileCode /> HTML Template (Optional)
              <input type="file" accept=".html" onChange={handleHtmlUpload} />
            </label>
            <p className="hint">Use inline CSS with hosted resources</p>
          </div>

          <div className="form-section">
            <label>Email Subject</label>
            <input
              type="text"
              name="subject"
              value={state.subject}
              onChange={handleInputChange}
              placeholder="Your email subject"
            />
          </div>

          <div className="form-section">
            <label>Plain Text Version</label>
            <textarea
              name="textmsg"
              value={state.textmsg}
              onChange={handleInputChange}
              rows="5"
              placeholder="Fallback text content"
            />
          </div>

          <button
            onClick={handleSendEmails}
            disabled={state.isSending || !state.emailCount}
            className="send-btn"
          >
            <FiSend /> {state.isSending ? 'Sending...' : 'Send Emails'}
          </button>
        </div>
      </div>

      {/* Instruction Modal */}
      {showInstructions && (
        <div className="modal-backdrop">
          <div className="instruction-modal">
            <div className="modal-header">
              <h2><FiHelpCircle /> How to Use Chetak Mail</h2>
              <button onClick={toggleInstructions} className="close-btn">
                <FiX />
              </button>
            </div>

            <div className="modal-content">
              <InstructionStep 
                number="1"
                title="Prepare Your CSV File"
                content="Create a single-column CSV with just email addresses"
                image="csv-sample.jpg"
              />
              
              <InstructionStep 
                number="2"
                title="Design HTML Template"
                content="Use inline CSS and host all images externally"
                image="html-sample.jpg"
              />

              <InstructionStep 
                number="3"
                title="Upload & Send"
                content="Select your files, enter subject/text, then click send"
              />

              <div className="support-section">
                <h3>Need Help?</h3>
                <SupportContact 
                  method="WhatsApp"
                  details="+91 7599028269"
                  link="https://wa.me/7599028269"
                />
                <SupportContact 
                  method="Email"
                  details="support@chetakmail.com"
                  link="mailto:support@chetakmail.com"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable components
const InstructionStep = ({ number, title, content, image }) => (
  <div className="instruction-step">
    <div className="step-header">
      <span className="step-number">{number}</span>
      <h3>{title}</h3>
    </div>
    <p>{content}</p>
    {image && <img src={`/assets/${image}`} alt={title} className="step-image" />}
  </div>
);

const SupportContact = ({ method, details, link }) => (
  <div className="support-contact">
    <strong>{method}:</strong>
    <a href={link} target="_blank" rel="noopener noreferrer">
      {details}
    </a>
  </div>
);

export default ChetakMail;

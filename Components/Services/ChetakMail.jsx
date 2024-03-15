
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse'; // A CSV parsing library
import axios from 'axios';
import './ChetakMail.css'
import { Link } from 'react-router-dom';
import Sample from './elements/Sample.jsx'
import config from '../Config.json';



import { Navigate, useNavigate } from 'react-router-dom';

function ChetakMail() {
    const navigate=useNavigate();
    axios.defaults.withCredentials=true;
  const[displaytext,setdisplaytext]=useState('This service only avaible when my own server is runnig because vercel on free plan do not allow to response time exceeds more than 10 sec but as number emails increased its time also increase >> Contact  7081920944 (whatsapp)for Membership and Sale ')
  const [emails, setEmails]=useState([]);
  const[textmsg,setTextmsg]=useState('');
  const[subject,setSubject]=useState('');
  const [htmlFile, setHtmlFile] = useState(null);
  const[name,setName]=useState('')
  
  const handleFileUpload = async (event) => {
    
    const file = event.target.files[0];
    
    // Parse CSV file
    Papa.parse(file, {
      complete: (result) => {
        if (result.data && result.data.length > 0) { // Check if result.data exists and has elements
          // Extract emails from CSV and store in an array
          const extractedEmails = result.data.map(row => row[0]);
          setEmails(extractedEmails);
        } else {
          console.error('CSV file is empty or invalid');
          // Handle the case where CSV file is empty or invalid
        }
      },
      header: false,
    });
  };
  useEffect(()=>{
    axios.get(config.API_URL+'/auth/Dashboard')
        .then(res=>{
            console.log(res)
            if(!res.data.status){
              alert("You are log out ")
                navigate('/login')
            }
            else{
                setName(res.data.username)
                navigate('/ChetakMail')
            }
        })
        .catch(err=>console.log(err))
  
  
  
    },[])
 
  const handleSendEmails = () => {
    setdisplaytext("We are Sending Your Emails >> Do not Reload page")
    console.log(htmlFile)
     // axios.post(config.API_URL+'/auth/ChetakMail', { emails,textmsg,subject,htmlFile,name})
     axios.post('https://821c-103-211-191-74.ngrok-free.app/Service/Chetak', { emails,textmsg,subject,htmlFile,name})
     .then(res =>{
        console.log(res.data.message)
        if(res.data.status){
            setdisplaytext("All Mails Sent Successfully")
            window.open('https://docs.google.com/forms/d/e/1FAIpQLSeb50p6jiZKTfeNBhatuB91tlLY30DlinRd_drNv0hIjxdYTQ/viewform?usp=sf_link', '_blank');
        }
       else{
        setdisplaytext(res.data.message)
       }
      
     })
     .catch(err=>{
        console.log(err)
        // setdisplaytext(err.message || 'Internal Server Error');
      setdisplaytext("Internal server not working")
     })
  };
  const handlehtml = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      const fileContent = reader.result;
      setHtmlFile(fileContent); // Set the file content in the state
    };
    
    reader.readAsText(file); // Read the file as text
  };
  const logout = () => {
    axios.post(config.API_URL+'/auth/logout')
      .then((res) => {
        if(res.status){
          navigate('/login')
        }
      })
      .catch(err => console.error('Logout error:', err));
  };


  return (
    
    <div className="formbold-main-wrapper">
      <div className="instruction">
        <br />
        <h4>Welcome {name}</h4>
        <br />
        <h3> Important Instruction</h3>
        <br></br>
          <div className="instruction-list">
          <ol>
        <li><h4>Watch the Video To Know How this Work ? </h4></li>
        <br></br>
        <li><h4>Here is the Quick go !</h4>
        <ul>
          <li>Chetak Email Service help client to Send Email to Multiple user in One click </li>
          <li>You can also Send Html template With it  </li>
          <br />
          <li>Step 1: You need CSV file As shown below </li>
          <br />
          <li>Step 2: Now select Your Csv file and Html template</li>
          <br />
          <li> Step 3: Click on Send Button</li>
        </ul>
        
        </li>
        <br />
        <li>
       <h4> <a href="../../elements/sample.html" target="_blank">Click here to see sample image of CSV file </a></h4>
        <br />
        </li>
        <br></br>
        <li><h4>Your Csv file  should not contain any single extra letter symbol, space and your csv file should exactly look like as shown in above image </h4></li>
        <br></br>
        <li><h4>For Sending Html template Make sure You have enable html template option  in your App Gmail Account  </h4></li>
        <br></br>
        <li><h4>Still you Face any Kind of Trouble feel free to Contact </h4>
        
        <h4><a href="https://docs.google.com/forms/d/e/1FAIpQLSeb50p6jiZKTfeNBhatuB91tlLY30DlinRd_drNv0hIjxdYTQ/viewform?usp=sf_link" target='_blank'>Contact google form </a></h4>
        </li>
        <br></br>
        <li><h4>Your feedback Valuable to Us Kindly fill the feedback form or Any Kind of service you want Contact Freely </h4></li>
        <br></br>
        <button  className="btn btn-primary" onClick={logout}>Logout</button>
        <br />
        <br />
        <Link to='/dashboard'> Dashboard</Link>
    </ol>

            </div>     
      </div>
    <div className="formbold-form-wrapper">
      <br></br>
      <h2>Chetak  E-Mail  Services!</h2>
      <br></br>
      <h2>Fill the Credentials</h2>
      <br></br>
      <h5 id='warn'>{displaytext}</h5>
      <br></br>
     
          <div className="formbold-input-flex">
            <div>
                <h4>Select Your CSV file </h4>
                <label htmlFor="firstname"  required>   </label>
                <input
                type="file" accept=".csv" onChange={handleFileUpload}
                
                className="formbold-form-input"
                 required />
            </div>
            <div>
                <h4>Select Your HTML Template</h4>
                <label htmlFor="lastname" className="formbold-form-label">  </label>
                <input
                type="file" accept=".html"  onChange={handlehtml}
                placeholder="Cooper"
                className="formbold-form-input"
                />
            </div>
          </div>
          <div>
              <h4>Your Subject</h4>
              <label htmlFor="message" className="formbold-form-label">  </label>
              <textarea 
                  rows="6"
                  name="message"
                  id="message"
                  placeholder="Enter Your Subject Here !"
                  className="formbold-form-input"
                  onChange={(e)=>setSubject(e.target.value)}
              ></textarea>
          </div>
            <div>
              <h4>Body & "Your Message"</h4>
              <label htmlFor="message" className="formbold-form-label">  </label>
              <textarea
                  rows="6"
                  name="message"
                  id="message"
                  placeholder="Enter Your Message Here !"
                  className="formbold-form-input"
                  onChange={(e)=>setTextmsg(e.target.value)}
              ></textarea>
          </div>
  
          <button className="formbold-btn" onClick={handleSendEmails}>
              Send
          </button>
      
    </div>
  </div>
  





  );
}

export default ChetakMail;

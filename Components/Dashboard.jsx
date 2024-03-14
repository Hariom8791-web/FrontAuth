import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, redirect,useNavigate } from 'react-router-dom'
import config from './Config.json'
import  './Dash.css'
//  import './Dashscript'
const Dashboard = () => {
  const navigate=useNavigate()
  const[Name,setName]=useState('')
  const[Appemail,setAppemail]=useState('')
  // axios.defaults.withCredentials=true;
  useEffect(()=>{
      axios.get(config.API_URL+'/auth/Dashboard')
      .then(res=>{
          console.log(res)
          if(res.data.status){
          
            setName(res.data.username);
            setAppemail(res.data.Appemail)
           }
          if(!res.data.status){
            alert("Your logged out")
              navigate('/login')
          }

        
      })
      .catch(err=>console.log(err))
  },[])



const logout = () => {
    axios.post(config.API_URL+'/auth/Logout')
      .then((res) => {
        // Delete session cookie
        if(res.status){navigate('/login');}
        // Navigate to login page
        else{
          console.log("error while logout ")
        }
        
      })
      .catch(err => console.error('Logout error:', err));
  };
  
const checkAppemail=()=>{
if (Appemail)
{
navigate('/ChetakMail')
}
else{
  alert("To Avail the Chetak Mail Service You Need Enter Your Business Email and App password >> We are Directing You to fill the Credentials")
  navigate('/AppPasssword')
}
}

  return (
  
  <div className='dashdiv'>
     
      <div class="sidebar">
      <div class="logo-details">
        <i class="fas fa-mask"></i>
        <span class="logo_name">Brain  Radar</span>
      </div>
      <ul class="nav-links">
        <li>
          <a href="#" class="active">
            <i class="bx bx-grid-alt"></i>
            <div><span class="links_name">Dashboard</span></div>
          </a>
        </li>
        
        <li class="log_out">
          <a href="#">
            <i class="bx bx-log-out"></i>
           <button onClick={logout} style={{backgroundColor:"#24788f",border:"0px"}}> <span class="links_name">Log out</span></button>
          </a>
        </li>
      </ul>
    </div>



    
      <section class="home-section">
    

      <div class="home-content">
        <br />
        
        <h3>Welcome {Name} </h3>
        <br />
        <div class="overview-boxes">
          <div class="box">
            <div class="right-side">
              <div class="box-topic">3000 emails /Month with Html Template </div>
              <div class="number ">Free</div>
              <div class="indicator">
                <i class="bx bx-up-arrow-alt"></i>
                <span class="text"><button className=" btn btn-primary"onClick={checkAppemail}>Chetak E-mail services</button></span>
              </div>
            </div>
            <i class="bx bx-envelope mail"></i>
          </div>  
        </div>
        </div>
      </section> 
      
    </div>
  )
}

export default Dashboard
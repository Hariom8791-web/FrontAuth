import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, redirect,useNavigate } from 'react-router-dom'
import config from './Config.json'

const Dashboard = () => {
  const navigate=useNavigate()
  const[Name,setName]=useState('')
  axios.defaults.withCredentials=true;
  useEffect(()=>{
      axios.get(config.API_URL+'/auth/Dashboard')
      .then(res=>{
          console.log(res)
          if(!res.data.valid){
            console.log("receive false for some reason")
              navigate('/login')
          }
          else{
              setName(res.data.username)
          }
      })
      .catch(err=>console.log(err))
  },[])



  const logout = () => {
    axios.post('http://localhost:3005/auth/logout',{Name})
      .then((res) => {
        if(res.data.status){
          navigate('/login');
        }
        
      })
      .catch(err => console.error('Logout error:', err));
  };
  
  return (
    <div>
      Welcome  {Name} This is Your Dashboard  We apologies For Bad Experience and we are Working on it 
      <br></br>
      <br />
      <br />
    <button onClick={logout}>Logout</button>
    <br />
    <br />
    <br />
    <button><Link to ='/ChetakMail'> Chetak E-Mail Services</Link></button>
    
    
    
    </div>
  )
}

export default Dashboard
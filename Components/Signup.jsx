import React, { useState } from 'react';
import './design/fonts/material-icon/css/material-design-iconic-font.min.css'
import './design/css/style.css'
import singupImage from './design/images/singup.jpg';
import Axios from 'axios'
import {Link, useNavigate } from 'react-router-dom'
import { Verification } from './Verification';
import config from './Config.json';

const Signup = () => {
const [error,setError]=useState('')
const navigate =useNavigate()

const [username,setUsername]=useState('')
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')

 Axios.defaults.withCredentials=true;

   
const handleSubmit=(e)=>{
    e.preventDefault();

  
    Axios.post(config.API_URL+'/auth/signup',{
        username,
        email,
        password,
    }).then (response =>{
        
        
        console.log(response)
        if(!response.data.status){
        setError(response.data.message)
        }
        else{
            navigate('/Verification')
        }
       
        
    }).catch(err=>{
        console.log(err)
    })
}

return (
        <>
<div class="main">
<section class="signup">
    <div class="container">
        <div class="signup-content">
            <div class="signup-form">
                <h2 class="form-title">Sign up</h2>
                <br />
                <h4> Be aware ! Case sensitive</h4>
                {error && <p style={{color:"red"}} >**{error}**</p>}
                <form  class="register-form" id="register-form" onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label htmlFor="username"><i class="zmdi zmdi-account material-icons-name"></i></label>
                        <input type="text" name="name" id="name" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} required/>
                    </div>
                    <div class="form-group">
                        <label htmlFor="email"><i class="zmdi zmdi-email"></i></label>
                        <input type="email" name="email" id="email" placeholder="Your Email"  onChange={(e)=>{setEmail(e.target.value)}} required/>
                    </div>
                    <div class="form-group">
                        <label htmlFor="password"><i class="zmdi zmdi-lock"></i></label>
                        <input type="password" name="password" id="pass" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} required/>
                    </div>
                    {/* <div class="form-group">
                        <label htmlFor="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
                        <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password"/>
                    </div> */}
                    {/* <div class="form-group">
                        <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
                        <label htmlFor="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
                    </div> */}
                    <div class="form-group form-button">
                        <button type="submit" name="signup" id="signup" class="form-submit" >Submit</button>
                    </div>
                </form>
            </div>
            <div class="signup-image">
                <figure><img src={singupImage} alt="sing up image"/></figure>
                <Link to="/Login" class="signup-image-link">I am already member</Link>
                {/* <a href="#" class="signup-image-link">I am already member</a> */}
            </div>
        </div>
    </div>
</section>
</div>
<script src="design/vendor/jquery/jquery.min.js"></script>
<script src="design/js/main.js"></script>
        </>
    )
}

export default Signup;

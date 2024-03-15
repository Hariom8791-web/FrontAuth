import React, { useState,useEffect } from 'react';
import './design/fonts/material-icon/css/material-design-iconic-font.min.css'
import './design/css/style.css'
import singupImage from './design/images/singup.jpg';
import Axios from 'axios'
import {Link, useNavigate } from 'react-router-dom'
import config from './Config.json';


const Login = () => {
    const navigate=useNavigate()
    const[error,setError]=useState('')
    const[Email,setEmail]=useState('')
    const[password,Setpassword]=useState('')
    //  Axios.defaults.withCredentials=true;
    useEffect(()=>{
    Axios.get(config.API_URL+'/auth/Dashboard')
        .then(res=>{
            console.log(res)
            if(!res.data.valid){
                navigate('/login')
            }
            else{
                navigate('/Dashboard')
            }
        })
        .catch(err=>console.log(err))
  
  
  
    },[])
    const handlelogin =(e)=>{
        e.preventDefault();
        Axios.post(config.API_URL+'/auth/Login',{Email ,password})
        .then(res=>{
            console.log(res.data.message)
                    if(res.data.status){
                        console.log(res.data.message)
                        navigate('/Dashboard')
                        
                    }
                    else{
                        console.log(res.data.message)
                        setError(res.data.message)
                    }
                        
                        
                    

        })
        .catch(res=>{
            console.log(res)
            setError("Internal server error ")
        })
    }

    return (
        <>

            <div className="main">
                <section className="sign-in">
                    <div className="container">
                        <div className="signin-content">
                            <div className="signin-image">
                                <figure><img src={singupImage} alt="sing up image"/></figure>
                                {/* <a href="#" className="signup-image-link">Create an account</a> */}
                                <Link to ="/Signup" className="signup-image-link"> Create an Account</Link>
                                
                            </div>

                            <div className="signin-form">
                                <h2 className="form-title">LOG IN</h2>
                                <br />
                                <h4> Be aware ! Case sensitive</h4>
                                <br />
                                {error && <p style={{color:"red"}} >*{error}</p>}
                                <form onSubmit={handlelogin} className="register-form" id="login-form">
                                    <div className="form-group">
                                        <label htmlfor="Email"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type="text" name="your_name" id="your_name" placeholder="Your Email"onChange={(e)=>{setEmail(e.target.value)}} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlfor="password"><i className="zmdi zmdi-lock"></i></label>
                                        <input type="password" name="your_pass" id="your_pass" placeholder="Password" onChange={(e)=>Setpassword(e.target.value)} required />
                                    </div>
                                    {/* <div className="form-group">
                                        <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                        <label htmlfor="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                                    </div> */}
                                    <div className="form-group form-button">
                                        <input type="submit"  id="signin" className="form-submit"  />
                                        <br />
                                        <br />
                                        <Link to='/Forgotpassword'>Forgot Password ?</Link>
                                    </div>
                                </form>
                                {/* <div className="social-login">
                                    <span className="social-label">Or login with</span>
                                    <ul className="socials">
                                        <li><a href="#"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                        <li><a href="#"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                        <li><a href="#"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                                    </ul>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </section>

                <script src="vendor/jquery/jquery.min.js"></script>
                <script src="js/main.js"></script>
            </div>

        </>
    )
}

export default Login
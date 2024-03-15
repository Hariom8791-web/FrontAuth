
import Axios from 'axios'
import {Link, useNavigate } from 'react-router-dom'
import React,{useState,useEffect} from 'react'
import singupImage from './design/images/signin.jpg'
import config from './Config.json';

export const AppPasssword = () => {
    const navigate=useNavigate();
    const[error,setError]=useState('')
    const[Appemail,setAppEmail]=useState('')
    const[AppPassword,setAppPassword]=useState('')
    const[username,setusername]=useState('')
    useEffect(()=>{
        Axios.get(config.API_URL+'/auth/getusername')
        .then(res=>{
            console.log(res)
           
            if(res.data.status){
              setusername(res.data.sessionusername)
              console.log("username",username)
            }
  
            else{
                console.log("Not able to Fetch username")
                navigate('/dashboard')
            }
        })
        .catch(err=>console.log(err))
    },[])
  
    const handleAppPassword=(e)=>{
        e.preventDefault()
        Axios.defaults.withCredentials=true;
        Axios.post(config.API_URL+'/auth/AppPasssword',{Appemail,AppPassword,username})
        .then(res=>{
            console.log(res.data.message)
            if(res.data.status){
                navigate('/ChetakMail')
            }
            else{
                console.log(res.data.message)
                setError(res.data.message)

            }

        })
        .catch(res=>{

        })
    }
    function handlePasswordChange(event) {
        const password = event.target.value.replace(/\s/g, ''); // Remove all spaces
        setAppPassword(password);
    }
  return (
    <div>
                <div class="main">
                <section class="sign-in">
                    <div class="container">
                        <div class="signin-content">
                            <div class="signin-image">
                            
                                <figure><img src={singupImage} alt="sing up image"/></figure>
                                <a href="#" class="signup-image-link">Enter App Password</a><br />
                                <Link to ='/Login'> <h4>Back to Login</h4></Link>
                                    
                            </div>

                            <div class="signin-form">
                                <h2 class="form-title">Email & App Password</h2>
                                <br />
                                <h4> Be aware ! Case sensitive</h4>
                                <br />
                                <h4><span style={{color:"red"}}>Important Message</span> This is Final step to Register Yourself Successfully For  Chetak Services</h4>
                                <br />
                                <br />
                                <h4><span>Watch Video How to Generate App Password of Your Business Email and Also Make sure to enable Html template Option For sending Html template</span> Link</h4>
                                <br />
                                {error && <p style={{color:"red"}} >*{error}</p>}
                                <br />
                                <form method="POST" class="register-form" id="login-form" onSubmit={handleAppPassword}>
                                    <div class="form-group">
                                        <label htmlfor="Appemail"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type="text" name="your_name" id="your_name" placeholder="Your Email" onChange={(e)=>{setAppEmail(e.target.value)}} required />
                                    </div>
                                    <div class="form-group">
                                        <label htmlfor="AppPassword"><i class="zmdi zmdi-lock"></i></label>
                                        <input type="password" name="your_pass" id="your_pass" placeholder=" App Password" onChange={handlePasswordChange}  required />
                                    </div>
                                    {/* <div class="form-group">
                                        <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
                                        <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
                                    </div> */}
                                    <div class="form-group form-button">
                                        <input type="submit" name="signin" id="signin" class="form-submit" value="Save" />
                                    </div>
                                    
                                    <br />
                                    <Link to ='/dashboard' ><h4>Back to Dashboard</h4> </Link>
                                </form>
                                {/* <div class="social-login">
                                    <span class="social-label">Or login with</span>
                                    <ul class="socials">
                                        <li><a href="#"><i class="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                        <li><a href="#"><i class="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                        <li><a href="#"><i class="display-flex-center zmdi zmdi-google"></i></a></li>
                                    </ul>
                                </div> */}
                            </div>
                        </div>
        <h4>This is DEVELOPED  by Hari Om singh Contact for Work ( 7081920944 whatsapp) <a href="https://github.com/Hariom8791-web">https://github.com/Hariom8791-web</a> </h4>

                    </div>

                </section>

                <script src="vendor/jquery/jquery.min.js"></script>
                <script src="js/main.js"></script>
            </div>


    </div>
  )
}

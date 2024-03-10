
import Axios from 'axios'
import {Link, useNavigate } from 'react-router-dom'
import React,{useState} from 'react'
import singupImage from './design/images/signin.jpg'
import config from './Config.json';

export const AppPasssword = () => {
    const navigate=useNavigate();
    const[error,setError]=useState('')
    const[Appemail,setAppEmail]=useState('')
    const[AppPassword,setAppPassword]=useState('')
    const handleAppPassword=(e)=>{
        e.preventDefault()
        Axios.defaults.withCredentials=true;
        Axios.post(config.API_URL+'/auth/AppPasssword',{Appemail,AppPassword,})
        .then(res=>{
            console.log(res.data.message)
            if(res.data.status){
                navigate('/login')
            }
            else{
                console.log(res.data.message)
                setError(res.data.message)

            }

        })
        .catch(res=>{

        })
    }
  return (
    <div>
                <div class="main">
                <section class="sign-in">
                    <div class="container">
                        <div class="signin-content">
                            <div class="signin-image">
                            
                                <figure><img src={singupImage} alt="sing up image"/></figure>
                                <a href="#" class="signup-image-link">Enter App Password</a>
                            </div>

                            <div class="signin-form">
                                <h2 class="form-title">Email & App Password</h2>
                                <br />
                                {error && <p style={{color:"red"}} >*{error}</p>}
                                <br />
                                <form method="POST" class="register-form" id="login-form" onSubmit={handleAppPassword}>
                                    <div class="form-group">
                                        <label htmlfor="Appemail"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type="text" name="your_name" id="your_name" placeholder="Your Email" onChange={(e)=>{setAppEmail(e.target.value)}} />
                                    </div>
                                    <div class="form-group">
                                        <label htmlfor="AppPassword"><i class="zmdi zmdi-lock"></i></label>
                                        <input type="text" name="your_pass" id="your_pass" placeholder=" App Password" onChange={(e)=>{setAppPassword(e.target.value)}} />
                                    </div>
                                    {/* <div class="form-group">
                                        <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
                                        <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
                                    </div> */}
                                    <div class="form-group form-button">
                                        <input type="submit" name="signin" id="signin" class="form-submit" value="Save" />
                                    </div>
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
                    </div>
                </section>

                <script src="vendor/jquery/jquery.min.js"></script>
                <script src="js/main.js"></script>
            </div>


    </div>
  )
}

import React,{useState} from 'react'
import singupImage from './design/images/signin.jpg'
import Axios from 'axios'
import {Link, useNavigate } from 'react-router-dom'
import config from './Config.json';

export const Verification = () => {
    const[error,SetError]=useState('')
    const navigate=useNavigate()
    const [code ,setCode]=useState('')
    const handleVerify=(e)=>{
        console.log(code,"handle verify working")
        
        e.preventDefault()
        Axios.defaults.withCredentials=true;
        Axios.post(config.API_URL+'/auth/Verification',{code
                    
        }).then(res=>{
                            if(res.data.status){
                                console.log(res.data.message)
                                navigate('/AppPasssword')
                            }
                            else{
                                    SetError("Enter OTP CORRECTLY")
                            }
        }).catch(err=>{
                console.log(err)
        })
    }
  return (
    <div class="main">
    <section class="sign-in">
        <div class="container">
            <div class="signin-content">
                <div class="signin-image">
                
                    <figure><img src={singupImage} alt="sing up image"/></figure>
                    
                </div>

                <div class="signin-form">
                    <h2 class="form-title">Enter Your Code Here!</h2>
                    <br />
                    {error && <p style={{color:"red"}} >**{error}**</p>}
                    <br />
                    <h5 class="signup-image-link"> Check your email Inbox and Spambox !</h5>
                    <br></br>
                    
                    <form  class="register-form" id="login-form" onSubmit={handleVerify}>
                        <div class="form-group">
                            <label htmlfor="code"><i ></i></label>
                            <input type="text" name="your_name" id="your_name" placeholder="Enter Your Code Here"  onChange={(e)=>{setCode(e.target.value)}}/>
                            <br></br>
                            {/* <a href="#" class="signup-image-link" type='submit'>Verify </a> */}
                            <button class="signup-image-link" type='submit'>verify</button>
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

  )
}

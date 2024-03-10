import React, { useState,useEffect } from 'react'
import './elements/forgotpassword.css'
import Axios from "axios"
import { Link, useNavigate, useParams } from 'react-router-dom'
import config from './Config.json';

const Resetpassword = () => {
    const [password, setPassword] = useState("");
    const {token} = useParams()
    console.log("Token:", token);
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault();
      Axios.defaults.withCredentials=true;
      Axios.post(config.API_URL+'/auth/resetPassword/'+token, {
        password,
      }).then(response => {
          if(response.data.status) {
              navigate('/login')
          }
          console.log(response.data)
      }).catch(err => {
          console.log(err)
      })
    };
    return (
        <div>
            <h2>Reset Your Password Here !</h2>
            <form onSubmit={handleSubmit} className='sign-up-container' >
              

                <div className="containerforgot">

                    <h4>Enter Your New Password</h4>
                    <label htmlFor="password"><b></b></label>
                    <input type='password' placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} required />

                    <button type="submit" id='signup'>Reset It </button>

                </div>

                <div className="cont-login">
                    <br />
                    <Link to='/Login'>Cancel</Link>
                  
                </div>
                <div className='login'>
                    <p> Have An Account </p><Link to="/Login">LOGIN HERE</Link>
                </div>
            </form>



        </div>
    )
}


export default Resetpassword
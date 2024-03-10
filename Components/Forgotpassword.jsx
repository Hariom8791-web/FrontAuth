import React, { useState } from 'react'
import './elements/forgotpassword.css'
import Axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import config from './Config.json';

const Forgotpassword = () => {
    const[display,setdisplay]=useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.defaults.withCredentials=true;
        Axios.post(config.API_URL+'/auth/Forgotpassword', { email })
            .then(response => {
                if (response.data.status) {
                    alert("check your email")
                    navigate('/Login')
                }
                if(!response.data.status){
                    setdisplay(response.data.message)
                }
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <h2>Enter Your Email for Reset Password !</h2>
            <form onSubmit={handleSubmit} className='sign-up-container' >
             

                <div className="containerforgot">
                { <p style={{color:"red"}} >{display}</p>}
                <br />
                    <h3>Enter Email</h3>
                    <br />
                    <label htmlFor="email"></label>
                    <input type="email" placeholder="Enter Email" onChange={(e) => { setEmail(e.target.value) }} required />
                   
                    <button type="submit" id='signup'>Send link</button>
                  
                </div>

                <div className="cont-login">
                    <br />
                    <Link to ='/Login'>Back to Login Page</Link>
                    
                </div>
                <div className='login'>
                    <p> Have an account </p><Link to="/Login">Login</Link>
                </div>
            </form>



        </div>
    )
}


export default Forgotpassword
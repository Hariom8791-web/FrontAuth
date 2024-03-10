
import './App.css'
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import Signup from '../Components/Signup.jsx'
import Login from '../Components/Login.jsx'
import { Verification } from '../Components/Verification.jsx'
import { AppPasssword } from '../Components/AppPasssword.jsx'
import Dashboard from '../Components/Dashboard.jsx'
import ChetakMail from '../Components/Services/ChetakMail.jsx'
import Forgotpassword from '../Components/Forgotpassword.jsx'
import Resetpassword from '../Components/Resetpassword.jsx'


function App() {
  const ExternalLink = ({ url }) => {
    window.location.href = url; // Redirect to the external URL
    return null; // Render nothing
  };

  return (
    <>
    <BrowserRouter>
      <Routes>
  
    <Route path="/" element={<ExternalLink url="https://gulal-revolution.vercel.app" />} />  
   

        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/Login" element={<Login/>}> </Route>
        <Route path="/Verification" element={<Verification/>}> </Route>
        <Route path="/AppPasssword" element={<AppPasssword/>}> </Route>
        <Route path="/Dashboard" element={<Dashboard/>}> </Route>
        <Route path="/ChetakMail" element={<ChetakMail/>}></Route>
        <Route path="/Forgotpassword" element={<Forgotpassword/>}></Route>
        <Route path="/resetPassword/:token" element={<Resetpassword/>}></Route>
        
        
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App

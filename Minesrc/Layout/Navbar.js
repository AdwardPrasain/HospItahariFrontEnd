import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { LoginContext } from '../Context/LoginContext'

const Navbar = () => {

  const {loginReturn,setLoginReturn} = useContext(LoginContext);

   const handleClearData = () => {
    alert("You are Log Out")
    setLoginReturn("");
    localStorage.clear();

   }   

  return (

<>
       
<nav className="navbar">
  
    <div className='nav'>
    <Link to='/'>
      <img src={ loginReturn.URL + "/staticfiles/hospitalimages/" + loginReturn.ImageName} className='main-logo' alt='login'/>
    </Link>

      <li className="nav_list">
        
       <Link to="/" className="nav_link">Home</Link>

       <Link to="/BloodBank" className="nav_link">Blood bank </Link>
       <Link to="/Login" className="nav_link">Login</Link>
       <Link to="/Signup" className="nav_link">Signup</Link>

{(loginReturn.Role === "HospitalAdmin")?

<>
<Link to="/HospitalRegister" className="nav_link">Register Hospital</Link>
       <Link to="/AddServices" className="nav_link">Add Services</Link>
       <Link to="/AddDoctors" className="nav_link">Add Doctors</Link>
       <Link to="/Login" onClick={handleClearData} className="nav_link">{(loginReturn.Role)? <>LogOut</> : <>Login</>}</Link>
</>
: null}
     

      </li>

      
   </div> 
</nav>
</>

  )
}

export default Navbar;

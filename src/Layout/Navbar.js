import React from 'react'
import { Link , useNavigate } from 'react-router-dom'
import './Navbar.css'
import logo from './NavLogo.png';
import { LoginContext } from '../Context/LoginContext';
import { useContext} from 'react';
import menu from '../Assets/Images/userMenu.png'


const Navbar = () => {
  
  const {loginDetails,setLoginDetails} = useContext(LoginContext);

  const navigation = useNavigate();

  const handleLogout = () => {
   
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      // navigation("/Login");
      window.location.href = "/Login";
      setLoginDetails("");
      localStorage.clear();
    } 


  }

  const handleSelectChange=(e)=>{
    if (e.target.value==1){
      navigation("/ManageBloodBank")

    }
    if (e.target.value==2){
      navigation("/ManageAvailableBloods")
    }
  }

  const handleUserProfileChange=(e)=>{
    if (e.target.value==1){
      navigation("/UserProfile")
    }
    if (e.target.value==2){
       handleLogout();
    }

  }



  const handleSearchChange = (e) => {

    setLoginDetails({...loginDetails, SearchBar:e.target.value});

 }

  return (

<>     
<nav className="navbar">

  <div className="top">
		<div>
		 Contact No +977 9842022755  | hospitahari@gmail.com 
		</div>
	</div>

<div className='nav'>
    <Link to='/'>
    <img src={logo} className='main-logo' alt='logo'/>
    </Link>


  
  
{(!loginDetails.RoleId)?

  <li className="nav_list">
      <input type="text" className='searchText' placeholder='search here....' onChange={handleSearchChange} />
       <Link to="/" className="nav_link">Home</Link>
       <Link to="/AboutUs" className="nav_link">About Us</Link>
       <Link to="/HospitalRegister" className="nav_link">Register Hospital</Link>
       <Link to="/ViewServices" className="nav_link">View Services</Link>
       <Link to="/Login" className="nav_link" style={{marginLeft:'10rem'}}>Log in</Link>
       <Link to="/Signup" className="nav_link">Sign up</Link>
      
    </li>
:
null
}


{(loginDetails.RoleId=="1")?

 <li className="nav_list">
   <input type="text" className='searchText' placeholder='search here....' onChange={handleSearchChange}/>
 <Link to="/" className="nav_link" >Home</Link>
 <Link to="/AboutUs" className="nav_link">About Us</Link>
 <Link to="/BloodBank" className="nav_link">Blood bank </Link>
 <Link to="/ViewServices" className="nav_link">View Services</Link>
 <select onChange={handleUserProfileChange} style={{border:'0.1rem solid teal',borderRadius:'0.5rem', color:'teal', marginLeft:'13rem', outLine:'none'}}>
    <option value='0' data-icon=''>Menu</option>
    <option value="1">View Profile</option>

    {(loginDetails.UserId)?  

    <option value="2">Logout</option>

:

<option value="3">Login</option>
}
    
   </select>
    
</li>
:
null

}




{(loginDetails.RoleId=="2")?
 <li className="nav_list">
<Link to="/HospitalAdminDashboard" className="nav_link" >Dashboard</Link>
 <Link to="/AddServices" className="nav_link">Add Services</Link>
 <Link to="/AddDoctors" className="nav_link">Add Doctors</Link>
 <Link to="/DoctorSchedule" className="nav_link">Add Doctor Schedule</Link>
 <Link to="/ViewAppointmentDetails" className="nav_link">View Appointment Details</Link>


                    

  {(loginDetails.UserId)?     
  
  <Link className="nav_link" onClick={handleLogout}style={{marginLeft:'20rem'}}>Log out</Link>
:
<Link to="/Login" className="nav_link">Log in</Link>
}
</li>
:
null
}




{(loginDetails.RoleId=="3")?
 <li className="nav_list">
   <Link to="/AdminDashboard" className="nav_link" style={{marginLeft:'3rem'}}>Dashboard</Link>
   <Link to="/ManageHospital" className="nav_link">Manage Hospital</Link>
   <Link to="/ManageUser" className="nav_link">Manage User</Link>
   <Link to="/ManageContacts" className="nav_link">Manage Contacts</Link>

   <select onChange={handleSelectChange} style={{border:'0.1rem solid teal',borderRadius:'0.5rem', color:'teal',outLine:'none', height:'2rem', marginLeft:'1rem'}}>
    <option value='0'>Select</option>
    <option value="1">Manage Bloodbank</option>
    <option value="2">Manage Available Blood</option>
   </select>
   

  {(loginDetails.UserId)?     
  
  <Link className="nav_link" onClick={handleLogout} style={{marginLeft:'17rem'}}>Log out</Link>
:
<Link to="/Login" className="nav_link">Log in</Link>
}
</li>
:
null
}

   
   

</div>  {/*End of nav div */}
</nav>



</>

  )
}

export default Navbar;

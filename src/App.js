import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Layout/Navbar';
import Home from './Components/Home';
import Bloodbank from './Components/BloodBank'
import BloodDonationForm from './Components/BloodDonationForm';
import ForgotPassword from './Components/ForgotPassword';
import HospitalRegister from './Components/HospitalRegister';
import AddServices from './Components/HospitalAdmin/AddServices';
import Login from './Components/Login';
import Signup from './Components/Signup'
import AddDoctors from './Components/HospitalAdmin/AddDoctors'
import AboutUs from './Components/AboutUs';
import Hospital from './Components/Hospital';
import Doctor from './Components/Doctor';
import Footer from './Components/Footer';
import {LoginContext} from './Context/LoginContext';
import {useState, useEffect} from 'react'
import DoctorSchedule from './Components/HospitalAdmin/AddDoctorSchedule';
import AdminDashboard from './Components/Admin/AdminDashboard';
import ManageHospital from './Components/Admin/ManageHospital';
import ManageUser from './Components/Admin/ManageUser';
import HospitalDashboard from './Components/HospitalAdmin/HospitalAdminDashboard';
import ContactUs from './Components/ContactUs';
import ManageBloodBank from './Components/Admin/ManageBloodBank';
import ManageContacts from './Components/Admin/ManageContacts';
import UserProfile from './Components/UserProfile';
import ManageAvailableBloods from './Components/Admin/ManageAvailableBloods';
import ViewServices from './Components/ViewServices';
import ViewAppointmentDetails from './Components/HospitalAdmin/ViewAppointmentDetails';




function App() {

  const [loginDetails, setLoginDetails]=useState({});
  
  useEffect(() => {
    const items  = JSON.parse(localStorage.getItem("loginDetails"));
    if(items){
     setLoginDetails(items);
    }
    else {
      const obj ={
        URL :'https://localhost:7294',
       }
       setLoginDetails(obj);
       localStorage.setItem("loginDetails",JSON.stringify(obj));
    }

   }, [])

  return (
<div>
  <Router>

  <LoginContext.Provider value={{loginDetails, setLoginDetails}}>

    <Navbar/>

      <Routes>
        
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/BloodBank" element={<Bloodbank/>}/>
        <Route exact path="/BloodDonationForm" element={<BloodDonationForm/>}/>
        <Route exact path="ForgotPassword" element={<ForgotPassword/>}/>
        <Route exact path="/Login" element={<Login/>} /> 
        <Route exact path="/Signup" element={<Signup/>} /> 
        <Route exact path="/HospitalRegister" element={<HospitalRegister/>}/>
        <Route exact path="/AboutUs" element={<AboutUs/>}/>
        <Route exact path="/Hospital/:id" element={<Hospital/>}/>
        <Route exact path="/Doctor/:id" element={<Doctor/>}/>
        <Route exact path="/ContactUs" element={<ContactUs/>}/>
        <Route exact path="/UserProfile" element={<UserProfile/>}/>
        <Route exact path="/ViewServices" element={<ViewServices/> }/>

        <Route exact path="/HospitalAdminDashboard" element={<HospitalDashboard/>}/>
        <Route exact path="/AddServices" element={<AddServices/>}/>
        <Route exact path="/AddDoctors" element={<AddDoctors/>}/>
        <Route exact path="/DoctorSchedule" element={<DoctorSchedule/>}/>
        <Route exact path="/ViewAppointmentDetails" element={<ViewAppointmentDetails/>}/>
    

        <Route exact path="/AdminDashboard" element={<AdminDashboard/>}/>
        <Route exact path="/ManageHospital" element={<ManageHospital/>}/>
        <Route exact path="/ManageUser" element={<ManageUser/>}/>
        <Route exact path="/ManageBloodBank" element={<ManageBloodBank/>}/>
        <Route exact path="/ManageContacts" element={<ManageContacts/>}/>
        <Route exact path="/ManageAvailableBloods" element={<ManageAvailableBloods/>}/>
      


      </Routes>

  </LoginContext.Provider>

  </Router>
  <Footer/>

</div>
   
  );
}

export default App;


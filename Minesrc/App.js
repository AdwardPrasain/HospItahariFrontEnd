import React, {useState, useEffect}  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Layout/Navbar';
import Home from './Components/Home';
import Bloodbank from './Components/BloodBank'
import BloodDonationForm from './Components/BloodDonationForm';
import ForgotPassword from './Components/ForgotPassword';
import HospitalRegister from './Components/HospitalRegister';
import AddServices from './Components/AddServices';
import Login from './Components/Login';
import Signup from './Components/Signup'
import AddDoctors from './Components/AddDoctors'
import { LoginContext } from './Context/LoginContext';


function App() {

  const [loginReturn, setLoginReturn] = useState({});

  useEffect(() => {
    const items  = JSON.parse(localStorage.getItem("LoginReturn"));
    if(items){
     setLoginReturn(items);
    }
   }, [])

  return (
<div>
 
  <Router>
  <LoginContext.Provider value={{loginReturn, setLoginReturn}}>
    <Navbar/>
    <Routes>
    <Route exact path="/" element={<Home/>} />
    <Route exact path="/BloodBank" element={<Bloodbank/>}/>
    <Route exact path="/BloodDonationForm" element={<BloodDonationForm/>}/>
    <Route exact path="ForgotPassword" element={<ForgotPassword/>}/>
    <Route exact path="/Login" element={<Login/>} /> 
    <Route exact path="/Signup" element={<Signup/>} /> 
    <Route exact path="/HospitalRegister" element={<HospitalRegister/>}/>
    <Route exact path="/AddServices" element={<AddServices/>}/>
    <Route exact path="/AddDoctors" element={<AddDoctors/>}/>
   
    </Routes>
    </LoginContext.Provider>
  </Router>

</div>
   
  );
}

export default App;


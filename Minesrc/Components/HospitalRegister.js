import React from 'react'
import '../Assets/CSS/HospitalRegister.css'
import logo from '../Assets/Images/HospItahariLogo.png';
import { useState } from 'react';
import OTPInput from "otp-input-react";
import axios from 'axios';

const HospitalRegister = () => {

  const initialHospitalData ={
    Guid:'',
    Name:'',
    ImageName:'',
    Email:'',
    MobileNo:'',
    RegistrationDate:'',
    City:'',
    District:'',
    Ward:'',
    HealthcareNo:'',
    HospitalType:'',
    Password:'',
    ConfirmPassword:'',
  }



  const [hospitalData, setHospitalData] = useState(initialHospitalData)
  const [chosenFile, setChosenFile] = useState('');  

  const handleHospitalChange =(e) =>{
        e.preventDefault();
        const {name, value} = e.target;
        setHospitalData({...hospitalData,[name]:value});
  }

  const onImageChange = (e) => {
    setChosenFile(e.target.files[0]);
    setHospitalData({ ...hospitalData, ImageName: e.target.files[0].name });
  };

  const onRegisterClick=(e) => {
    e.preventDefault();
    if(!hospitalData.Name){
      alert('Name is empty.');
    }
    // else if(!hospitalData.ImageName){
    //   alert('Image is empty.');
    // }
    else if(!hospitalData.Email){
      alert('Email is empty.');
    }
    else if(!hospitalData.MobileNo){
      alert('Mobile number is empty.')
    }
    else if(!hospitalData.RegistrationDate){
      alert('Registration date is empty.')
    }
    else if(!hospitalData.City){
      alert('City is empty.')
    }
    else if(!hospitalData.District){
      alert('District is empty.')
    } 
    else if(!hospitalData.Ward){
      alert('Ward is empty.')
    }
    else if(!hospitalData.HealthcareNo){
      alert('Healthcare no is empty.')
    }
    else if(!hospitalData.HospitalType){
      alert('Hospital type is empty.')
    }
    else if(!hospitalData.Password){
      alert('Password field is empty.')
    }
    else if(!hospitalData.ConfirmPassword){
      alert('Please re-enter the password.')
    }
    else if(hospitalData.Password!=hospitalData.ConfirmPassword){
      alert('Password didnot matched')
    }
    else{
      postHospitalData();
      //setHospitalData(initialHospitalData);
    }
  }

  
  const onImageUpload =() =>{
    const formData =new FormData();
    formData.set("Image",chosenFile);
    formData.set("ImageName", chosenFile.name);
        formData.set("FolderName", "HospitalImages");

        axios.post('/api/File/FileUpload', formData, {
          headers: {
           'content-type': 'multipart/form-data' // do not forget this 
          }})
    }

  const postHospitalData = async () => {

    setHospitalData({ ...hospitalData, Guid: createGuid() }); 

    const result = await axios.post("/api/Hospital/Registration", hospitalData);


    if(result.data[0].result == "OK"){
      alert("User Created Successfully");
      onImageUpload();
      
    }

    if(result.data[0].result == "BAD"){
        alert("UserName already registered");
      }
    }

  function createGuid () {

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 10 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(10);
    });
}

  const [OTP, setOTP] = useState("");
  const [oTPStatus, setOTPStatus] = useState(true);
  const sendOTPClick =() => {
          setOTPStatus(true);
  }

  
  return (
    <div className='HospitalRegister'>

<p>Already have an account? Click to<a href='./Login'>Login</a></p>

<div className= 'wrapup'>{/*This divison contains overall form of hospial registration form*/}

<div className= 'box1'>  {/*The box1 division contains the logo and heading for registration form of hospital*/}

      <img src={logo} className='main-logo' alt='login'/>
      <h3>Register your hospital as an partner for HospItahari.</h3>
      
</div> {/*End of box1 division*/}


<div className= 'box2'> {/*The box2 division contains the input field and label for registration form of hospital*/}
 

        <div className='first-row'> {/*Ths division contains hospital name and image portion*/}

            <div className='input-box'>
                <label className='lblHname'>Hospital Name</label>  <br/> 
                <input  type="text"  className="hNameInput" name="Name" value={hospitalData.Name} onChange={handleHospitalChange}/>
            </div>

            <div className="photo">
              <label for='inputTag' className='lblImage'>
                Click to insert your photo <br/>
                <i className='fa fa-2x fa-camera'></i>
                <input id='inputTag' type='file' onChange={onImageChange} /><br/>

              <img src='camera.png' className='cam' alt=''/> 
              </label>
            </div>

        </div>{/*End of first-row division*/}

   <div className='same-row'>{/*Ths division contains  and image portion*/}

   <div className='input-box'>
                <label className='lblEmail'>Email</label> <br/> 
                <input  type="email"  className="emailInput" name="Email" value={hospitalData.Email} onChange={handleHospitalChange}/> 
            </div>

            <div className='input-box'>
                <label className='lblNumber'>Contact Number</label> <br/> 
                <input  type='tel'  className="contactInput" name="MobileNo" value={hospitalData.MobileNo} onChange={handleHospitalChange}/> 
            </div>

   </div>{/*End of same-row division*/}
   
          <div className='same-row'> {/*Ths division contains  hospital registered content*/}
            <div className='input-box'>
                <label className='lblHospitalRegistered'>When was your hospital registered?</label> <br/> 
                <input  type="date"  className="registeredDateInput" name="RegistrationDate" value={hospitalData.RegistrationDate} onChange={handleHospitalChange}/> 
            </div>
          </div>{/*End of same-row division*/}


   <div className='fourth-row'>{/*Ths division contains  location content*/}
     <h5>Where are you located at?</h5>
    <div className='same-row1'>
      <div className='input-box'>
             <label className='lblCity'>City</label> <br/> 
             <input  type="text"  className="cityInput" name="City" value={hospitalData.City} onChange={handleHospitalChange}/>
      </div>

      <div className='input-box'>
          <label className='lblDistrict'>Disctrict</label> <br/> 
            <input type="text" className='districtInput' name="District" value={hospitalData.District} onChange={handleHospitalChange}/>                
      </div>

      <div className='inputbox'>
        <label className='lblWard'>Ward</label><br/>
        <input type='number' className='wardInput' name="Ward" value={hospitalData.Ward} onChange={handleHospitalChange}/>
      </div>  
    </div>
      
     
  </div>{/*End of fourth-row division*/}

  <div className='same-row'>{/*Ths division contains healthcare number  and hospital type*/}
          <div className='input-box'>
                <label className='lblhealthCare'>Healthcare Number</label> <br/> 
                <input  type="text"  className="healthCareInput" name="HealthcareNo" value={hospitalData.HealthcareNo} onChange={handleHospitalChange}/> 
            </div>

            <div className='input-box'>
                <label className='lblHospitalType'>Hospital Type</label> <br/> 
               <select className='hospitalTypeInput' name="HospitalType" value={hospitalData.HospitalType} onChange={handleHospitalChange}>              
                <option value="1">Eye hospital</option>
                <option value="2">Teaching hospital</option>
                <option value="3">Private hospital</option>
                <option value="4">District hospital</option>
               </select>
            </div>
  </div>{/*End of same-row division*/}

  <div className='same-row'>{/*Ths division contains  password portion*/}      
           <div className='input-box'>
                <label className='lblSetpassword'>Set Password</label> <br/> 
                <input  type="password"  className="set-passwordInput" name="Password" value={hospitalData.Password} onChange={handleHospitalChange}/> 
            </div>

            <div className='input-box'>
                <label className='lblConfirmpassword'>Confirm Password</label> <br/> 
                <input  type="password"  className="confirm-passwordInput" name="ConfirmPassword" value={hospitalData.ConfirmPassword} onChange={handleHospitalChange}/> 
            </div>
  
  </div>{/*End of same-row division*/} 

        <input type='button' className='otpBtn' onClick={sendOTPClick} value='Send OTP'/> <br/>

    {(oTPStatus)?
      <>
        <div className='otpBox'>            
             <label className='lblOtp'>Enter the OTP code</label><br/>
             <OTPInput className='otpInput' value={OTP} onChange={setOTP} autoFocs OTPLength={4} otpType="number"/>
            </div>

            <input type='button' className='registerButton' value='Register' onClick={onRegisterClick}/>
      </>
        :

        null
    }    
            
           
           
  
</div> {/*End of box2 division*/}
</div> {/*End of wrapup division*/}

    </div>/*End of HospitalRegister division*/
  )
}
export default HospitalRegister
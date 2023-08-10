import React from 'react'
import '../Assets/CSS/HospitalRegister.css'
import logo from '../Assets/Images/HospItahariLogo.png';
import { useState, useEffect } from 'react';
import OTPInput from "otp-input-react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const HospitalRegister = () => {

  const initialUserData ={
    FullName:'',
    Address:'',
    PhoneNumber:'',
    Email:'',
    Password:'',
    ConfirmPassword:'',
    RoleId:'2'
  }

  const initialHospitalData ={
    HospitalName:'',
    ImageName:'',
    Map:'',
    RegistrationDate:'',
    HealthcareNumber:'',
    HospitalType:'',
    PhoneNumber:'',
  }


  const [userData, setUserData] = useState(initialUserData)

  const [hospitalData, setHospitalData] = useState(initialHospitalData)

  const [chosenFile, setChosenFile] = useState(''); 

  const [OTP, setOTP] = useState("");

  const [oTPStatus, setOTPStatus] = useState(false);

  const [oTPCode, setOTPCode] = useState('');

 const [isNotError,setNotError]= useState(false);

    const  validateOTP = async() => {
        validation(1);
      }
  
  const handleUserChange =(e) =>{
    e.preventDefault();
    const {name, value} = e.target;
    setUserData({...userData,[name]:value});
}


const handlePhoneNumberChange =(e) =>{
  e.preventDefault();
  const {name, value} = e.target;
  setUserData({...userData,[name]:value});
  setHospitalData({...hospitalData,[name]:value});
}


  const handleHospitalChange =(e) =>{
        e.preventDefault();
        const {name, value} = e.target;
        setHospitalData({...hospitalData,[name]:value});
  }


  const onImageChange = (e) => {
    setChosenFile(e.target.files[0]);
    setHospitalData({ ...hospitalData, ImageName: e.target.files[0].name });
  };

  const onImageUpload =() =>{
    const formData =new FormData();
    formData.set("Image",chosenFile);
    formData.set("ImageName", chosenFile.name);
        formData.set("FolderName", "HospitalImages");

        axios.post('https://localhost:7294/api/File/FileUpload', formData, {
          headers: {
           'content-type': 'multipart/form-data' // do not forget this 
          }})
    }

   
    useEffect(()=>{ 
      setOTPCode(randomNumberInRange(1, 10));
       
  },[])
    const sendOTPClick = async() => {
    
            setOTPStatus(true);
            setNotError(false);
            toast.success("AN OTP has been send to your Email address");
  
            var otpObject  ={
                To: userData.Email,
                Subject: "AN OTP",
                Body: `Your OTP Code of hospital registration for hospitahari is ${oTPCode}`
            }
    
        
            const result = await axios.post("https://localhost:7294/api/HospItahariEmail/HospItahariEmail", otpObject);
    
      
        if(result.status == 200){
    
        }
    }
  
    function randomNumberInRange(min, max) {
      //  get number between min (inclusive) and max (inclusive)
      return (Math.floor(100000 + Math.random() * 900000));
    }


  const onRegisterClick=(e) => {
    e.preventDefault();
    validation(2);
  }

  const emailPattern =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  const validation = (check) =>{
    if(!userData.FullName){
      toast.info(' User Name is empty.');
    }
   
    else if(!hospitalData.HospitalName){
      toast.info('Hospital Name is empty.');
    }

    else if(!userData.Address){
      toast.info('Addresss is empty.')
    }

    else if(!userData.Email){
      toast.info('Email is empty.');
    }

   else if (!emailPattern.test(userData.Email)) {
      toast.error('Your email is invalid.');
    }


    else if(!userData.PhoneNumber){
      toast.info('Mobile number is empty.')
    }
    
    else if(userData.PhoneNumber.length != 10 ){
      toast.error('Phone number should of 10 digit.')
  }
    else if(!hospitalData.RegistrationDate){
      toast.info('Registration date is empty.')
    }
   
    else if(!hospitalData.HealthcareNumber){
      toast.info('Healthcare no is empty.')
    }
    else if(!hospitalData.HospitalType){
      toast.info('Please select hospital type.')
    }
    else if(!userData.Password){
      toast.info('Password field is empty.')
    }
    else if(userData.Password.length < 8){
      toast.info('Password should be of 8 character long')
  }
    else if(!userData.ConfirmPassword){
      toast.info('Please re-enter the password.')
    }
    else if(userData.Password!=userData.ConfirmPassword){
      toast.error("Your password didn't matched with previous password")
    }
   
  else if(check==1 && isNotError=== false){

    setNotError(true);
  }

  else if(check==2){
    if(OTP != oTPCode){ 
      toast.error("OTP is Incorrect.");
    }

  
    else{
      postUserData();
      //setHospitalData(initialHospitalData);
    }
  }
  }

  useEffect(()=>{
    if(isNotError){
      sendOTPClick ();
    }
  },[isNotError])
  

  const postHospitalData = async () => {

    const result = await axios.post("https://localhost:7294/api/Hospital/HospitalRegistrationInsert", hospitalData);

    console.log(result)
  
    if(result.data == "1"){
      toast.success("Hospital has been registered successfully");
      setHospitalData(initialHospitalData);
      setUserData(initialUserData);
      setOTP("");
      onImageUpload();
    }

    else{
        toast.error("An internal error ocured");
      }
    }

  const postUserData = async () => {
    const result = await axios.post("https://localhost:7294/api/User/UserRegistrationInsert", userData);   
  
    if(result.data[0].result == "OK"){
      postHospitalData();

    }
    if(result.data[0].result == "BAD"){
      toast.error("Your phone number has already been registered to the system. Try registering with  different number.");
    }
  }

 
  return (
    <div className='HospitalRegister'>
           <ToastContainer/>

<p>Already have an account? Click to<a href='./Login'>Login</a></p>

<div className= 'wrapup'>{/*This divison contains overall form of hospial registration form*/}

<div className= 'box1'>  {/*The box1 division contains the logo and heading for registration form of hospital*/}

      <img src={logo} className='main-logo' alt='login'/>
      <h3>Register your hospital as an partner for HospItahari.</h3>
      
</div> {/*End of box1 division*/}


<div className= 'box2'> {/*The box2 division contains the input field and label for registration form of hospital*/}
 

        <div className='first-row'> {/*Ths division contains hospital name and image portion*/}

            <div className='input-box'>
                <label className='lblUname'>User Name</label>  <br/> 
                <input  type="text"  className="uNameInput" name="FullName" value={userData.FullName} onChange={handleUserChange}/>
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


        <div className='same-row'>{/*Ths division contains  hospital name and address*/}
              <div className='input-box'>
                  <label className='lblHname'>Hospital Name</label>  <br/> 
                  <input  type="text"  className="hNameInput" name="HospitalName" value={hospitalData.HospitalName} onChange={handleHospitalChange}/>
              </div>


            <div className='input-box'>
              <label className='lblAddress'>Address</label><br/>
              <input type='text' className='addressInput' name="Address" value={userData.Address} onChange={handleUserChange}/>
            </div>

      </div>{/*End of address and hospital name division*/}

      <div className='locationMap'>
        <p id='mapLink'><a href="https://www.google.com.np/maps/" target="_blank" className='iFrame'>Click to generate your location iframe</a></p>
        <input type='text' className='mapInput' name="Map" placeholder='please insert your iframe' value={userData.Map} onChange={handleHospitalChange}/>
      </div>

   <div className='same-row'>{/*Ths division contains  and image portion*/}

   <div className='input-box'>
                <label className='lblEmail'>Email</label> <br/> 
                <input  type="email"  className="emailInput"  placeholder="Your hospital email" name="Email" value={userData.Email} onChange={handleUserChange}/> 
                
            </div>

            <div className='input-box'>
                <label className='lblNumber'>Contact Number</label> <br/> 
                <input  type='tel'  className="contactInput" name="PhoneNumber" value={userData.PhoneNumber} onChange={handlePhoneNumberChange}/> 
            </div>

   </div>{/*End of same-row division*/}

          <div className='same-row'> {/*Ths division contains  hospital registered content*/}
            <div className='input-box' style={{marginTop:"1.5rem", paddingBottom:'1.5rem'}}>
                <label className='lblHospitalRegistered'>When was your hospital registered?</label> <br/> 
                <input  type="date"  className="registeredDateInput" name="RegistrationDate" value={hospitalData.RegistrationDate} onChange={handleHospitalChange}/> 
            </div>
          </div>{/*End of same-row division*/}

  <div className='same-row'>{/*Ths division contains healthcare number  and hospital type*/}
          <div className='input-box'>
                <label className='lblhealthCare'>Healthcare Number</label> <br/> 
                <input  type="text"  className="healthCareInput" name="HealthcareNumber" value={hospitalData.HealthcareNumber} onChange={handleHospitalChange}/> 
            </div>

            <div className='input-box'>
                <label className='lblHospitalType'>Hospital Type</label> <br/> 
               <select className='hospitalTypeInput' name="HospitalType" value={hospitalData.HospitalType} onChange={handleHospitalChange}>              
                <option value="0">Select</option>
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
                <input  type="password"  className="set-passwordInput" name="Password" value={userData.Password} onChange={handleUserChange}/> 
            </div>

            <div className='input-box'>
                <label className='lblConfirmpassword'>Confirm Password</label> <br/> 
                <input  type="password"  className="confirm-passwordInput" name="ConfirmPassword" value={userData.ConfirmPassword} onChange={handleUserChange}/> 
            </div>
  
  </div>{/*End of same-row division*/} 

        <input type='button' className='otpBtn' onClick={validateOTP} value='Send OTP'/> <br/>

    {(oTPStatus)?
      <>
        <div className='otpBox'>            
             <label className='lblOtp'>Enter the OTP code</label><br/>
             <OTPInput className='otpInput' value={OTP} onChange={setOTP} autoFocs OTPLength={6} otpType="number"/>
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
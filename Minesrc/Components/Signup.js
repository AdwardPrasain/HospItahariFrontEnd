import React from 'react'
import '../Assets/CSS/Signup.css'
import logo from '../Assets/Images/HospItahariLogo.png'
import {useState} from 'react'
import OTPInput from "otp-input-react"
import axios from 'axios'

const Signup = () => {

    //  creating object for user data
    const initialUserData ={
        Guid:'',
        FullName:'',
        Address:'',
        MobileNo:'',
        Email:'',
        Password:'',
        ConfirmPassword:'',
    }

    const [userData, setUserData]= useState(initialUserData) 

    const [OTP, setOTP] = useState('');
    const [oTPCode, setOTPCode] = useState('');

    const [oTPStatus, setOTPStatus] = useState(false);

   
    const sendOTPClick = async() => {
        setOTPCode(randomNumberInRange(1, 10));

        alert(userData.MobileNo);

        const result  = await axios("v2/sms?from=infosms&to=" + userData.MobileNo + "&text=Username is:" + userData.MobileNo + " and OTP:" + oTPCode + "" + "&token=v2_Q46DEu1Wp3OxtXTeaj9iEa3W8NE.XGji", {
            method: 'GET',
            mode: 'no-cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers' : '*',
              'Content-Type': 'application/json',
              Accept: "application/json",
            },
            withCredentials: true,
            credentials: 'same-origin',
          }).then(response => {
          })

        console.log(result);
        setOTPStatus(true);
    }


    function randomNumberInRange(min, max) {
        // 👇️ get number between min (inclusive) and max (inclusive)
        return Math.floor((Math.random()*1000000)+1);
      }


    const onRegisterClick=(e) =>{
        e.preventDefault();
        if(!userData.FullName){
            alert('Full name is empty');
        }

        else if(!userData.Address){
            alert('Address is empty');
        }

        else if(!userData.MobileNo){
            alert('Mobile number is empty');
        }

        else if(!userData.Email){
            alert('Email is empty');
        }

        else if(!userData.Password){
            alert('Please  insert the password');
        }

        else if(!userData.ConfirmPassword){
            alert('Please  re-enter the password');
        }

        else if( userData.Password!=userData.ConfirmPassword){
            alert('Not  matched ');
        }

        else{
            postUserData();  
        }
    }


    const postUserData = async () => {

        setUserData({ ...userData, Guid: createGuid() }); 
       
        const result = await axios.post("https://localhost:7054/api/User/Registration", userData);
        
        if(result.data[0].result == "OK"){
          alert("UserName Created Successfully");
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
    


    const handleUserChange =(e) =>{
        e.preventDefault();
        const {name, value} = e.target;
        setUserData({...userData,[name]:value});
    }

  return (
    <div className='Signup'>
      <p>Already have an account? Click to<a href="./Login">Login</a></p>

    <div className='wrapup'> {/*This  is the wrapup div and covers all of the portion of signup form*/}

        <div className='box1'>{/*The box1 division contains the logo of hospItahari*/}
            <img src={logo} className='main-logo' alt='signup'/>
            <h3 className='signupContent'>Please fill the form to register as an user.</h3>
        </div>{/*End of box1 division*/}

        
        <div className= 'box2'> {/*The box2 division contains the input field and label for signup form*/}

        <div className='top-row'> {/*Ths division contains full name and address portion*/}
            <div className='input-box'>
                <label className='lblFname'>Full Name</label>  <br/> 
                <input  type="text"  className="fullnameInput" name='FullName'  value={userData.FullName} onChange={handleUserChange}/>
            </div>

            <div className='input-box'>
                <label className='lblAddress'>Address</label> <br/> 
                <input  type="text"  className="addressInput" name='Address' value={userData.Address} onChange={handleUserChange}/> 
            </div>
        </div>{/*End of top-row division*/}


        <div className='middle-row'>{/*Ths division contains phone number and email*/}
            <div className='input-box'>
                <label className='lblNumber'>Phone Number</label> <br/> 
                <input  type='tel'  className="numberInput" name='MobileNo' value={userData.MobileNo} onChange={handleUserChange}/> 
            </div>

            <div className='input-box'>
                <label className='lblEmail'>Email</label> <br/> 
                <input  type="email"  className="emailInput" name='Email' value={userData.Email} onChange={handleUserChange}/> 
            </div>
        </div>{/*End of middle-row division*/}

        <div className='last-row'> {/*Ths division contains password portion*/}     
           <div className='input-box'>
                <label className='lblSetpassword'>Set Password</label> <br/> 
                <input  type="password"  className="set-passwordInput" name='Password' value={userData.Password} onChange={handleUserChange}/> 
            </div>

            <div className='input-box'>
                <label className='lblConfirmpassword'>Confirm Password</label> <br/> 
                <input  type="password"  className="confirm-passwordInput" name='ConfirmPassword' value={userData.ConfirmPassword} onChange={handleUserChange}/> 
            </div>
        </div>{/*End of last-row division*/}
     
        <input type='button' className='otpBtn' onClick={sendOTPClick} value='Send OTP'/> <br/>

    {(oTPStatus)?
        <>
            <div className='otpBox'>            
                <label className='lblOtp'>Enter the OTP code</label><br/>
                 <OTPInput className='otpInput' value={OTP} onChange={setOTP} autoFocs OTPLength={4} otpType="number" />
            </div>
                <input type='button' className='registerButton' value='Register' onClick={onRegisterClick}/>
        </>
        :
        null
    }
        </div> {/*End of box2 division*/}

    </div> {/*End of  wrapup division*/}

    </div>
  )
}

export default Signup
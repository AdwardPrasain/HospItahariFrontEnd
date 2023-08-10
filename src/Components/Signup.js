import React, { useEffect } from 'react'
import '../Assets/CSS/Signup.css'
import logo from '../Assets/Images/HospItahariLogo.png'
import {useState} from 'react'
import OTPInput from "otp-input-react"
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Signup = () => {

    //  creating object for user data
        const initialUserData ={
        FullName:'',
        Address:'',
        PhoneNumber:'',
        Email:'',
        Password:'',
        ConfirmPassword:'',
        RoleId:'1',
    }

    const [userData, setUserData]= useState(initialUserData) 
    const navigate = useNavigate();
    const [OTP, setOTP] = useState('');
    const [oTPCode, setOTPCode] = useState('');
    const [oTPStatus, setOTPStatus] = useState(false);

    
    useEffect(()=>{ 
        setOTPCode(randomNumberInRange(1, 10));
         
    },[])

    
   
    const sendOTPClick = async() => {

        if(!userData.Email){
            alert("You have to insert your email first to get OTP code")
        }
  
        setOTPStatus(true);
        toast.success("An OTP has been send to your Email address");

        var otpObject  ={
            To: userData.Email,
            Subject: "AN OTP",
            Body: `Your OTP Code of user registration for hospitahari is ${oTPCode}`
        }

    
        const result = await axios.post("https://localhost:7294/api/HospItahariEmail/HospItahariEmail", otpObject);

  
    if(result.status == 200){

    }


    }


    function randomNumberInRange(min, max) {
        //  get number between min (inclusive) and max (inclusive)
        return (Math.floor(100000 + Math.random() * 900000));
      }

    
      const emailPattern =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    const onRegisterClick=(e) =>{


        e.preventDefault();
        if(!userData.FullName){
            toast.info('Full name is empty');
        }

        else if(!userData.Address){
            toast.info('Address is empty');
        }

        else if(!userData.PhoneNumber){
            toast.info('Phone number is empty');
        }

        else if(userData.PhoneNumber.length != 10 ){
            toast.error('Phone number should of 10 digit.')
        }

        else if(!userData.Email){
            toast.info('Email is empty');
        }

        else if (!emailPattern.test(userData.Email)) {
            toast.error('Your email is invalid.');
          }

            
        else if(!userData.Password){
            toast.info('Please  insert the password');
        }

        else if(userData.Password.length < 8){
            toast.info('Password should be of 8 character long')
        }

        else if(!userData.ConfirmPassword){
            toast.info('Please  re-enter the password');
        }

        else if( userData.Password!=userData.ConfirmPassword){
            toast.error("Your passowrd didn't  matched ");
        }
        else if(OTP != oTPCode){
            toast.error("OTP didn't matched");
        }

        else{ 
            postUserData();  
              
        }
    }


    const postUserData = async () => {

        const result = await axios.post("https://localhost:7294/api/User/UserRegistrationInsert", userData);
        
        if(result.data[0].result == "OK"){
            if(toast.success("User has been registered Successfully"))
            {
                setUserData(initialUserData);
                navigate('/Login');
            }
        }

        if(result.data[0].result == "BAD"){
            toast.error("Your phone number has already been registered to the system. Try registering with  different number.");
          }
      }


    const handleUserChange =(e) =>{
        e.preventDefault();
        const {name, value} = e.target;
        setUserData({...userData,[name]:value});
    }

  return (

    <div className='Signup'>
     <ToastContainer/>
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
                <input  type='tel'  className="numberInput" name='PhoneNumber' value={userData.PhoneNumber} onChange={handleUserChange}/> 
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
     
        <input type='button' className='otpBtn'  onClick={sendOTPClick} value='Send OTP'/> <br/>

    {(oTPStatus)?
        <>
            <div className='otpBox'>            
                <label className='lblOtp'>Enter the OTP code</label><br/>
                 <OTPInput className='otpInput' value={OTP} onChange={setOTP} autoFocs OTPLength={6} otpType="number" />
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

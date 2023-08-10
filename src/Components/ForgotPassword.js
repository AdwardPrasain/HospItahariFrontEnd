import React from 'react'
import '../Assets/CSS/ForgotPassword.css'
import logo from '../Assets/Images/HospItahariLogo.png';
import {useState,useEffect,useContext} from 'react'
import axios from 'axios';
import OTPInput from "otp-input-react";
import { LoginContext } from '../Context/LoginContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ForgotPassword = () => {

  const {loginDetails,setLoginDetails} = useContext(LoginContext);
 
  const initialValues = {
    Email:'',
    Password:'',
    ConfirmPassword:''
  }

  const [forgotData, setForgotData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [OTP, setOTP] = useState('');
    const [oTPCode, setOTPCode] = useState('');
    const [oTPStatus, setOTPStatus] = useState(false);

    
    useEffect(() => {
      setOTPCode(randomNumber(1, 10));
    }, []);
  
    const sendOTPClick = async (e) => {
    
      e.preventDefault();
    
      setErrors(validate(forgotData));
      setOTPStatus(true);
  
      if (Object.keys(errors).length) {
        toast.success("OTP has been sent to your mail");
      }
      var obj = {
        To: forgotData.Email,
        Subject: "OTP Notification",
        Body: `Your OTP Code for changing password is ${oTPCode}`,
      };
  
console.log(obj);

      const result = await axios.post(
        loginDetails.URL +"/api/HospItahariEmail/HospItahariEmail",
        obj
      );
  
      if (result.status == 200) {
      }
    };
  
    function randomNumber(min, max) {
      return Math.floor(100000 + Math.random() * 900000);
    }
  
    const postRegisterData = async () => {

      if (OTP != oTPCode) {
        toast.error("OTP not matched");
      } else {
        // console.log(forgotData);
        const result = await axios.post(loginDetails.URL +`/api/ForgotPassword/UserForgetPassword`, forgotData);
  
        // console.log(result);
  
        if (result.data[0].result == "OK") {
          toast.success("Your password has been updated successfully");
          setIsSubmit(false);
          setForgotData(initialValues);
        } else if (result.data[0].result == "BAD") {
          toast.info("This password already exists");
        }
      }
    };
  
    const handleChange = (e) => {

      const { name, value } = e.target;
      setForgotData({ ...forgotData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setErrors(validate(forgotData));
      setIsSubmit(true);
    };
  
    useEffect(() => {
      if (Object.keys(errors).length === 0 && isSubmit) {
        postRegisterData();
      }
    }, [errors, forgotData, isSubmit]);
  

  
    const validate = (values) => {
    
      const errors = {};
      const emailPattern =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!values.Email) {
      
        errors.Email = "Please Enter Email!";
      } else if (!emailPattern.test(values.Email)) {
        errors.Email = "Enter Valid Email";
      }
  
      if (!values.Password) {
        errors.Password = "Password is required!";
      }
  
      if (!values.ConfirmPassword) {
        errors.ConfirmPassword = "ConfirmPassword is required!";
      } else if (values.Password != values.ConfirmPassword) {
        errors.ConfirmPassword = "Password didnot matched";
      }
  
      return errors;
  };



  return (
    <div>
      <ToastContainer/>
    <div className='forgotPassword'>
   
        <div className= 'box1'> {/*The box1 division contains the logo of hospItahari*/}
        <img src={logo} className='main-logo' alt='login'/>

  
        <h3 className='forgotPasswordContent'>Create new password to login.</h3>
       
      </div> {/*End of box1 division*/}


      <div className= 'box2'> {/*The box2 division contains the input field and label for login form*/}

        <div className='input-box'>
        <label className='lblUsername'>Email</label>  <br/> 
        <input  type="text"  className="forgotPasswordInput" name="Email" value={forgotData.Email} onChange={handleChange}/>
        </div>

        <input type='button' className='otpBtn' onClick={sendOTPClick} value='Send OTP'/> <br/>

    {(oTPStatus)?
      <>
          <div className='otpBox'>            
             <label className='lblOtp'>Enter the OTP code</label><br/>
             <OTPInput className='otpInput' value={OTP} onChange={setOTP} autoFocs OTPLength={6} otpType="number" />
            </div>

      <div className='passwordRow' style={{display:'flex', flexDirection:'column'}}> 
          <div className='input-box'>
            <label className='lblPassword'>Create new Password</label> <br/> 
            <input  type="password"  className="forgotPasswordInput" name="Password"  value={forgotData.Password} onChange={handleChange}/> 
            </div>

            <div className='input-box'>
            <label className='lblPassword2'>Re-enter the Password</label> <br/> 
            <input  type="password"  className="forgotPasswordInput" name="ConfirmPassword"  value={forgotData.ConfirmPassword} onChange={handleChange}/> 
            </div>
      </div>
        

          <input type='button' className='submitButton' value='submit' onClick={handleSubmit}/>
       
      </>
      :
      null
    }
        
      </div> {/*End of box2 division*/}
      
      </div>

    </div>
  )
}

export default ForgotPassword
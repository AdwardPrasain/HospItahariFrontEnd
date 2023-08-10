import React from 'react'
import '../Assets/CSS/ForgotPassword.css'
import logo from '../Assets/Images/HospItahariLogo.png';
import {useState} from 'react'
import OTPInput from "otp-input-react";

const ForgotPassword = () => {
  const [OTP, setOTP] = useState("");

  const [oTPStatus, setOTPStatus] = useState(false);
  const sendOTPClick = () =>{
    setOTPStatus(true); 
  }

  return (
    <div className='forgotPassword'>

        <div className= 'box1'> {/*The box1 division contains the logo of hospItahari*/}
        <img src={logo} className='main-logo' alt='login'/>

  
        <h3 className='forgotPasswordContent'>Create new password to login.</h3>
       
      </div> {/*End of box1 division*/}


      <div className= 'box2'> {/*The box2 division contains the input field and label for login form*/}

        <div className='input-box'>
        <label className='lblUsername'>Username</label>  <br/> 
        <input  type="text"  className="forgotPasswordInput" name="username"/>
        </div>

        <input type='button' className='otpBtn' onClick={sendOTPClick} value='Send OTP'/> <br/>

    {(oTPStatus)?
      <>
          <div className='otpBox'>            
             <label className='lblOtp'>Enter the OTP code</label><br/>
             <OTPInput className='otpInput' value={OTP} onChange={setOTP} autoFocs OTPLength={4} otpType="number" />
            </div>

            <div className='input-box'>
        <label className='lblPassword'>Create new Password</label> <br/> 
        <input  type="password"  className="forgotPasswordInput" name="password"/> 
        </div>

        <div className='input-box'>
        <label className='lblPassword2'>Re-enter the Password</label> <br/> 
        <input  type="password"  className="forgotPasswordInput" name="password"/> 
        </div>

          <input type='button' className='submitButton' value='submit'/>
       
      </>
      :
      null
    }

      
  
          
        
      </div> {/*End of box2 division*/}
    </div>
  )
}

export default ForgotPassword
import React from 'react'
import '../Assets/CSS/Login.css'
import logo from '../Assets/Images/HospItahariLogo.png';
import {useEffect, useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { LoginContext } from '../Context/LoginContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const [values, setValues] = useState({
      Role:'',
      PhoneNumber:'',
      Password:'',
    })

    const navigate = useNavigate();
    const [errors, setError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);
    const {loginDetails, setLoginDetails} = useContext(LoginContext);

    function handleChange(e) {
      setValues({...values, [e.target.name]: e.target.value})
    }

    const validation = (values) => {
      let errors = {}

      if (!values.PhoneNumber) {
        errors.PhoneNumber= "Insert your contact number"
      }
      else if(values.PhoneNumber.length < 5) {
        errors.PhoneNumber = "Name must be more than 5 char"
      }

      if (!values.Password) {
        errors.Password= "Password Required"
      }
      else if(values.Password.length < 8) {
        errors.Password = "Password must be more than 8 char"
      }
      else {
        setIsSubmit(true);
      }
  
      return errors;
    
    }
 

    function handleSubmit(e) {
      e.preventDefault();
     setError(validation(values));
    }

    useEffect(()=> {
      if(Object.keys(errors).length === 0 && isSubmit === true){
        doLogin();
      }
    },[errors]);
    
    const doLogin = () => {
     
      axios.post('https://localhost:7294/api/Login/Login', values)
      .then(function (response) {
        if (response.data.length){
         
          const obj ={
            URL :'https://localhost:7294',
            UserId: response.data[0].userId,
            HospitalId: response.data[0].hospitalId,
            FullName: response.data[0].fulllName,
            PhoneNumber: response.data[0].phoneNumber,
            RoleId: response.data[0].roleId,
            SearchBar:'',
            ConsulationFee: ''
           }
           setLoginDetails(obj);
           localStorage.setItem("loginDetails",JSON.stringify(obj));
          
          console.log(obj);
          
          setIsSubmit(false);
    
           if (obj.RoleId==1){
            navigate("/")
           }
           else if (obj.RoleId==2){
            navigate("/HospitalAdminDashboard")
           }

           else if (obj.RoleId==3){
            navigate("/AdminDashboard")
           }
         } 
        
         else {
          toast.error("Login Denied")
         }
        
        
      })
      .catch(function (error) {
        console.log(error);
      });
      
      }
  

  return (

<div>
  <ToastContainer/>
    <div className= 'login'> {/*This is the main div and covers all of the portion of login form*/}
   

      <div className= 'box1'> {/*The box1 division contains the logo of hospItahari*/}
        <img src={logo} className='main-logo' alt='login'/>


        <h3 className='loginContent'>Haven't registered yet?</h3>

        <Link to={'/Signup'}>
        <input type='button' className='sign-upButton' value='Sign-up'/>
        </Link>
      </div> {/*End of box1 division*/}

   
      <div className= 'box2'> {/*The box2 division contains the input field and label for login form*/}

        
        <div className='input-box'>
        <label className='lblPhoneNumber'>Phone Number</label>  <br/> 
        <input  type="text"  className="loginInput" value={values.PhoneNumber} name="PhoneNumber" onChange={handleChange}/>
        {errors.PhoneNumber && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'-5rem',}}>{errors.PhoneNumber}</p>}
        </div><br/>
       
        <div className='input-box'>
        <label className='lblPassword'>Password</label> <br/> 
        <input  type="Password"  className="loginInput" value={values.Password} name="Password" onChange={handleChange}/> 
        {errors.Password && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'-5rem',}}>{errors.Password}</p>}
        </div>
        <p><a href="./ForgotPassword">Forgot Password?</a></p>

          <input type='button' className='loginButton' value='Login' onClick={handleSubmit}/>
          
        
      </div> {/*End of box2 division*/}
    </div> {/*End of main login division*/}
    </div>
    
  )
}

export default Login;
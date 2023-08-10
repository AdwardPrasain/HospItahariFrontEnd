import React from 'react'
import '../Assets/CSS/Login.css'
import logo from '../Assets/Images/HospItahariLogo.png';
import {useEffect, useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { LoginContext } from '../Context/LoginContext';

const Login = () => {
    const [values, setValues] = useState({
      Role:'',
      MobileNo:'',
      Password:'',
    })

    const {loginReturn, setLoginReturn} = useContext(LoginContext);

    const navigate = useNavigate();
    
    const [errors, setError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);

    function handleChange(e) {
      setValues({...values, [e.target.name]: e.target.value})
    }

    const validation = (values) => {
      let errors = {}

      if (!values.MobileNo) {
        errors.MobileNo= "Insert your contact number"
      }
      else if(values.MobileNo.length < 5) {
        errors.MobileNo = "Name must be more than 5 char"
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
     
      axios.post('/api/Login/Login', values)
      .then(function (response) {
      
      const obj ={
      URL :'https://localhost:7054',
      Role : values.Role,
      Name : response.data[0].name,
      MobileNo : response.data[0].mobileNo,
      Guid : response.data[0].guid,
      Address: response.data[0].address,
      Email :response.data[0].email,
      ImageName : response.data[0].imageName
}
  
        setLoginReturn(obj);
        console.log(obj);
        localStorage.setItem("LoginReturn",JSON.stringify(obj));
        
        setIsSubmit(false);
    
        navigate('/');
        
      })
      .catch(function (error) {
        console.log(error);
      });
      
      }
  

  return (



    <div className= 'login'> {/*This is the main div and covers all of the portion of login form*/}

      <div className= 'box1'> {/*The box1 division contains the logo of hospItahari*/}
        <img src={logo} className='main-logo' alt='login'/>


        <h3 className='loginContent'>Haven't registered yet?</h3>

        <Link to={'/Signup'}>
        <input type='button' className='sign-upButton' value='Sign-up'/>
        </Link>
      </div> {/*End of box1 division*/}


      <div className= 'box2'> {/*The box2 division contains the input field and label for login form*/}

        <div className='input-boxx'>
          <label className='lblUsername'>Login as an</label>  <br/> 
          <select className='role' value={values.Role} onChange={handleChange} name='Role'>
            <option value='Select'> Select</option>
            <option value='User'>User</option>
            <option value='HospitalAdmin'>HospitalAdmin</option>
          </select>
        </div>
        <div className='input-box'>
        <label className='lblUsername'>Username</label>  <br/> 
        <input  type="text"  className="loginInput" value={values.MobileNo} name="MobileNo" onChange={handleChange}/>
        {errors.MobileNo && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'-5rem',}}>{errors.MobileNo}</p>}
        </div><br/>
       
        <div className='input-box'>
        <label className='lblPassword'>Password</label> <br/> 
        <input  type="Password"  className="loginInput" value={values.Password} name="Password" onChange={handleChange}/> 
        {errors.Password && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'-5rem',}}>{errors.Password}</p>}
        </div>
        <p><a href="./ForgotPassword">Forgot Password?</a></p>

          <input type='button' className='loginButton' value='Login' onClick={handleSubmit}/>
          
        
      </div> {/*End of box2 division*/}
    </div> /*End of main login division*/
   
    
  )
}

export default Login;
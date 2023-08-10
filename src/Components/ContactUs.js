import React, {useContext, useEffect, useState} from 'react'
import '../Assets/CSS/ContactUs.css'
import axios from 'axios'
import { LoginContext,  } from '../Context/LoginContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {

    const initialContactUsData = {
        FullName: '',
        Email: '',
        PhoneNumber: '',
        Message: '',
        
    }

    const {loginDetails,setLoginDetails} = useContext(LoginContext);
    const [contactUsData, setContactUsData] = useState(initialContactUsData);
    const [errors, setError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);


    const validation = (values) => {
        let errors = {}
  
        if (!values.FullName) {
          errors.FullName= "Please insert your full name."
        }
        else if (!values.Email){
            errors.Email = "Please insert your email."
        }
        else if (!values.PhoneNumber){
            errors.PhoneNumber = "Please insert your phonenumber."
        }
        else if(values.PhoneNumber.length != 10 ){
            errors.PhoneNumber = 'Phone number should be of 10 digit.'
        }
        else if(!values.Message) {
          errors.Message = "Please insert your message."
        }
        else {
          setIsSubmit(true);
        }
    
        return errors;  
      }

      useEffect(()=> {
        if(Object.keys(errors).length === 0 && isSubmit === true){
          postContactUsData();
        }
      },[errors]);
      

    const handleContactUsChange = (e) =>{
        e.preventDefault();
        const {name, value} = e.target;
        setContactUsData({...contactUsData,[name]:value});
    }
    

    const onSbumitClick = (e) =>{
        e.preventDefault();
        setError(validation(contactUsData));
    }

    const postContactUsData = async (e) =>{
        const result = await axios.post(loginDetails.URL + '/api/ContactUs/ContactUsInsert', contactUsData)
       

        if(result.data == 1) {
            toast.success("Your message has been sent.")
            setContactUsData(contactUsData);
            setIsSubmit(false);
            setContactUsData(initialContactUsData);
        }
        else{
            toast.error("Failed to send message!")
        }

    }


  return (
    <div className='ContactUs'>
        <ToastContainer/>
        <div className="body">
        
    <div className="box">
        
        <div className="container">
            
            <div className="info">
                <h3 className="head" style={{marginleft:"5px;"}}>Get in touch</h3>
                <div className="content-info">
                    <div className="information">
                        <span className="icon"><svg xmlns="http://www.w3.org/2000/svg"><path d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12c0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4z" fill="teal"/></svg></span>
                        <p style={{marginTop:"10px;", color:'teal'}}>Itahari, Nepal</p>
                    </div>
                     <div className="information">
                        <span className="icon"><svg xmlns="http://www.w3.org/2000/svg"><path fill="teal" d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.67 2L12 10.75L5.67 6zM19 18H5a1 1 0 0 1-1-1V7.25l7.4 5.55a1 1 0 0 0 .6.2a1 1 0 0 0 .6-.2L20 7.25V17a1 1 0 0 1-1 1z"/></svg></span>
                        <p style={{marginTop:"10px", color:'teal'}}>hospitahari@gmail.com</p>
                    </div>
                     <div className="information">
                        <span className="icon"><svg xmlns="http://www.w3.org/2000/svg"><path d="M20.487 17.14l-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66c-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39z" fill="teal"/></svg></span>
                        <p style={{marginTop:"10px", color:'teal'}}>9842022755</p>
                    </div>
                </div>
                <div className="socials">
                    <h3 className="head">Connect with us:</h3>
                    <div className="socials-icon">
                        <a href="https://www.facebook.com/sushan.rayamajhi.1">
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 12.067C0 18.033 4.333 22.994 10 24v-8.667H7V12h3V9.333c0-3 1.933-4.666 4.667-4.666c.866 0 1.8.133 2.666.266V8H15.8c-1.467 0-1.8.733-1.8 1.667V12h3.2l-.533 3.333H14V24c5.667-1.006 10-5.966 10-11.933C24 5.43 18.6 0 12 0S0 5.43 0 12.067z" fill="teal"/></svg></span>
                        </a>
                         <a href="https://www.instagram.com/susanraya_/">
                            <span><svg xmlns="http://www.w3.org/2000/svg"width="1em" height="1em" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.465 1.066C8.638 1.012 9.012 1 12 1c2.988 0 3.362.013 4.534.066c1.172.053 1.972.24 2.672.511c.733.277 1.398.71 1.948 1.27c.56.549.992 1.213 1.268 1.947c.272.7.458 1.5.512 2.67C22.988 8.639 23 9.013 23 12c0 2.988-.013 3.362-.066 4.535c-.053 1.17-.24 1.97-.512 2.67a5.396 5.396 0 0 1-1.268 1.949c-.55.56-1.215.992-1.948 1.268c-.7.272-1.5.458-2.67.512c-1.174.054-1.548.066-4.536.066c-2.988 0-3.362-.013-4.535-.066c-1.17-.053-1.97-.24-2.67-.512a5.397 5.397 0 0 1-1.949-1.268a5.392 5.392 0 0 1-1.269-1.948c-.271-.7-.457-1.5-.511-2.67C1.012 15.361 1 14.987 1 12c0-2.988.013-3.362.066-4.534c.053-1.172.24-1.972.511-2.672a5.396 5.396 0 0 1 1.27-1.948a5.392 5.392 0 0 1 1.947-1.269c.7-.271 1.5-.457 2.67-.511zm8.98 1.98c-1.16-.053-1.508-.064-4.445-.064c-2.937 0-3.285.011-4.445.064c-1.073.049-1.655.228-2.043.379c-.513.2-.88.437-1.265.822a3.412 3.412 0 0 0-.822 1.265c-.151.388-.33.97-.379 2.043c-.053 1.16-.064 1.508-.064 4.445c0 2.937.011 3.285.064 4.445c.049 1.073.228 1.655.379 2.043c.176.477.457.91.822 1.265c.355.365.788.646 1.265.822c.388.151.97.33 2.043.379c1.16.053 1.507.064 4.445.064c2.938 0 3.285-.011 4.445-.064c1.073-.049 1.655-.228 2.043-.379c.513-.2.88-.437 1.265-.822c.365-.355.646-.788.822-1.265c.151-.388.33-.97.379-2.043c.053-1.16.064-1.508.064-4.445c0-2.937-.011-3.285-.064-4.445c-.049-1.073-.228-1.655-.379-2.043c-.2-.513-.437-.88-.822-1.265a3.413 3.413 0 0 0-1.265-.822c-.388-.151-.97-.33-2.043-.379zm-5.85 12.345a3.669 3.669 0 0 0 4-5.986a3.67 3.67 0 1 0-4 5.986zM8.002 8.002a5.654 5.654 0 1 1 7.996 7.996a5.654 5.654 0 0 1-7.996-7.996zm10.906-.814a1.337 1.337 0 1 0-1.89-1.89a1.337 1.337 0 0 0 1.89 1.89z" fill="teal"/></svg></span>
                        </a>
                        
                    </div>
                </div>
            </div>


            <div className="form">
                <span className="circle one"></span>
                <span className="circle two"></span>
               
                    <h3 className="head2">Contact Us</h3>
                    <div className="input-box">
                        <input type="text" name="FullName" className="input" placeholder='Full Name' value={contactUsData.FullName} onChange={handleContactUsChange}/>
                        {errors.FullName && <p style={{fontSize:'0.8rem', color:'maroon',marginLeft:'1rem', marginTop:'0.3rem'}}>{errors.FullName}</p>}
                      
                    </div>
                    <div className="input-box">
                        <input type="email" name="Email" className="input" placeholder='Email' value={contactUsData.Email} onChange={handleContactUsChange}/>
                        {errors.Email && <p style={{fontSize:'0.8rem', color:'maroon',marginLeft:'1rem', marginTop:'0.3rem'}}>{errors.Email}</p>}
                   
                    </div>
                    <div className="input-box">
                        <input type="tel" name="PhoneNumber" className="input" placeholder='Phone Number' value={contactUsData.PhoneNumber} onChange={handleContactUsChange}/>
                        {errors.PhoneNumber && <p style={{fontSize:'0.8rem', color:'maroon',marginLeft:'1rem', marginTop:'0.3rem'}}>{errors.PhoneNumber}</p>}
                    
                    </div>
                    <div className="input-box textarea">
                        <textarea name="Message" className="input" placeholder='Write Your Message' value={contactUsData.Message} onChange={handleContactUsChange}></textarea>
                        {errors.Message && <p style={{fontSize:'0.8rem', color:'maroon',marginLeft:'1rem', marginTop:'0.3rem'}}>{errors.Message}</p>}
                     
                    </div>
                    <input type="button" value="Submit" className="btn" onClick={onSbumitClick}/>
                
            </div>
        </div>
    </div>
</div>

    </div>
  )
}

export default ContactUs
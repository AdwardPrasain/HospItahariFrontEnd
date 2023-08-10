import React, {useState, useEffect} from 'react'
import '../Assets/CSS/BloodDonationForm.css'
import picture from '../Assets/Images/bloodbg1.jpg';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BloodDonationForm = () => {

    const initialBloodDonationData = {
        FullName: '',
        Address: '',
        DateOfBirth:'',
        BloodGroup:'',
        FirstExperience:'',
        Gender:'',
        LastlyDonated:'',
        Email:'',
        PhoneNumber:''
    }



    const [bloodDonationData, setBloodDonationData] = useState(initialBloodDonationData);
    const [errors, setError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);

    const validation = (values) => {
        let errors = {}
  
        if (!values.FullName) {
          errors.FullName= "Please insert your full name."
        }
        else if(!values.Address) {
          errors.Address = "Please insert your address."
        }
        else if (!values.Email){
            errors.Email = "Please insert your email."
        }
        else if (!values.PhoneNumber){
            errors.PhoneNumber = "Please insert your phonenumber."
        }
        else if (!values.DateOfBirth) {
          errors.DateOfBirth= "Elease insert your date of birth."
        }
        else if(!values.BloodGroup) {
          errors.BloodGroup = "Select your blood group."
        }
        else if(!values.FirstExperience) {
            errors.FirstExperience = "Chose option from First experience."
        }
            else if (!values.Gender){
                errors.Gender = "*"
            }

        else if(values.FirstExperience === 'No') {
           
            if(!values.LastlyDonated){
           
             errors.LastlyDonated = "Please insert your lastly donated date."
                
            }
            else {
                setIsSubmit(true);
            }
        }
     
    
        else {
          setIsSubmit(true);
        }
    
        return errors;
      
      }

      useEffect(()=> {
        if(Object.keys(errors).length === 0 && isSubmit === true){
          postBloodDonationData();
        }
      },[errors]);
      

    const handleBloodDonationChange = (e) =>{
        e.preventDefault();
        const {name, value} = e.target;
        setBloodDonationData({...bloodDonationData,[name]:value});
    }
    

    const[firstExperienceStatus, setFirstExperienceStatus] = useState(false)


    const handleBloodDonationRadioChange = (e) =>{
       
        if(e.target.value ==="Yes"){
           
            setFirstExperienceStatus(true);
        }

        else if(e.target.value ==="No"){
            setFirstExperienceStatus(false);
        }
        e.preventDefault();
        const {name, value} = e.target;
        setBloodDonationData({...bloodDonationData,[name]:value});
    }

    const onRegisterClick = (e) =>{
        e.preventDefault();
        setError(validation(bloodDonationData));
    }

    const postBloodDonationData = async (e) =>{
        console.log(bloodDonationData);
        const result = await axios.post('https://localhost:7294/api/BloodDonation/BloodDonationRegistrationInsert', bloodDonationData)
       

        if(result.data == 1) {
            toast.success("Blood donation form has been registered successfully.")
            setBloodDonationData(initialBloodDonationData);
            setIsSubmit(false);
        }
        else{
            toast.error("Data can't be registered.")
        }

    }

  return (
    <div className='bloodDonationForm'>{/*This division contains overall contents from the blood donation page */}
    <ToastContainer/>
     <h2>Please fill up the blood donation form.</h2>

        <div className='container'>{/*Ths division contains all  of the components of donor regestration form*/}

        <div className='box1'> {/*Ths division contains background of blood donation*/}
            <img src={picture} className='background-image' alt=''/>    
        </div> {/*End of box1 div*/}
     
       
        <div className='box2'> {/*This division contains inputfields for blood donation form*/}

          <div className='top-row'>{/*This division contains fullname and address */}
             <div className='input-box'>
                <label className='lblFname'>Full Name</label>  <br/> 
                <input  type="text"  className="commonInput" value={bloodDonationData.FullName} name="FullName" onChange={handleBloodDonationChange}/>
                {errors.FullName && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'3rem', marginTop:'0.3rem'}}>{errors.FullName}</p>}
            </div>
          

            <div className='input-box'>
                <label className='lblAddress'>Address</label> <br/> 
                <input  type="text"  className="commonInput" value={bloodDonationData.Address} name="Address" onChange={handleBloodDonationChange} /> 
                {errors.Address && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'3rem', marginTop:'0.3rem'}}>{errors.Address}</p>}
            </div>

          </div> {/*End of top-row div*/}

 <div className='last-row'>{/*This division contains email and phonenumber*/}   

<div className='input-box'>
    <label className='lblEmail'>Email</label> <br/> 
    <input  type="email"  className="commonInput" value={bloodDonationData.Email} name="Email" onChange={handleBloodDonationChange}/> 
    {errors.Email && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'3rem', marginTop:'0.3rem'}}>{errors.Email}</p>}
</div>

<div className='input-box'>
    <label className='lblNumber'>Phone Number</label> <br/> 
    <input  type="tel"  className="commonInput" value={bloodDonationData.PhoneNumber} name="PhoneNumber" onChange={handleBloodDonationChange}/>
    {errors.PhoneNumber && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'3rem', marginTop:'0.3rem'}}>{errors.PhoneNumber}</p>} 
</div>

</div>{/*End of last-row div*/}
          
          <div className='mid-row' >{/*This division contains dob and blood group*/}            
          
            <div className='input-box' >
                <label className='lblDob'>Date of birth</label> <br/> 
                <input  type="date"  className="dobInput" value={bloodDonationData.DateOfBirth} name="DateOfBirth" onChange={handleBloodDonationChange}/> 
                {errors.DateOfBirth && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'3rem', marginTop:'0.3rem'}}>{errors.DateOfBirth}</p>}
            </div>

            <div className='input-box'>
                <label className='lblBloodgroup'>Bloodgroup</label> <br/> 
               <select className='bloodGroupInput' value={bloodDonationData.BloodGroup} name="BloodGroup" onChange={handleBloodDonationChange}>              
                <option value="A+">A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
               </select>
               {errors.BloodGroup && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'3rem', marginTop:'0.3rem'}}>{errors.BloodGroup}</p>}
            </div>

          </div>{/*End of mid-row div*/}
       
         <div className='sameBackground'>       
            <div className='input-box' >
                <h5>Is this your first time donating blood?</h5>
                <label className='commonlbl'  style={{marginLeft:'9rem',color:'#661818'}}>Yes</label>
                <input  type="radio" style={{marginLeft:'0.3rem'}} className="commonRadio" name="FirstExperience" value="Yes"  onChange={handleBloodDonationRadioChange} checked={bloodDonationData.FirstExperience === "Yes"}/> 
                <label className='commonlbl' style={{marginLeft:'4rem',color:'#661818'}}>No</label>
                <input  type="radio"  className="commonRadio" style={{marginLeft:'0.3rem'}} name="FirstExperience" value="No" onChange={handleBloodDonationRadioChange} checked={bloodDonationData.FirstExperience === "No"}/>
                {errors.FirstExperience && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'3rem', marginTop:'0.3rem'}}>{errors.FirstExperience}</p>} 
            </div>

        <div className='lowerMid-row'>{/*This division contains gender and lastly blood donated*/}
            <div className='input-box'>
                <h5 className='lblGender'>Gender {errors.Gender && <span style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'3rem', marginTop:'-0.3rem'}}>{errors.Gender}</span>}</h5> 
                <label className='commonlbl' style={{marginLeft:'4rem', color:"#661818"}}> -Male</label>
               <input type="radio"  className="commonRadio" name="Gender" value="Male" onChange={handleBloodDonationChange} checked={bloodDonationData.Gender === "Male"}/><br/>
               <label className='commonlbl' style={{marginLeft:'4rem',color:"#661818"}}> -Female</label>
                <input  type="radio"  className="commonRadio" name="Gender" value="Female" onChange={handleBloodDonationChange} checked={bloodDonationData.Gender ==="Female"}/>
                 
            </div>

    {(firstExperienceStatus)?

    null
    :

    <div className='input-box'>
    <label className='lblRecentlyDonated'>Lastly donated Date.</label> <br/> 
    <input  type="date"  className="recentInput" value={bloodDonationData.LastlyDonated} name="LastlyDonated" onChange={handleBloodDonationChange}/> 
    {errors.LastlyDonated && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'3rem', marginTop:'-0.3rem'}}>{errors.LastlyDonated}</p>}

</div> 
    
 }
        </div>{/*End of lowerMid-row div*/}        
    </div>             

            <input type='button' className='registerButton' value='Register' onClick={onRegisterClick}/>

        </div>{/*End of box2 div*/}
           
        </div>{/*End of container div*/}
    </div>/*End of blood donation form */
  )
}

export default BloodDonationForm
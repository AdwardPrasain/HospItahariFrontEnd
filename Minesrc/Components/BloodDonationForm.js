import React from 'react'
import '../Assets/CSS/BloodDonationForm.css'
import picture from '../Assets/Images/bloodbg1.jpg';

const BloodDonationForm = () => {
  return (
    <div className='bloodDonationForm'>{/*This division contains overall contents from the blood donation page */}
     <h2>Please fill up the blood donation form.</h2>

        <div className='container'>{/*Ths division contains all  of the components of donor regestration form*/}

        <div className='box1'> {/*Ths division contains background of blood donation*/}
            <img src={picture} className='background-image' alt=''/>    
        </div> {/*End of box1 div*/}
     
       
        <div className='box2'> {/*This division contains inputfields for blood donation form*/}

          <div className='top-row'>{/*This division contains fullname and address */}
             <div className='input-box'>
                <label className='lblFname'>Full Name</label>  <br/> 
                <input  type="text"  className="commonInput"/>
            </div>
          

            <div className='input-box'>
                <label className='lblAddress'>Address</label> <br/> 
                <input  type="text"  className="commonInput"/> 
            </div>

          </div> {/*End of top-row div*/}
          
          <div className='mid-row'>{/*This division contains dob and blood group*/}            
          
            <div className='input-box'>
                <label className='lblDob'>Date of birth</label> <br/> 
                <input  type="date"  className="dobInput"/> 
            </div>

            <div className='input-box'>
                <label className='lblBloodgroup'>Bloodgroup</label> <br/> 
               <select className='bloodGroupInput'>              
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
               </select>
            </div>

          </div>{/*End of mid-row div*/}

         <div className='sameBackground'>       
            <div className='input-box' >
                <h5>Is this your first time donating blood?</h5>
                <label className='commonlbl'  style={{marginLeft:'9rem',color:'#661818'}}>Yes</label>
                <input  type="radio" style={{marginLeft:'0.3rem'}} className="commonRadio" name="yesNo"/> 
                <label className='commonlbl' style={{marginLeft:'4rem',color:'#661818'}}>No</label>
                <input  type="radio"  className="commonRadio" style={{marginLeft:'0.3rem'}} name="yesNo"/> 
            </div>

        <div className='lowerMid-row'>{/*This division contains gender and lastly blood donated*/}
            <div className='input-box'>
                <h5 className='lblGender'>Gender</h5> 
                <label className='commonlbl' style={{marginLeft:'4rem', color:"#661818"}}> -Male</label>
               <input type="radio"  className="commonRadio" name="gender"/><br/>
               <label className='commonlbl' style={{marginLeft:'4rem',color:"#661818"}}> -Female</label>
                <input  type="radio"  className="commonRadio" name="gender"/> 
            </div>

    
            <div className='input-box'>
                <label className='lblRecentlyDonated'>Lastly donated Date.</label> <br/> 
                <input  type="date"  className="recentInput"/> 
            </div>   

        </div>{/*End of lowerMid-row div*/}        
    </div>        
          <div className='last-row'>{/*This division contains email and phonenumber*/}   

            <div className='input-box'>
                <label className='lblEmail'>Email</label> <br/> 
                <input  type="email"  className="commonInput"/> 
            </div>
      
            <div className='input-box'>
                <label className='lblNumber'>Phone Number</label> <br/> 
                <input  type="tel"  className="commonInput"/> 
            </div>

          </div>{/*End of last-row div*/}
            

            <input type='button' className='registerButton' value='Register'/>

        </div>{/*End of box2 div*/}
           
        </div>{/*End of container div*/}
    </div>/*End of blood donation form */
  )
}

export default BloodDonationForm
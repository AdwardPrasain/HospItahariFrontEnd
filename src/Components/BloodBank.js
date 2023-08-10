import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import '../Assets/CSS/BloodBank.css'
import bloodbankbg from '../Assets/Images/Bloodbankbg.jpg'
import {Link} from 'react-router-dom'
import { LoginContext,  } from '../Context/LoginContext'



const BloodBank = () => {

  const {loginDetails,setLoginDetails} = useContext(LoginContext);
/*<----- Get method for donor details table ----->*/

  const [bloodDonationData, setBloodDonationData] = useState([]);

  const getBloodDonationData = async () => {
    const result = await axios.get(loginDetails.URL + "/api/BloodDonation/BloodDonationGet");
    console.log(result.data);
    setBloodDonationData(result.data);
  };


/*<----- Get method for available bloods table -----> */
const [availableBloodData, setAvailableBloodData] = useState([]);

const getAvailableBlood = async () => {
  const result = await axios.get(loginDetails.URL + "/api/AvailableBlood/AvailableBloodGet");
  console.log(result.data);
  setAvailableBloodData(result.data);
};

  useEffect(() => {
    getBloodDonationData();
    getAvailableBlood();
  }, [loginDetails]);

  return (
    <div className='bloodBank'> {/*This is the main div and covers all of the portion of Bloodbank page*/}

    <div className='samerowTop'>

        <div>
            <img src={ bloodbankbg} style={{height:'21rem', marginLeft:'0.2rem', width:'50rem'}}/>
          </div>
          
        

          <div class="bloodFacts">
            <div class="bloodFactsCover">
              <div class="universalDonor">
                <h5 style={{textDecoration:'underline'}}>Some fact about universal donor</h5>
                <p style={{fontStyle:'italic',margin:'1rem' }}>
                - Universal Donors are those whith an O negative blood type. 
                </p>
               
                <p style={{fontStyle:'italic',margin:'0.5rem' }}> 
                - O negative blood can be used in transfusions for any blood type.
                </p>   

                <p style={{fontStyle:'italic',margin:'0.5rem' }}> 
                - O-negative blood is the rarest blood type, with only about
                 7% of the population having this blood type.
                </p> 

                <p style={{fontStyle:'italic',margin:'0.5rem' }}> 
                - O-negative blood is also associated with a reduced risk of heart
                 disease and certain cancers.
                </p> 
              </div>

                <div class="universalRecipient">
                <h5>Some fact about universal reciptent</h5>

                
                <p style={{fontStyle:'italic',margin:'0.5rem' }}> 
                - AB positive blood type is known as the “universal recipient”.
                </p> 

                <p style={{fontStyle:'italic',margin:'0.5rem' }}> 
                - The plasma of blood group AB does not have the antibodies A or B, so it can easily be transfused to any blood type.
                </p> 

                <p style={{fontStyle:'italic',margin:'0.5rem' }}> 
                - The blood type AB positive is considered the universal recipient type because it contains both
                 A and B antigens on its red blood cells, and it also has the Rh factor.

                </p> 
                </div>
              </div>
          </div>

    </div>{/*End of samerowTop division */}
     



      <div className='wrapup'>  {/*Ths division wrapups donor info and available bloods*/}

      <div style={{paddingBottom:'2rem', textAlign:'center', marginTop:'4rem'}}>{/*Ths division wrapups available bloods*/}
      <div style={{display:'flex',flexDirection:'row'}}>
      <h style={{ marginLeft:'53rem', color:'#7e3434', border:'3px solid #7e3434', borderRadius:'0.5rem', padding:'0.5rem', marginBottom:'0.8rem'}}>  Available blood pouch</h> 
            <p style={{color:'#7e3434', fontWeight:'bold', marginTop:'0.5rem'}}>----------------------------</p>
            
        </div>
          <div className='availableBloods'>
               <table id="bloodsAvailable">
                           <thead>
                             <tr>
                               <th>S.N</th>
                               <th>Blood Groups</th>
                               <th>Number of Pouch</th> 
                             </tr>
                           </thead>
                            
                            <tbody>
                             {availableBloodData.map((data, index) => (
                                   <tr key={index}>
                                     <td>{index + 1}</td>
                                     <td>{data.bloodGroup}</td>
                                     <td>{data.numberOfPouchAvailable}</td>
                                   </tr>
                               ))}
                           </tbody>
                               
                         </table>
               </div> {/*end of available-bloods div*/}

           
       
          </div>{/*End of available blood wrapup division*/}

      
<div style={{border:'1px solid wheat',  backgroundColor:'rgb(229, 224, 214)', padding:'2rem 26rem', marginTop:'2rem', marginBottom:'2rem'}}>
<div style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", width:'23rem',backgroundColor:'rgb(255, 237, 205)',padding:'0.5rem', fontFamily:'cursive', color:'rosybrown' }}>
    <p>This platform provides access to blood bank services,
      which is crucial for emergency situations.
        You can view the availability of blood types and request
        blood donations form as per your needs.</p>
</div>

<div classsName='bloodDonate'>
        <Link to={'/BloodDonationForm'}>
          <input type='button' className='donateBlood' value='Donate Blood'/>
        </Link>
        </div>

</div>
     


        <div className='donorWrapup'style={{paddingBottom:'2rem', marginBottom:'2rem'}}>{/*Ths division wrapups donor info*/}
        
        <div style={{display:'flex',flexDirection:'row'}}>
            <p style={{color:'#7e3434', fontWeight:'bold', marginTop:'0.5rem'}}>----------------------------</p>
            <h style={{color:'#7e3434', border:'3px solid #7e3434', borderRadius:'0.5rem', padding:'0.5rem', marginBottom:'0.8rem'}}>  Detail of our blood donor's</h> 
        </div>
   
   <div className='donorInfo'>
               <table id="donors">
                    <thead>
                      <tr>
                        <th>S.N</th>
                        <th>Full Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Blood Group</th>
                     
                      </tr>
                    </thead>

                    <tbody>
                     {bloodDonationData.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.fullName}</td>
                          <td>{data.age}</td>
                          <td>{data.gender}</td>
                          <td>{data.address}</td>
                          <td>{data.phoneNumber}</td>
                          <td>{data.bloodGroup}</td>
        
                        </tr>
                     ))}
                    </tbody>
                        
                  </table>
       
      </div>



  </div> {/*End of donor wrapups division*/}
   

        
      
    </div> {/*End of wrapup div */}

    
    
        
  </div>/*End of main bloodbank division*/
    
  )
}

export default BloodBank
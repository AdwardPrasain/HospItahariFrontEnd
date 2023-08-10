import React, {useEffect, useState, useContext} from 'react'
import '../Assets/CSS/Home.css'
import {Link} from 'react-router-dom'
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from 'axios';
import { LoginContext } from '../Context/LoginContext';
import bloodBankIcon from '../Assets/Images/bloodBankIcon.png'
import doctors from '../Assets/Images/doctorsIcon.png'
import hospitals from '../Assets/Images/hospitalsIcon.png'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Star from './Star';






const Home = () => {


  const {loginDetails,setLoginDetails} = useContext(LoginContext);


  /*<-----For hospitals Data----->*/

  const [HospitalsData, setHospitalsData] = useState([]);
  
  const getHospitalsData = async () => {
      const result = await axios.get(loginDetails.URL + "/api/Hospital/HospitalRegistrationGet");
     
      setHospitalsData(result.data);

      if (loginDetails.SearchBar){
     
        const filterHospitalsData = result.data.filter(x=>{
          return `${x.hospitalName.toLowerCase()}`.includes(loginDetails.SearchBar.toLowerCase());
        })
        setHospitalsData(filterHospitalsData);
      }

      else{
      
        setHospitalsData(result.data);
      }
  };

useEffect(() => {
  getHospitalsData();
  getDoctorsData();
}, [loginDetails]);


/*<-----For doctors data------> */

const [doctorsData, setDoctorsData] = useState([]);

const getDoctorsData = async () => {
    const result = await axios.get(loginDetails.URL + "/api/Doctors/DoctorsAllGet");
    setDoctorsData(result.data);
    console.log(result)
    if (loginDetails.SearchBar){
     
      const filterDoctorsData = result.data.filter(x=>{
        return `${x.fullName.toLowerCase()}`.includes(loginDetails.SearchBar.toLowerCase());
      })
      setDoctorsData(filterDoctorsData);
    }

    else{
    
      setDoctorsData(result.data);
    }
};





  return (
    <div className='Home'>{/* This is the main division of home page and covers all the  */}

      <div className="container"> 

       <div className="slider">
   <div className="slider-h3">
   		Welcome to HospItahari! <br /><h style={{fontSize:"1.3rem"}}>Platform to get easy healthcare.</h>
       <Link to={'/ContactUs'}>
          <div style={{paddingTop:"30px"}}><a href="#" className="btn">Contact Us</a></div>
        </Link>
   </div>

</div> 
        <div className="hospitalProfile"> {/* This is the main division of swiper for hospital profiles  */}
        <div className="headings">
        <h2>Our hospitals</h2>
        <p className="topic">Experience exceptional healthcare services with our hospitals. 
        From advanced medical technology to expert care, we're dedicated to improving your health and well-being.
        </p>
        </div>
        

          <Swiper modules={[Navigation]} slidesPerView={3} navigation>

          {HospitalsData.map((data, index) => (
                             <SwiperSlide>
                             {" "}
                               <div className="hospitals">
                                 <div className='sameRow'>
                                   <div className='row1'>
                                     <img src={ loginDetails.URL + "/staticfiles/HospitalImages/" + data.image} className='hospital-profile'/>
                                   </div>
                 
                                   <div className='row2'>
                                     <h4> {data.hospitalName}</h4> 
                                     <p>Contact us at: {data.phoneNumber}.<br/> 
                                        Email: {data.email}<br/> 
                                     </p>
                                   </div>
                                 </div>
                                 <Link to={`/Hospital/${data.id}`}>
                                      <input type='button' className='viewHospital' value='View Hospital'  />
                                 </Link>
                                 
                               </div>
                           </SwiperSlide>
                     ))}
           
     
          </Swiper>

        </div>{/*End of hospital profile swiper */}

        <div className="slider-bottom">

        <h2>Why choose HospItahari?</h2>
	<div className="slider-bottom-parts">
    	<div style={{align:"center"}}><img src={bloodBankIcon} style={{marginLeft:'9rem' ,height:"4rem"}} /></div>
        <div className="slider-bottom-parts-h3">Blood Bank</div>
        <div className="slider-bottom-parts-p">
        Blood banks maintain a record of donors and their blood types,
        which helps in matching the right blood type with the patient in need.
        And you can donate bloods by filling the donation form.
        </div>
    </div>
    <div className="slider-bottom-parts">
    	<div style={{align:"center"}}><img src={hospitals} style={{marginLeft:'9rem' ,height:"4rem"}} /></div>
        <div className="slider-bottom-parts-h3">Variety of hospitals</div>
      
        <div className="slider-bottom-parts-p">
        Curious about the different types of hospitals available?
        This website is designed to provide you with a comprehensive
         overview of the many varieties of hospitals.
        </div>

    </div>

    <div className="slider-bottom-parts">
    	<div style={{align:"center"}}><img src={doctors} style={{marginLeft:'9rem' ,height:"4rem"}} /></div>
        <div className="slider-bottom-parts-h3">Book Appointment</div>
     
        <div className="slider-bottom-parts-p">
        Get quick access to medical professionals by scheduling an appointment online and
        avoid long wait times by booking your appointment in advance.
        </div>
    </div>
    
</div>

        <div className='doctorsProfile'> {/* This is the main division of swiper for doctor profiles  */}
        <h2>Our doctors</h2>
        <p className="topic">Meet our expert physicians and medical professionals. 
          Learn about their backgrounds, areas of expertise, and book appointment accordingly.
        </p>

          <Swiper modules={[Navigation]} slidesPerView={3} navigation>
           
           {doctorsData.map((data, index) => (
                  <SwiperSlide>
                  {" "}
                    <div className="doctors">
                      <div className='sameRow'>
                        <div className='row1'>
                          <img src={ loginDetails.URL + "/staticfiles/DoctorImages/" + data.image} className='doc-profile'/>
                        </div>
      
                        <div className='row2'>
                          <h4>Dr. {data.fullName}</h4> 
                          <p> {data.speciality}.<br/> 
                             Qualification: {data.qualification}<br/> 
                             Experience:{data.experience}
                          </p>
                        </div>
                      </div>

                      <div className='ratingStars' style={{marginLeft:'1.3rem', marginTop:'0.2rem'}}>
                  
                  <Star stars={data.rating} reviews={data.review} />

                </div>

                      <Link to = {`/Doctor/${data.id}`}>
                      <input type='button' className='appointmentBtn' value='Book Appointment'/>
                      </Link>
                     
                    </div>
    
                </SwiperSlide>
           ))}

          </Swiper>
        </div> {/*End of doctors profile swiper div */}


      <div className='registerComponent'>{/*This division contains the portion of user registration and hospital registration*/}
        <div className="registerSelect">
          <div className='userLinkSelect'>
            <a href="./Signup" className='userLink'>Register as an user</a>
          </div>


          <div className='hospitalRegisterSelect'>
            <a href="./HospitalRegister" className='hospitalRegisterLink'>Register as an hospital</a>
          </div>
          
        </div> 

      </div>{/*TEnd of register component*/}

        </div> {/*End of container div */}
     


      

    </div>/*End of main home div*/

  )
}

export default Home;





   
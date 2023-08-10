import React, {useState, useEffect, useContext} from 'react'
import '../Assets/CSS/Hospital.css'
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from 'axios';
import {useParams} from "react-router-dom"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import contactIcon from '../Assets/Images/phone.png'
import mailIcon from '../Assets/Images/mail.png'
import { LoginContext } from '../Context/LoginContext';
import {Link} from 'react-router-dom'
import Star from './Star';


const Hospital = () => {
  
  const {loginDetails,setLoginDetails} = useContext(LoginContext);

  const [servicesData, setServicesData] = useState([]);

  const {id} = useParams()


  const [HospitalsData, setHospitalsData] = useState([]);
  
  const getHospitalsData = async () => {
      const result = await axios.get(loginDetails.URL + `/api/Hospital/HospitalRegistrationGetById?HospId=${id}`);
      console.log(result.data);
      setHospitalsData(result.data);
  };

useEffect(() => {
  getHospitalsData();
  getServicesData();
  getDoctorsData();
}, [loginDetails]);

  const getServicesData = async () => {
      const result = await axios.get(`https://localhost:7294/api/Services/ServicesGet?HospId=${id}`);
      console.log(result.data);
      setServicesData(result.data);
  };




const [doctorsData, setDoctorsData] = useState([]);

const getDoctorsData = async () => {
    const result = await axios.get(loginDetails.URL + `/api/Doctors/DoctorsGet?HospId=${id}`);
    setDoctorsData(result.data);

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
    <div className='Hospital'>
      
    <div className="sameRow-top"> {/*This division contains image and map of hospitals */}
     
     {HospitalsData.map((data, index)=>( 
      <>
      
     <img  width='448px' height='288px' src={ loginDetails.URL + "/staticfiles/HospitalImages/" + data.image} /> 
     
     <div class="map"> 
     <iframe src={data.map.slice(13,-10)} width="600" height="450" style={{border:'0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    </>
     
     ))}
                
     
     

      

    </div> {/*End of same row top division */}

<div className="sameRow-mid"> {/*This division contains hospital description and contacts */}

  <div className="description">
   {HospitalsData.map((data, index)=>(<label id="hospitalName">{data.hospitalName}</label>))} 
   {HospitalsData.map((data, index)=>(<label id="hospitalAddress">{data.address}</label>))} 
   {HospitalsData.map((data, index)=>(<label id="hospitalType">{data.hospitalType}</label>))} 
  </div>

  <div className="contacts">
  <a href="tel:+9779842022755" className='hospitalPhNumber'>
    <div className="common">
       
         <img src={contactIcon} className='phone'/>Call 
    </div>
    </a>

    <div className="common">
      <img src={mailIcon} className='mail'/>
      <a href="" className='hospitalEmail'>Email</a>
    </div>
 

  </div>
    
</div>{/*End of same row mid division */}

    <div className="services"> {/*This division contains hospital services table */}

      <div className="topicWrap">
        <h2>Our Services</h2>
        <p className="topic">You can see the list of tests that are provided by our hospitals</p>
        </div>

         <div className='servicesTable'>
                    <table id='services'>
                        <thead>
                            <tr>
                                <th>SN.</th>
                                <th>Service Name</th>
                                <th>Amount in rupees</th>
                            </tr>
                        </thead>

                    <tbody>
                     {servicesData.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.serviceName}</td>
                          <td>{data.serviceAmount}</td>
                        </tr>
                     ))}
                     </tbody>
                    </table>
          </div>

      </div>{/*End of services division */}
      <div className='doctorsProfile'> {/* This is the main division of swiper for doctor profiles  */}

        <div className="topicWrap">
        <h2>Our doctors</h2>
        <p className="topic">Book Appointment with our dooctors</p>
        </div>
       

          <Swiper modules={[Navigation]} slidesPerView={3} navigation>

          {doctorsData.map((data, index)=>(

                    <SwiperSlide>
                    {" "}
                      <div className="doctors">
                        <div className='sameRow'>
                          <div className='row1'>
                            <img src={ loginDetails.URL + "/staticfiles/DoctorImages/" + data.image}/>
                          </div>

                         
                          <div className='row2'>
                            <h4>Dr. {data.fullName}</h4> 
                            <p>{data.speciality}<br/> 
                              Qualification: {data.qualification}<br/> 
                              Experience:{data.experience}
                            
                            </p>
                          </div>
                        </div>

                        <div className='ratingStars' style={{marginLeft:'1.3rem', marginTop:'0.2rem'}}>
                  
                          <Star stars={doctorsData.rating} reviews={doctorsData.review} />

                        </div>

                        <Link to = {`/Doctor/${data.id}`}>
                      <input type='button' className='appointmentBtn' value='Book Appointment'/>
                      </Link>
                      </div>

                      
                    </SwiperSlide>

          ))} 
           
         
          
          
          </Swiper>
        </div> {/*End of doctors profile swiper div */}
       

    </div>
  )
}

export default Hospital
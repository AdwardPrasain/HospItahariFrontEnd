import React,{useContext,useEffect,useState} from 'react'
import '../../Assets/CSS/HospitalAdminDashboard.css'
import hospital1 from '../../Assets/Images/hosp1.jpg'
import axios from 'axios'
import { LoginContext } from '../../Context/LoginContext';
import {useParams} from "react-router-dom"
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {Chart} from "react-google-charts"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import doctorIcon from '../../Assets/Images/doctorIcon.png'
import moneyIcon from '../../Assets/Images/moneyIcon.png'
import appointmentIcon from '../../Assets/Images/appointmentIcon.png'
import serviceIcon from '../../Assets/Images/serviceIcon.png'
import Plot from 'react-plotly.js';


const HospitalDashboard = () => {

const initialHospitalValue = {
    hospitalName:'',
    address:'',
    email:'',
    phoneNumber:'',
    registrationDate:'',
    healthcareNumber:'',
    hospitalType:'',
    map:''
  }

const [hospitalValue, setHospitalValue] = useState(initialHospitalValue)

const handleEditChange = (e) =>{
    e.preventDefault();
    const {name, value} = e.target;
    setHospitalValue({...hospitalValue,[name]:value});
}


const puthospitalData = async (e) =>{
    const result = await axios.put(loginDetails.URL + '/api/Hospital/HospitalRegistrationUpdate', hospitalValue)
   

    if(result.data == 2) {
        toast.success("Your data has been updated.")
        // setDoctorValue(initialDoctorsData);
        // setIsSubmit(false);
        // getDoctorsData();
        // onImageUpload();
        getHospitalsData();
        setHospitalValue(initialHospitalValue);
      
    }
    else{
        toast.error("Data can't updated .")
    }

}


const {loginDetails,setLoginDetails} = useContext(LoginContext);
const {id} = useParams()  

  const [HospitalsData, setHospitalsData] = useState({});
  const [HospitalsDataMap, setHospitalsDataMap] = useState([]);
  
  const getHospitalsData = async () => {
  
      const result = await axios.get(`https://localhost:7294/api/Hospital/HospitalRegistrationGetById?HospId=${loginDetails.HospitalId}`);
  
      setHospitalsData(result.data[0]);
      setHospitalsDataMap(result.data[0].map);
      setHospitalValue(result.data[0]);

      console.log(result.data[0]);
  };

  const [totalCountData, setTotalCountData] = useState([]);
  
  const getTotalCountData = async () => {

      const result = await axios.get(loginDetails.URL + `/api/HospitalAdmin/HospitalAdminGet?HospId=${loginDetails.HospitalId}`);
      setTotalCountData(result.data[0]);
      console.log(result)
      
  };



  useEffect(()=>{
 
    getTotalCountData();
    getadmingraphData();
    getHospitalsData();
 
  },[LoginContext] )



/*<-----for graphs and charts----->*/
 



  const [graphX, setGraphX] = useState([])
  const [graphY, setGraphY] = useState([])

  const data = [
    {
         x: graphX,
         y: graphY,
         fill: 'tozeroy',
         type: 'scatter',
         name: 'No of Booking'
       }
  ];

  const getadmingraphData = async () => {

    const result = await axios.get(loginDetails.URL +`/api/HospitalAdmin/HospitalAdminGraphDataGet?HospId=${loginDetails.HospitalId}`);

    console.log(result)
    const y = result.data.map(object => object.number);
    const x = result.data.map(object => object.date);

    setGraphX(x);
    setGraphY(y);
};




  const options = {
    chart: {
      title: "Patient's per month",
      subtitle: "Number of patient,",
    },
  };



  return (

    <div className='HospitalAdminDashboard'>
<ToastContainer/>
    <div className='body'>
    <div style={{paddingTop:"0rem"}}  className="profile-body">
      <div className='profilepart' style={{ paddingTop:"2rem"}}>
        <div className="photo">
            <img src={ loginDetails.URL + "/staticfiles/HospitalImages/" + HospitalsData.image} className="image--cover"/>
        </div>

        <div className="profile">
            <h1 className="hospitalname"style={{marginBottom:'0.5rem'}}>{HospitalsData.hospitalName}</h1>
            <h2 className="email"style={{marginBottom:'0.5rem'}}> {HospitalsData.email}</h2>
            <h3 className="locationname"><i className="fas fa-map-marker-alt"></i> {HospitalsData.address} </h3>

     <div className='wrapup' style={{display:'flex', flexDirection:'row'}}>
     <div className="otherinfo">
		
		<div className="other-info">
			<div className="info-container">
            <h6 style={{textDecorationLine:'underline'}}>Other Information</h6>
			<h6 style={{fontSize:'small'}}>Contact Number:{HospitalsData.phoneNumber} </h6>
            <h6 style={{fontSize:'small'}}>Registered Date:{HospitalsData.registrationDate} </h6>
            <h6 style={{fontSize:'small'}}>Healthcare Number:{HospitalsData.healthcareNumber} </h6>
            <h6 style={{fontSize:'small'}}>Hospital Type: {HospitalsData.hospitalType} </h6>
			</div>

            <button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#exampleModal"> Edit</button>
		</div> 
	</div>

    <div className="location">
		   
  
     <div class="map"> 
     <iframe src={HospitalsDataMap.slice(13,-10)}  style={{border:'0',height:'13.4rem', width:'43.75rem'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>

  
		
	</div>
    </div>       
	
      
        </div>
  
     </div> 

    </div>

</div>{/*End of body div*/}

<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button><br/>
          <h5 className="modal-title" id="exampleModalLabel" style={{marginLeft:'-18rem'}}>Edit Your data.</h5>
       </div>
       
      <div className="modal-body">
            <div>

                <div className='row1'>
                    <div className='input-box'>
                        <label>Hospital Name</label>
                        <input type="text" name='hospitalName' value={hospitalValue.hospitalName} onChange={handleEditChange}/>
                    </div>

                    <div className='input-box'>
                        <label className='common'>Address</label>
                         <input type="text" className='common' name='address' value={hospitalValue.address} onChange={handleEditChange}/>
                    </div>
                </div>

                <div className="row2">
                    <div className='input-box'>
                        <label>Email</label>
                        <input type="text" name='email' value={hospitalValue.email} onChange={handleEditChange} />
                    </div>

                    <div className='input-box1'>
                        <label>Phone Number</label>
                        <input type="text" className='phoneNoInput' name='phoneNumber' value={hospitalValue.phoneNumber} onChange={handleEditChange} />
                    </div>
                </div>

                <div className='row3'>

                    <div className='input-box'>
                        <label>Registered Date</label>
                        <input type="text" name='registrationDate' value={hospitalValue.registrationDate} onChange={handleEditChange}/>
                    </div>
                       
                    <div className='input-box1'>
                        <label>Healthcare Number</label>
                        <input type="text" className='healthcareInput' name='healthcareNumber' value={hospitalValue.healthcareNumber} onChange={handleEditChange}/>
                    </div>
                       

                </div>

                <div className='row4'>

                    <div className='input-box'>
                        <label>Hospital Type</label>
                        <input type="text" name='hospitalType' value={hospitalValue.hospitalType} onChange={handleEditChange}/>
                    </div>

                    <div className='input-box2'>
                        <label>Map</label>
                        <input type="text"name='map' value={hospitalValue.map} onChange={handleEditChange}/>
                    </div>
                     
              
                </div>            
            </div> 
      </div>
      <div className="modal-footer">
        <input type="button" className="submitBtn" value="Submit" onClick={puthospitalData} style={{backgroundColor:'teal', border:'0.1rem solid teal', borderRadius:'0.2rem', color:'white'}}/>
      </div>
    </div>
  </div>
</div>




<div className='totalCountWrapup'> {/*This division contains the content of total counts */}



 <div className='totalCountContent' style={{marginLeft:'6rem'}}>
        <div style={{display:'flex', flexDirection:'row'}}>
          <img src={doctorIcon} style={{height:'5rem', width:'6rem', marginLeft:'0.2rem' }}/>

          <div style={{marginLeft:'0.9rem', marginTop:'0.3rem'}} >
          <h >Total doctors</h>
          <p style={{fontWeight:'bold', marginLeft:'2rem'}}>{totalCountData.doctorCount}</p>
          </div>
        </div> 
        
    </div>

    <div className='totalCountContent'>
        <div style={{display:'flex', flexDirection:'row'}}>
          <img src={serviceIcon} style={{height:'5rem', width:'6rem', marginLeft:'0.2rem' }}/>

          <div style={{marginLeft:'0.9rem', marginTop:'0.3rem'}} >
          <h >Total services</h>
          <p style={{fontWeight:'bold', marginLeft:'1.3rem'}}>{totalCountData.serviceCount}</p>
          </div>
          
        </div>
    </div>

    <div className='totalCountContent'>
        <div style={{display:'flex', flexDirection:'row'}}>
          <img src={appointmentIcon} style={{height:'5rem', width:'5rem', marginLeft:'0.2rem' }}/>

          <div style={{marginLeft:'0.6rem', marginTop:'0.3rem'}} >
          <h >Total appointments</h>
          <p style={{fontWeight:'bold', marginLeft:'1.3rem'}}>{totalCountData.bookingCount}</p>
          </div>
          
        </div>
    </div>

    <div className='totalCountContent'>
        <div style={{display:'flex', flexDirection:'row'}}>
          <img src={moneyIcon} style={{height:'5rem',width:'6rem', marginLeft:'0.2rem' }}/>

          <div style={{marginLeft:'0.8rem', marginTop:'1.3rem'}} >
          <h >Total Amounts</h>
          <p style={{fontWeight:'bold', marginLeft:'1.3rem'}}>Rs. {totalCountData.totalPayment}</p>
          </div>
          
        </div>
    </div>

</div> {/*End of total count wrapup division */}


    <div className='graphContainer' style={{display:'flex', flexDirection:'row',boxShadow:"rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}}>
        <Plot
      data={data}
      layout={ {width: 500, height: 500, title: 'Booking Count per day'} } />
    </div>





    </div>/*end of main division */
  )
}

export default HospitalDashboard
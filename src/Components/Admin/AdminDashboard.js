import React, {useState, useEffect,useContext } from 'react'
import axios from 'axios'
import { LoginContext,} from '../../Context/LoginContext'
import '../../Assets/CSS/ForAdmin/AdminDashboard.css'
import hospitalIcon from '../../Assets/Images/hospital.png'
import userIcon from '../../Assets/Images/userIcon.jpg'
import donorIcon from '../../Assets/Images/bloodDonorIcon.png'
import Plot from 'react-plotly.js';

const AdminDashboard = () => {

  const {loginDetails,setLoginDetails} = useContext(LoginContext);

/*<----- For total count box ----->*/
  const [totalCountData, setTotalCountData] = useState([]);
  
  const getTotalCountData = async () => {
      const result = await axios.get(loginDetails.URL + `/api/MainAdminDashboard/MainAdminGet`);
      setTotalCountData(result.data);
      
  };


useEffect(() => {
  getTotalCountData();
  getBloodDonationGraph();
  getAvailableBloodGraph();

}, [loginDetails]);



/*<----- For bargraph ----->*/





  const [donationX, setDonationX] = useState([])
  const [donationY, setDonationY] = useState([])

  const [availableX, setAvailableX] = useState([])
  const [availableY, setAvailableY] = useState([])

  const bloodData = [
    {
         x: donationX,
         y: donationY,
         fill: 'tozeroy',
         type: 'scatter',
         name: 'Blood Donation Details'
       },

       {
        x: availableX,
        y: availableY,
        fill: 'tozeroy',
        type: 'scatter',
        name: 'Available Blood Pouch'
      }
  ];

  const [bloodDonationGraph, setBloodDonationGraph]=useState([])

  const getBloodDonationGraph = async () => {

    const result = await axios.get(loginDetails.URL + `/api/MainAdminDashboard/GetMainAdminGraphData`);

    const y = result.data.map(object => object.number);
    const x = result.data.map(object => object.bloodGroup);

    setDonationX(x);
    setDonationY(y);   
    
};


const [availableBloodGraph, setAvailableBloodGraph]=useState([])

const getAvailableBloodGraph = async () => {

  const result = await axios.get(loginDetails.URL + `/api/MainAdminDashboard/GetAdminDashboardAvailableBloodGraph`);
  const y = result.data.map(object => object.number);
  const x = result.data.map(object => object.bloodGroup);

  setAvailableX(x);
  setAvailableY(y);   
  
};


  return (
    <div className='AdminDashboard' > {/* This  division covers overall admin dash board content */}
      
      <div className='totalCountWrapup'> {/*This division contains the content of total counts */}

      {totalCountData.map((data, index)=>( 
      <>
       <div className='totalCountContent' style={{marginLeft:'13rem'}}>
              <div style={{display:'flex', flexDirection:'row'}}>
                <img src={hospitalIcon} style={{height:'6rem', marginLeft:'0.2rem' }}/>

                <div style={{marginLeft:'0.6rem', marginTop:'2.1rem'}} >
                <h >Total Number</h>
                <p style={{fontWeight:'bold', marginLeft:'1.3rem'}}>{data.hospCount}</p>
                </div>
              </div> 
                <p style={{margin:'0.3rem'}}>Hospitals Registered</p>
          </div>

          <div className='totalCountContent'>
              <div style={{display:'flex', flexDirection:'row'}}>
                <img src={userIcon} style={{height:'5rem', marginLeft:'0.2rem' }}/>

                <div style={{marginLeft:'0.6rem', marginTop:'2.1rem'}} >
                <h >Total Number</h>
                <p style={{fontWeight:'bold', marginLeft:'1.3rem'}}>{data.userCount}</p>
                </div>
                
              </div>
              <p style={{marginLeft:'0.3rem'}}>Users Registered</p>
          </div>

          <div className='totalCountContent'>
              <div style={{display:'flex', flexDirection:'row'}}>
                <img src={donorIcon} style={{height:'6rem', marginLeft:'0.2rem' }}/>

                <div style={{marginLeft:'0.6rem', marginTop:'2.1rem'}} >
                <h >Total Number</h>
                <p style={{fontWeight:'bold', marginLeft:'1.3rem'}}>{data.donorCount}</p>
                </div>
                
              </div>
              <p style={{margin:'0.3rem'}}>Blood Donors</p>
          </div>
      </>
     
     ))}
         

      </div> {/*End of total count wrapup division */}
    
      <div className='barGraph' style={{border:'1px solid wheat', background:'wheat'}}>{/*This division covers bargraph contents */}
        
      <Plot 
      data={bloodData}
      layout={ {width: 500, height: 500, title: 'Booking Count per day'} } />

      </div> {/*End of barGraph division */}
   
    </div>/*End of main admin dashboard division */
  )
}

export default AdminDashboard
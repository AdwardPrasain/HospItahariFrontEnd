import React, {useState, useEffect,useContext }  from 'react'
import axios from 'axios'
import { LoginContext,} from '../../Context/LoginContext'
import '../../Assets/CSS/ViewAppointmentDetails.css'

const ViewAppointmentDetails = () => {
    const {loginDetails,setLoginDetails} = useContext(LoginContext);

    const [appointmentData, setAppointmentData] = useState([]);

    const getAppointmentData = async () => {
        const result = await axios.get(loginDetails.URL+`/api/BookAppointment/GetAppointmentByHospitalAdmin?HospId=${loginDetails.HospitalId}`);
        console.log(result.data);
        setAppointmentData(result.data);
    };

  useEffect(() => {
    getAppointmentData();
  }, [loginDetails]);


  return (
    <div className='ViewAppointmentDetails'>
         <div className='contactUsInfo'> 
               <table id="list">
                    <thead>
                      <tr>
                        <th>S.N</th>
                        <th>Patient Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Doctor Name</th>
                        <th>Appointment Date</th>
                        <th>Appointmet Time</th>
                      </tr>
                    </thead>

                    <tbody>
                     {appointmentData.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.fullName}</td>
                          <td>{data.age}</td>
                          <td>{data.gender}</td>
                          <td>{data.address}</td>
                          <td>{data.doctorName}</td>
                          <td>{data.date}</td>
                          <td>{data.time}</td>
                        </tr>
                     ))}
                    </tbody>
                        
                  </table>
        </div>
    </div>
  )
}

export default ViewAppointmentDetails
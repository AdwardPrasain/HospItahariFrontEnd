import React, {useEffect, useContext, useState} from 'react'
import '../../Assets/CSS/ForAdmin/ManageHospital.css'
import remove from '../../Assets/Images/deleteicon.png'
import approve from '../../Assets/Images/approveicon.png'
import decline from '../../Assets/Images/declineicon.png'
import axios from 'axios'
import { LoginContext,  } from '../../Context/LoginContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ManageHospital = () => {


    const {loginDetails,setLoginDetails} = useContext(LoginContext);
    const [HospitalsData, setHospitalsData] = useState([]);
  
    const getHospitalsData = async () => {
        const result = await axios.get(loginDetails.URL + "/api/Hospital/HospitalRegistrationGetByAdmin");
        console.log(result.data);
        setHospitalsData(result.data);
    };
  
  useEffect(() => {
    getHospitalsData();
  }, [loginDetails]);



  const deleteHospitalsData = async (Id) => {
    const result = await axios.delete(loginDetails.URL + `/api/Hospital/HospitalDelete?Id=${Id}`);
    console.log(result);
    if (result.data == 1) {
      toast.success("Your data has been deleted Successfully");
      getHospitalsData();
    }
  };

  const UpdateHospitalData = async (Id) => {
    const result = await axios.put(loginDetails.URL + `/api/Hospital/HospitalStatusUpdate?Id=${Id}`);
    console.log(result);
    if (result.data == 1) {
      toast.success("Hospital registration has been approved");
      getHospitalsData();
    }
  };

  
  // const deleteHospitalsData = async (Id) => {
    
  //   const result = await axios.delete(``);
  //   console.log(result);
  //   if (result.data == 1) {
  //     alert("Data Deleted Successfully");
  //     getHospitalsData();
  //   }
  // };
    
  return (
    <div className='ManageHospital'>
           <ToastContainer/>
        <div className='hospitalTable'>
                        <table id='hospitals'>
                            <thead>
                                <th>SN.</th>
                                <th>Hospital Name</th>
                                <th>Image</th>
                                <th>Hospital Type</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>Map</th>
                                <th>Email</th>
                                <th>Hospital Registration Date</th>
                                <th>Health Care No</th>
                                <th>Status</th>
                                <th>Action</th>

                            </thead>

                            <tbody>
                                
                            {HospitalsData.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.hospitalName}</td>
                          <td>{data.image}</td>
                          <td>{data.hospitalType}</td>
                          <td>{data.phoneNumber}</td>
                          <td>{data.address}</td>
                          <td>{data.map}</td>
                          <td>{data.email}</td>
                          <td>{data.registrationDate}</td>
                          <td>{data.healthcareNumber}</td>
                          {(data.status == 1)?
                              <td><img src={approve} className='approveIcon' value="approve"/></td>

                          :

                             <td><img src={decline} className='declineIcon' value="decline" onClick={() => UpdateHospitalData(data.id)}/></td>

                          }

                          <td><img src={remove} className='deleteIcon' value="Delete" onClick={() => deleteHospitalsData(data.id)}/></td>
                        </tr>
                     ))}


                            </tbody>
                        </table>
            </div>
    </div>
  )
}


export default ManageHospital
import React, {useEffect, useState, useContext} from 'react'
import '../Assets/CSS/UserProfile.css'
import axios from 'axios'
import { LoginContext } from '../Context/LoginContext';
import {useParams} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {


    const {loginDetails,setLoginDetails} = useContext(LoginContext);
    const {id} = useParams()  
    const [UsersData, setUsersData] = useState({});

    
    const initialUsersValue ={
        id: '',
        fullName:'',
        address:'',
        phoneNumber:'',
        email:''
    }


    const [usersValue, setUsersValue] = useState(initialUsersValue)

    const handleEditChange = (e) =>{
      
        e.preventDefault();
        const {name, value} = e.target;
        setUsersValue({...usersValue,[name]:value});

    }


    const putUsersData = async (e) =>{
       
        
        const result = await axios.put(loginDetails.URL + '/api/User/UserRegistrationUpdate', usersValue)
       
        console.log(result)
        if(result.data == 1) {
            toast.success("Data has edited succesfully.")
            setUsersValue(initialUsersValue);
            getUsersData();
          
          
        }
        else{
            toast.error("Data can't be edited.")
        }
    
    }




  
    const getUsersData = async () => {
      const result = await axios.get(loginDetails.URL + `/api/User/UserRegistrationGetById?Id=${loginDetails.UserId}`);
     console.log(result.data[0]);
      setUsersData(result.data[0]);
      setUsersValue(result.data[0]);
    //   setUsersValue({...usersValue,id:loginDetails.UserId});
     
  };

  const [appointmentData, setAppointmentData] = useState([]);

  const getAppointmentData = async () => {
    const result = await axios.get(loginDetails.URL + `/api/BookAppointment/GetAppointmentByUserId?UserId=${loginDetails.UserId}`);
    setAppointmentData(result.data);

};

  useEffect(()=>{
    getUsersData();
    getAppointmentData();
   
  }, [loginDetails])


  return (
    <div className='UserProfile'> 
        <ToastContainer/>
        <div className='userInfoWrapup'>{/*this division covers the information about the user*/}
            <div className='infoRow1'> 
                <div className='userInfo'>
                    <label className="fName">Name: {UsersData.fullName} </label>
                </div>

                <div className='userInfo'>
                    <label className="address">Address: {UsersData.address}  </label>
                </div>
            </div>

            <div className='infoRow2'>
                <div className='userInfo'>
                    <label className="phoneNo">Phone Number: {UsersData.phoneNumber} </label>
                </div>

                <div className='userInfo'>
                    <label className="email">Email: {UsersData.email} </label>
                </div>
            </div>

        </div>{/*end of user inforwrapup division */}


        <button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#exampleModal"> Edit</button>

        <div className='editForm'>{/*this division covers modal of editing user info form*/}

                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content" >
                <div className="modal-header">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button><br/>
                    <h5 className="modal-title" id="exampleModalLabel" style={{marginLeft:'-18rem'}}>Edit Your Information.</h5>
                </div>
                
                <div className="modal-body">
                        <div>

                            <div className='row1'>
                                <div className='inputBox' >
                                    <label>Full Name</label>
                                    <input type="text" className='userEditInput' name='fullName' value={usersValue.fullName} onChange={handleEditChange}/>
                                </div>

                                <div className='inputBox'>
                                    <label>Address</label>
                                    <input type="text" className='userEditInput' name='address' value={usersValue.address} onChange={handleEditChange}/>
                                </div>
                            </div>

                            <div className="row2">
                                <div className='inputBox'>
                                    <label>Email</label>
                                    <input type="text" className='userEditInput' name='email' value={usersValue.email} onChange={handleEditChange}/>
                                </div>

                                <div className='inputBox' style={{marginLeft:'3.2rem'}}> 
                                    <label>Phone Number</label>
                                    <input type="text" className='userEditInput' name='phoneNumber' value={usersValue.phoneNumber} onChange={handleEditChange}/>
                                </div>
                            </div>
         
                        </div> 
                </div>
                <div className="modal-footer">
                    <input type="button" className="submitBtn" value="Submit" onClick={putUsersData}/>
                </div>
                </div>
            </div>
            </div>
        </div>{/*end of edit form division */}
    

        <div className='appointmentPortion'> {/*this division covers details of user appointments */}
                <h5>My Appointment</h5>

                    <div className='appointmentTable'>
                        <table id='appointmentDetail'>
                            <thead>
                                <th>SN.</th>
                                <th>Day and Date</th>
                                <th>Time</th>
                                <th>Hospital Name</th>
                                <th>Doctor Name</th>
                            </thead>

                            <tbody>
                                
                            {appointmentData.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.dateStr}</td>
                          <td>{data.time}</td>
                          <td>{data.hospitalName}</td>
                          <td>{data.doctorName}</td>
                        </tr>
                     ))}


                            </tbody>
                        </table>
            </div>
                
        </div>{/*end of appointment portion division */}

          
    </div>
  )
}

export default UserProfile
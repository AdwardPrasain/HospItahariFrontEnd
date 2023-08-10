import React, {useEffect, useContext, useState} from 'react'
import '../../Assets/CSS/ForAdmin/ManageUser.css'
import remove from '../../Assets/Images/deleteicon.png'
import approve from '../../Assets/Images/approveicon.png'
import decline from '../../Assets/Images/declineicon.png'
import axios from 'axios'
import { LoginContext,  } from '../../Context/LoginContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageUser = () => {


  
  const {loginDetails,setLoginDetails} = useContext(LoginContext);
  const [userData, setUserData] = useState([]);

  const getUserData = async () => {
      const result = await axios.get(loginDetails.URL + "/api/User/UserRegistrationGet");
      console.log(result.data);
      setUserData(result.data);
  };

useEffect(() => {
  getUserData();
}, [loginDetails]);


const deleteUserData = async (Id) => {
  const result = await axios.delete(loginDetails.URL + `/api/User/UserDelete?Id=${Id}`);
  console.log(result);
  if (result.data == 1) {
    toast.success("Data Deleted Successfully");
    getUserData();
  }
};


const UpdateUserData = async (Id) => {
  const result = await axios.put(loginDetails.URL + `/api/User/UserStatusUpdate?Id=${Id}`);
  console.log(result);
  if (result.data == 1) {
    toast.success("Status has been approved");
    getUserData();
  }
};

  return (
    <div className='ManageUser'>
     <ToastContainer/>
<div className='userTable'>
                        <table id='users'>
                            <thead>
                                <th>SN.</th>
                                <th>Full Name</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </thead>

                            <tbody>
                                
                            {userData.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.fullName}</td>
                          <td>{data.address}</td>
                          <td>{data.phoneNumber}</td>
                          <td>{data.email}</td>

                      {(data.status == 1)?
                        <td><img src={approve} className='approveIcon' value="approve"/></td>

                      :

                        <td><img src={decline} className='declineIcon' value="decline" onClick={() => UpdateUserData(data.id)}/></td>

                      }
                      
                          <td><img src={remove} className='deleteIcon' value="Delete" onClick={() => deleteUserData(data.id)}/></td>
                        </tr>
                     ))}


                            </tbody>
                        </table>
            </div>

    </div>
  )
}

export default ManageUser
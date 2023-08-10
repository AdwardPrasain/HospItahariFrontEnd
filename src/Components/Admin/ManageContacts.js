import React, {useEffect, useState, useContext} from 'react'
import '../../Assets/CSS/ForAdmin/ManageContact.css'
import axios from 'axios'
import remove from '../../Assets/Images/deleteicon.png'
import { LoginContext,  } from '../../Context/LoginContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageContacts = () => {

  const {loginDetails,setLoginDetails} = useContext(LoginContext);
  
  const [contactUsData, setContactUsData] = useState([]);

  const getContactUsData = async () => {
    const result = await axios.get(loginDetails.URL + "/api/ContactUs/ContactUsGet");
    console.log(result.data);
    setContactUsData(result.data);
  };

  const deleteContactUsData = async (Id) => {
    const result = await axios.delete(loginDetails.URL + `/api/ContactUs/ContactUsDelete?Id=${Id}`);
    console.log(result);
    if (result.data == 1) {
      toast.success("Data has been deleted Successfully");
      getContactUsData();
    }
  };

  useEffect(() => {
    getContactUsData();
  }, [loginDetails]);

  return (
    <div className='ManageContacts'>
      <ToastContainer/>
         <div className='contactUsInfo'> 
               <table id="list">
                    <thead>
                      <tr>
                        <th>S.N</th>
                        <th>Full Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                     {contactUsData.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.fullName}</td>
                          <td>{data.phoneNumber}</td>
                          <td>{data.email}</td>
                          <td>{data.message}</td>
                          <td><img src={remove} className='deleteIcon' onClick={() => deleteContactUsData(data.id)}/></td>
                        </tr>
                     ))}
                    </tbody>
                        
                  </table>
        </div>
    </div>
  )
}

export default ManageContacts
import React, {useState, useEffect, useContext} from 'react'
import '../../Assets/CSS/ForAdmin/ManageBloodBank.css'
import axios from 'axios'
import remove from '../../Assets/Images/deleteicon.png'
import { LoginContext,  } from '../../Context/LoginContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageBloodBank = () => {

    const {loginDetails,setLoginDetails} = useContext(LoginContext);

    const [bloodDonationData, setBloodDonationData] = useState([]);

    const getBloodDonationData = async () => {
      const result = await axios.get(loginDetails.URL + "/api/BloodDonation/BloodDonationGet");
      console.log(result.data);
      setBloodDonationData(result.data);
    };
  
    useEffect(() => {
      getBloodDonationData();
    }, [loginDetails]);


    const deleteBloodDonationData = async (Id) => {
        const result = await axios.delete(loginDetails.URL + `/api/BloodDonation/BloodDonationDelete?Id=${Id}`);
        console.log(result);
        if (result.data == 1) {
          toast.success("Donor data has been deleted Successfully");
          getBloodDonationData();
        }
      };

  return (
    <div className='ManageBloodBank'>
      <ToastContainer/>
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
                        <th>Action</th>
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
                          <td><img src={remove} className='deleteIcon'  onClick={() => deleteBloodDonationData(data.id)}/></td>
                        </tr>
                     ))}
                    </tbody>
                        
                  </table>
        </div>
    </div>
  )
}

export default ManageBloodBank
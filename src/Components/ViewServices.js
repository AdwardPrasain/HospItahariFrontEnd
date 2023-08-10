import React, {useState, useEffect,useContext }  from 'react'
import axios from 'axios'
import '../Assets/CSS/ViewServices.css'
import { LoginContext,} from '../Context/LoginContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sortBy from "lodash/sortBy";

const ViewServices = () => {
    const {loginDetails,setLoginDetails} = useContext(LoginContext);
    
    const [servicesData, setServicesData] = useState([]);

    const [inputData, setInputData] = useState();


    const getServicesData = async () => {
        const result = await axios.get(loginDetails.URL + `/api/Services/ServicesGetAll`);
        setServicesData(result.data);
    };

    const handleInputChange = async(e) =>{
      e.preventDefault();

      setInputData(e.target.value);

      const result = await axios.get(loginDetails.URL + `/api/Services/ServicesGetAll`);
      const filterDoctorsData = result.data.filter(x=>{
        return `${x.serviceName.toLowerCase()}`.includes(e.target.value.toLowerCase());
      })
      setServicesData(filterDoctorsData);
      setServicesData((prevState) => sortBy(prevState, ["serviceAmount"]));
  }


  // const onSearchClick = async() => {

  //   const result = await axios.get(loginDetails.URL + `/api/Services/ServicesGetAll`);
  //   const filterDoctorsData = result.data.filter(x=>{
  //     return `${x.serviceName.toLowerCase()}`.includes(inputData.toLowerCase());
  //   })
  //   setServicesData(filterDoctorsData);

  //   // setServicesData((prevState) => sortBy(prevState, ["serviceAmount"]));

  // }


  useEffect(() => {
    getServicesData();
  }, [loginDetails]);

  return (
    <div className='ViewServices' >
   <div className='box2'>{/*This division contains table of added data from the services*/}
              
                <div style={{margin:'0.5rem'}}> 
                  <p>View services avialable from hospitals.</p>
                  <input type="text" className='searchText' placeholder='search services....' onChange={handleInputChange}/>
                </div>

                <div className='servicesTable'>
                    <table id='services'>
                        <thead>
                            <tr>
                                <th>SN.</th>
                                <th>Service Name</th>
                                <th>Amount in rupees</th>
                                <th>Hospital Name</th>
                            </tr>
                        </thead>

                    <tbody>
                     {servicesData.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.serviceName}</td>
                          <td>{data.serviceAmount}</td>
                          <td>{data.hospitalName}</td>
                        </tr>
                     ))}
                     </tbody>
                    </table>
                </div>
                
                
            </div>{/*End of box2 div*/}
    </div>
  )
}

export default ViewServices
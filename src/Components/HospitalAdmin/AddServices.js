import React, {useState, useEffect,useContext }  from 'react'
import axios from 'axios'
import '../../Assets/CSS/AddServices.css'
import edit from '../../Assets/Images/editicon.png'
import remove from '../../Assets/Images/deleteicon.png'
import { LoginContext,} from '../../Context/LoginContext'
import { ServerStyleSheet } from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddServices = () => {

  const {loginDetails,setLoginDetails} = useContext(LoginContext);
  const [updateId, setUpdateId] = useState(0);

    const initialServicesData = {
        id:0,
        serviceName:'',
        serviceAmount:'',
        hospitalId:loginDetails.HospitalId
    }



    const [serviceValue, setServiceValue] = useState(initialServicesData);
    const [errors, setError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const validation = (values) => {
        let errors = {}
  
        if (!values.serviceName) {
          errors.serviceName = "Please insert the name of services."
        }
        else if(!values.serviceAmount) {
          errors.serviceAmount = "Please insert service amount."
        }
        else {
          setIsSubmit(true);
        }
    
        return errors; 
      }

      useEffect(()=> {
        if(Object.keys(errors).length === 0 && isSubmit === true){

          if(updateId){
            updateServicesData();
          }
          else {
            postServicesData();

          }
        }
      },[errors]);


      const handleServicesChange = (e) =>{
        e.preventDefault();
        const {name, value} = e.target;
        setServiceValue({...serviceValue,[name]:value});
    }
    

    const onAddClick = (e) =>{
        e.preventDefault();
        setError(validation(serviceValue));
    }

    
      const postServicesData = async (e) =>{
        console.log(serviceValue);
        const result = await axios.post(loginDetails.URL +'/api/Services/ServicesInsert', serviceValue)
       

        if(result.data == 1) {
            toast.success("Your services has been added.")
            setServiceValue(initialServicesData);
            setIsSubmit(false);
            getServicesData();
        }
        else{
            alert("Your services can't be registered.")
        }

    }



    const [servicesData, setServicesData] = useState([]);

    const getServicesData = async () => {
        const result = await axios.get(`https://localhost:7294/api/Services/ServicesGet?HospId=${loginDetails.HospitalId}`);
        console.log(result.data);
        setServicesData(result.data);
    };

  useEffect(() => {
    getServicesData();
  }, [loginDetails]);

  const deleteServicesData = async (Id) => {
    const result = await axios.delete(`https://localhost:7294/api/Services/ServicesDelete?Id=${Id}`);
    console.log(result);
    if (result.data == 1) {
      toast.success("Data has been deleted Successfully");
      getServicesData();
    }
  };


/*For Edit  */





  const getServicesByIdData = async (Id) => {
    const result = await axios.get(loginDetails.URL + `/api/Services/ServicesGetById?Id=${Id}`);
    setServiceValue(result.data[0]);
    setUpdateId(Id)
  };


  const onUpdateClick = (e) =>{
    e.preventDefault();
    setServiceValue({...serviceValue,id:updateId});
    setError(validation(serviceValue));

  }

const updateServicesData = async (e) =>{
  console.log(serviceValue)
  const result = await axios.put(loginDetails.URL +'/api/Services/ServicesUpdate', serviceValue)
 

  if(result.data == 1) {
      toast.success("Your data has been updated successfully.")
      setServiceValue(initialServicesData);
      setIsSubmit(false);
      getServicesData();
      setUpdateId(0);
  }
  else{
      toast.error("Data can't be updated.")
  }

}

  return (
    <div className='AddServices'>{/*This is the main division of add services form and covers the background image and the container div*/}
    <ToastContainer/>
        <div className='container'>{/*The container division covers all the elements of add services form */}

            <div className='box1'>{/*This division contains the form for adding services and their price*/}
                <p>Please fill the form in order to add services of your hospital!</p>

                <div className='input-box'>
                    <label className='lblService'>Service Name</label><br/>
                    <input type='text' className='serviceInput' name="serviceName" value={serviceValue.serviceName} onChange={handleServicesChange}/>
                    {errors.serviceName && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'-1rem', marginTop:'0.3rem'}}>{errors.serviceName}</p>}
                </div>

                <div className='input-box'>
                    <label className='lblAmount'>Amount</label><br/>
                    <input type='text' className='amountInput'  name="serviceAmount" value={serviceValue.serviceAmount} onChange={handleServicesChange}/>
                    {errors.serviceAmount && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'-3rem', marginTop:'0.3rem'}}>{errors.serviceAmount}</p>}
                </div>

                {(updateId) ?
                  <input type='button' className='addButton' value='Update' onClick={onUpdateClick}/>
              :
              
                <input type='button' className='addButton' value='Add' onClick={onAddClick}/>
              }


            </div>{/*End of box1 div*/}

            <div className='box2'>{/*This division contains table of added data from the services*/}
                <p>Here you can edit or delete the services of your hospital.</p>
                <div className='servicesTable'>
                    <table id='services'>
                        <thead>
                            <tr>
                                <th>SN.</th>
                                <th>Service Name</th>
                                <th>Amount in rupees</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                    <tbody>
                     {servicesData.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.serviceName}</td>
                          <td>{data.serviceAmount}</td>
                          <td><img src={edit} className='editIcon' value="Edit" onClick={() => getServicesByIdData(data.id)}/>|<img src={remove} className='deleteIcon' value="Delete" onClick={() => deleteServicesData(data.id)}/></td>
                        </tr>
                     ))}
                     </tbody>
                    </table>
                </div>
                
                
            </div>{/*End of box2 div*/}
        </div>{/*End of container division*/}
    </div>/*End of add services division */
  )
}

export default AddServices
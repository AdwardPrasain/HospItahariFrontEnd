import React, {useEffect, useState, useContext } from 'react'
import {useParams} from "react-router-dom"
import axios from 'axios';
import '../../Assets/CSS/AddDoctorSchedule.css'
import { LoginContext } from '../../Context/LoginContext';
import edit from '../../Assets/Images/editicon.png'
import remove from '../../Assets/Images/deleteicon.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DoctorSchedule = () => {


    const initialDoctorScheduleData = {
       DoctorId:'',
       NumberOfPatient:'',
       Day:'',
       Time:'',
    
    }


    const [doctorScheduleData, setDoctorScheduleData] = useState(initialDoctorScheduleData);
    const [errors, setError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


    const validation = (values) => {
        let errors = {}
  
        if (!values.DoctorId) {
          errors.DoctorId = "Please select the Doctor."
        }
        else if(!values.NumberOfPatient) {
            errors.NumberOfPatient = "Please insert the number of patient."
          }
        else if(!values.Day) {
          errors.Day = "Please select the day."
        }

        else if(!values.Time) {
            errors.Time = "Please select the time."
          }
         
        else {
          setIsSubmit(true);
        }
    
        return errors; 
      }


      useEffect(()=> {
        if(Object.keys(errors).length === 0 && isSubmit === true){
          postDoctorScheduleData();
        }
      },[errors]);


      const handleDoctorScheduleChange = (e) =>{
        e.preventDefault();
        const {name, value} = e.target;
        setDoctorScheduleData({...doctorScheduleData,[name]:value});
    }
    

    const onAddClick = (e) =>{
        e.preventDefault();
        setError(validation(doctorScheduleData));
    }

    const postDoctorScheduleData = async (e) =>{
        console.log(doctorScheduleData);
        const result = await axios.post(loginDetails.URL +'/api/DoctorSchedule/DoctorScheduleInsert', doctorScheduleData)
       

        if(result.data == 1) {
            toast.success("The sschedule of doctor has been added successfully.")
            setDoctorScheduleData(initialDoctorScheduleData);
            setIsSubmit(false);
            getDoctorScheduleValue();
           
        }
        else{
            toast.error("Doctor schedule can't be added.")
        }

    }


    const [doctorScheduleValue, setDoctorScheduleValue] = useState([]);

    const getDoctorScheduleValue = async () => {
        const result = await axios.get(loginDetails.URL +`/api/DoctorSchedule/DoctorScheduleGet?HospitalId=${loginDetails.HospitalId}`);
        console.log(result.data);
        setDoctorScheduleValue(result.data);

    };

  useEffect(() => {
   
  }, []);


  const deleteDoctorScheduleData = async (Id) => {
    const result = await axios.delete(loginDetails.URL + `/api/DoctorSchedule/DoctorScheduleDelete?Id=${Id}`);
    console.log(result);
    if (result.data == 1) {
      toast.success("Doctor Schedule has been deleted Successfully");
      getDoctorScheduleValue();
    }
  };







/*<-----For doctors data get----->*/

    const [doctorsData, setDoctorsData] = useState([]);
    const {loginDetails,setLoginDetails} = useContext(LoginContext);
    const {id} = useParams()

    const getDoctorsData = async () => {
        const result = await axios.get(loginDetails.URL + `/api/Doctors/DoctorsGet?HospId=${loginDetails.HospitalId}`);
        console.log(result);
        setDoctorsData(result.data);
    };

useEffect(() => {

    if(loginDetails.URL){
    
      getDoctorsData();
      getDoctorScheduleValue();
    }
  
  }, [loginDetails]);

  return (
    <div className='DoctorSchedule'>
      <ToastContainer/>
         <div className='container'>{/*The container division covers all the elements of add services form */}

                        <div className='box1'>{/*This division contains the form for adding services and their price*/}
                <p>Please fill the form in order to add schedules for your doctor!</p>

            <div className='same-row'>
                <div className='input-box'>
                    <label className='lblDoctorId'>Doctor</label><br/>
                    <select type='text' className='doctorIdInput' name="DoctorId" value={doctorScheduleData.DoctorId} onChange={handleDoctorScheduleChange}>
                        <option value="">Select</option>
                        {doctorsData.map((data, index) => ( 
                                <option key={index} value={data.id}>{data.fullName}</option>
                           ))}
                    </select>    
                    {errors.DoctorId && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'-1rem', marginTop:'0.3rem'}}>{errors.DoctorId}</p>} 
                </div>

                
                <div className='input-box'>
                    <label className='lblNoOfPatient'>Number of Patient</label><br/>
                    <input type='text' className='noOfPatientInput' name="NumberOfPatient" value={doctorScheduleData.NumberOfPatient} onChange={handleDoctorScheduleChange}/>   
                    {errors.NumberOfPatient && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'-1rem', marginTop:'0.3rem'}}>{errors.NumberOfPatient}</p>}
                </div>

            </div>


            <div className='same-row'>
            
                <div className='input-box'>
                        <label className='lblDay'>Day</label><br/>
                        <select type='text' className='dayInput' name="Day" value={doctorScheduleData.Day} onChange={handleDoctorScheduleChange}>
                            <option value=''>Select</option>
                            <option value='0'>Sunday</option>
                            <option value='1'>Monday</option>
                            <option value='2'>Tuesday</option>
                            <option value='3'>Wednesday</option>
                            <option value='4'>Thursday</option>
                            <option value='5'>Friday</option>
                            <option value='6'>Saturday</option>
                        </select>
                        {errors.Day && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'-1rem', marginTop:'0.3rem'}}>{errors.Day}</p>}
                        
                    </div>

                    <div className='input-box'>
                        <label className='lblTime'>Time</label><br/>
                        <select type='text' className='timeInput' name="Time" value={doctorScheduleData.Time} onChange={handleDoctorScheduleChange}>
                            <option value='0'>Select</option>
                            <option value='1'>8 AM</option>
                            <option value='2'>9 AM </option>
                            <option value='3'>10 AM</option>
                            <option value='4'>11 AM</option>
                            <option value='5'>12 PM</option>
                            <option value='6'>1 PM</option>
                            <option value='7'>2 PM</option>
                            <option value='8'>3 PM</option>
                            <option value='9'>4 PM</option>
                            <option value='10'>5 PM</option>
                            <option value='11'>6 PM</option>
                        </select>
                        {errors.Time && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'-1rem', marginTop:'0.3rem'}}>{errors.Time}</p>}
                    </div>

            </div> 

              

                <input type='button' className='addButton' value='Add' onClick={onAddClick}/>

            </div>{/*End of box1 div*/}

            <div className='box2'>{/*This division contains table of added data from the services*/}
                <p>Here you can edit or delete the schedule of your doctors.</p>
                <div className='servicesTable'>
                    <table id='services'>
                        <thead>
                            <tr>
                                <th>SN.</th>
                                <th>Doctor Name</th>
                                <th>Number Of Patient</th>
                                <th>Day</th>
                                <th>Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                    <tbody>
                     {doctorScheduleValue.map((data, index) => (
                        <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.doctorName}</td>
                        <td>{data.numberOfPatient}</td>
                        <td>{data.day}</td>
                        <td>{data.time}</td>
                        <td><img src={edit} className='editIcon' alt='edit'/>|<img src={remove} className='deleteIcon' value="Delete" onClick={() => deleteDoctorScheduleData(data.id)}/></td>
                        </tr>
                    ))} 
                    </tbody>
                    </table>
                </div>
                
                
            </div>{/*End of box2 div*/}
            </div>{/*End of container division*/}
    </div>
  )
}

export default DoctorSchedule
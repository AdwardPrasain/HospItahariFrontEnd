import React, {useState, useEffect,useContext} from 'react'
import axios from 'axios'
import '../../Assets/CSS/AddDoctors.css'
import edit from '../../Assets/Images/editicon.png'
import remove from '../../Assets/Images/deleteicon.png'
import { LoginContext,  } from '../../Context/LoginContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDoctors = () => {

    const {loginDetails,setLoginDetails} = useContext(LoginContext);

    const initialDoctorsData = {

       FullName:'',
       Image:'',
       NmcNumber:'',
       Experience:'',
       Speciality:'',
       Qualification:'',
       ConsulationFee:'',
       HospitalId:loginDetails.HospitalId

    }


    const [doctorValue, setDoctorValue] = useState(initialDoctorsData);
    const [errors, setError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [chosenFile, setChosenFile] = useState(''); 

    const validation = (values) => {
        let errors = {}
  
        if (!values.FullName) {
          errors.FullName = "Please insert the full name of doctor."
        }
        // else if(!values.Image) {
        //   errors.Image = "*"
        // }
        else if(!values.NmcNumber) {
            errors.NmcNumber = "Please insert the NMC number."
        }
        else if(!values.Experience) {
            errors.Experience = "Please insert doctor's experience."
        }
        else if(!values.Speciality  ) {
            errors.Speciality = "Please insert doctor's speciality."
        }
        else if(!values.Qualification) {
            errors.Qualification = "Please insert doctor's qualification."
        }
        else if(!values.ConsulationFee) {
            errors.ConsulationFee = "Please insert doctor's consultation fee."
        }
        else {
          setIsSubmit(true);
        }
    
        return errors; 
      }

      useEffect(()=> {
        if(Object.keys(errors).length === 0 && isSubmit === true){
          postDoctorsData();
        }
      },[errors]);

      
    // const onImageChange = (e) => {
    //     setChosenFile(e.target.files[0]);
    //     setDoctorValue({ ...doctorValue, ImageName: e.target.files[0].name });
    //  };

      const handleDoctorsChange = (e) =>{
        e.preventDefault();
        const {name, value} = e.target;
        setDoctorValue({...doctorValue,[name]:value});
    }
    

    const onAddClick = (e) =>{
        e.preventDefault();
        setError(validation(doctorValue));
    }


    const onImageChange = (e) => {
        setChosenFile(e.target.files[0]);
        setDoctorValue({ ...doctorValue, Image: e.target.files[0].name });
      };
    
      const onImageUpload =() =>{
        const formData =new FormData();
        formData.set("Image",chosenFile);
        formData.set("ImageName", chosenFile.name);
            formData.set("FolderName", "DoctorImages");
    
            axios.post('https://localhost:7294/api/File/FileUpload', formData, {
              headers: {
               'content-type': 'multipart/form-data' // do not forget this 
              }})
        }
    

    
      const postDoctorsData = async (e) =>{
        const result = await axios.post(loginDetails.URL + '/api/Doctors/DoctorsInsert', doctorValue)
       

        if(result.data == 1) {
            toast.success("The information has been added successfully.")
            setDoctorValue(initialDoctorsData);
            setIsSubmit(false);
            getDoctorsData();
            onImageUpload();
        }
        else{
            toast.error("Data can't be added.")
        }

    }

    const [doctorsData, setDoctorsData] = useState([]);

    const getDoctorsData = async () => {
        const result = await axios.get(`https://localhost:7294/api/Doctors/DoctorsGet?HospId=${loginDetails.HospitalId}`);
        console.log(result.data);
        setDoctorsData(result.data);
    };

  useEffect(() => {
    getDoctorsData();
  }, [loginDetails]);


  const deleteDoctorsData = async (Id) => {
    
    const result = await axios.delete(`https://localhost:7294/api/Doctors/DoctorsDelete?Id=${Id}`);
    console.log(result);
    if (result.data == 1) {
      toast.success("Data has been deleted Successfully");
      getDoctorsData();
    }
  };


  return (
    <div className='AddDoctors'>{/*This is the main division of add docttors form and covers the background image and the container div*/}
    <ToastContainer/>
        <div className='container'>{/*The container division covers all the elements of add services form */}
            <div className='box1'>{/*This division contains the form for adding doctors data*/}
                <p>Please fill the form in order to add description of your doctors!</p>

                <div className='same-row'> 
                    <div className='input-box'>
                        <label className='lblname'>Full Name</label>  <br/> 
                        <input  type="text"  className="NameInput" name="FullName"value={doctorValue.FullName} onChange={handleDoctorsChange}/>
                        {errors.FullName && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'-3rem', marginTop:'0.3rem'}}>{errors.FullName}</p>}
                    </div>

                    <div className="doctorPhoto">
                        <label for='inputTag' className='lblImage'>
                            Click to insert your photo <br/>
                            <i className='fa fa-2x fa-camera'></i>
                            <input id='inputTag' type='file' name='docPhoto' onChange={onImageChange}/><br/>
            
                            <img src='camera.png' className='cam' alt=''/> 
                        </label>
                    </div>
                </div>

                <div className='same-row'>
                    <div className='input-box'>
                        <label className='lblNmc'>NMC Number</label> <br/> 
                        <input  type="text"  className="nmcInput" name="NmcNumber" value={doctorValue.NmcNumber} onChange={handleDoctorsChange}/>
                        {errors.NmcNumber && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'-3rem', marginTop:'0.3rem'}}>{errors.NmcNumber}</p>}
                    </div>

                    <div className='input-box'>
                        <label className='lblExperience'>Experience</label> <br/> 
                        <input  type="text"  className="experienceInput" name="Experience" value={doctorValue.Experience} onChange={handleDoctorsChange}/>
                        {errors.Experience && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'-3rem', marginTop:'0.3rem'}}>{errors.Experience}</p>}
                        
                    </div>
                </div>

                <div className='same-row'>
                    <div className='input-box'>
                        <label className='lblSpeciality'>Specialty</label> <br/> 
                        <textarea  className="specialityInput" name="Speciality" value={doctorValue.Speciality} onChange={handleDoctorsChange}/>
                        {errors.Speciality && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'-3rem', marginTop:'0.3rem'}}>{errors.Speciality}</p>}
                    </div>

                    <div className='input-box'>
                        <label className='lblQualification'>Qualification</label> <br/> 
                        <textarea className="qualificationInput" name="Qualification" value={doctorValue.Qualification} onChange={handleDoctorsChange}/>
                        {errors.Qualification && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'-3rem', marginTop:'0.3rem'}}>{errors.Qualification}</p>}
                    </div>
                </div>
                
              
                
                <div className='same-row'>
                <   div className='input-box'>
                        <label className='lblFee'>Consultation Fee</label> <br/> 
                        <input  type="text"  className="feeInput" name="ConsulationFee" value={doctorValue.ConsulationFee} onChange={handleDoctorsChange}/>
                        {errors.ConsulationFee && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'-3rem', marginTop:'0.3rem'}}>{errors.ConsulationFee}</p>}
                    </div>

                    <input type='button' className='addButton' value='Add' onClick={onAddClick}/>
                </div>
                   
            </div>{/*End of box1 div*/}

            <div className='box2'>{/*This division contains table of added data of doctors*/}
                <p>Here you can edit or delete the information of your doctors.</p>
                    <div className='doctorsTable'>
                        <table id='doctors'>
                            <thead>
                                <th>SN.</th>
                                <th>Full Name</th>
                                <th>NMC Number</th>
                                <th>Experience</th>
                                <th>Specialty</th>
                                <th>Qualification</th>
                                <th>Consultation Fee</th>
                                <th>Action</th>
                            </thead>

                            <tbody>
                     {doctorsData.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.fullName}</td>
                          <td>{data.nmcNumber}</td>
                          <td>{data.experience}</td>
                          <td>{data.speciality}</td>
                          <td>{data.qualification}</td>
                          <td>{data.consulationFee}</td>
                          <td><img src={edit} className='editIcon' alt='edit'/>|<img src={remove} className='deleteIcon' value="Delete" onClick={() => deleteDoctorsData(data.id)}/></td>
                        </tr>
                     ))}
                     </tbody>
                        </table>

                    </div>
            </div>{/*End of box2 div*/}
        </div>{/*End of container division*/}
    </div>/*End of add doctors division */
  )
}

export default AddDoctors
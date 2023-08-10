import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios';
import '../../Assets/CSS/ForAdmin/ManageAvailableBloods.css'
import { LoginContext,  } from '../../Context/LoginContext'
import edit from '../../Assets/Images/editicon.png'
import remove from '../../Assets/Images/deleteicon.png'
import bloodbg from '../../Assets/Images/Bloodbg.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageAvailableBloods = () => {

  const {loginDetails,setLoginDetails} = useContext(LoginContext);

/*<----- Function for inserting available blood form and error validation*/
const initialAvailableBloodValue = {
  bloodGroup:'',
  numberOfPouchAvailable:'',
}

const [availableBloodValue, setAvailableBloodValue] = useState(initialAvailableBloodValue);
const [errors, setError] = useState({})
const [isSubmit, setIsSubmit] = useState(false);

const validation = (values) => {
  let errors = {}

  if (!values.bloodGroup) {
    errors.bloodGroup= '*'
  }
  else if(!values.numberOfPouchAvailable) {
    errors.numberOfPouchAvailable = '*'
  }
  else {
    setIsSubmit(true);
  }

  return errors;

}


const postAvailableBloodValues = async (e) =>{
  const result = await axios.post(loginDetails.URL+'/api/AvailableBlood/AvailableBloodInsert', availableBloodValue)
  console.log(result)
 

  if(result.status == 200) {
      toast.success("Number of bloods has been added.")
      setAvailableBloodValue(initialAvailableBloodValue);
      setIsSubmit(false);
      getAvailableBlood();
  }
  else{
      toast.error("Data can't be added.")
  }

}


const handleAvailableBloodChange = (e) =>{
  e.preventDefault();
  const {name, value} = e.target;
  setAvailableBloodValue({...availableBloodValue,[name]:value});
}


const onAddClick = (e) =>{
  e.preventDefault();
  setError(validation(availableBloodValue));
}

useEffect(()=> {
  if(Object.keys(errors).length === 0 && isSubmit === true){
    postAvailableBloodValues();
  }
},[errors]);




/*<----- Get method for get available blood data ----->*/
  const [availableBloodData, setAvailableBloodData] = useState([]);

    const getAvailableBlood = async () => {
    const result = await axios.get(loginDetails.URL + "/api/AvailableBlood/AvailableBloodGet");
    console.log(result.data);
    setAvailableBloodData(result.data);
  };

/*<----- For deleting added blood -----> */

  const deleteAvailableBlood = async (Id) => {
    const result = await axios.delete(loginDetails.URL +`/api/AvailableBlood/AvailableBloodDelete?Id=${Id}`);
    console.log(result);
    if (result.data == 1) {
      toast.success("Data Deleted Successfully");
      getAvailableBlood();
    }
  };


  useEffect(() => {
    getAvailableBlood();
  }, [loginDetails]);


  return (
    <div className='ManageAvailableBloods'>
        <ToastContainer/>
        <div className='availableBloods'>
          <table id="bloodsAvailable">
                      <thead>
                        <tr>
                          <th>S.N</th>
                          <th>Blood Groups</th>
                          <th>Number of Pouch</th> 
                          <th>Action</th>
                        </tr>
                      </thead>
                      
                      <tbody style={{textAlign:'center'}}>
                        {availableBloodData.map((data, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.bloodGroup}</td>
                                <td>{data.numberOfPouchAvailable}</td>
                                <td><img src={edit} className='editIcon' value="Edit"/>|
                                <img src={remove} className='deleteIcon' value="Delete" onClick={() => deleteAvailableBlood(data.id)}/></td>
                              </tr>
                          ))}
                      </tbody>
                          
            </table>
        </div> {/*end of available-bloods div*/}

{/*<----- For adding available blood popup form ----->*/}

<button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#exampleModal" style ={{marginBottom:'2rem',marginLeft:'2rem',   backgroundColor:'rgb(87, 157, 157)', color:'white', marginTop:'2rem'}}>Add available bloods</button>

  <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" >
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button><br/>
          <img src={bloodbg} style={{height:'6rem',width:'8rem'}}/>
          
       </div>
       
      <div className="modal-body" >
            <div>
                        
                <div className='wrapUp'>

                <div className='input-box'>
                  <label className='lblBloodgroup'>Bloodgroup</label> <br/> 
                  <select className='bloodGroupInput' name="bloodGroup" value={availableBloodValue.bloodGroup} onChange={handleAvailableBloodChange}>    
                      <option>choose</option>          
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>O+</option>
                      <option>O-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                  </select>
                  {errors.bloodGroup && <p style={{fontSize:'1.5rem', fontWeight:'bold', color:'#661818',marginLeft:'6rem', marginTop:'-2rem'}}>{errors.bloodGroup}</p>}
                </div>

                    <div className='input-box1'>
                        <label>Number of Pouch Available</label><br/>
                         <input type="text" className='pouchInput' name='numberOfPouchAvailable'  value={availableBloodValue.numberOfPouchAvailable} onChange={handleAvailableBloodChange} />
                         {errors.numberOfPouchAvailable && <p style={{fontSize:'1.5rem', fontWeight:'bold', color:'#661818',marginLeft:'13.5rem', marginTop:'-2rem'}}>{errors.numberOfPouchAvailable}</p>}
                    </div>
                </div>
          
            </div> 
      </div>
      <div className="modal-footer">
        <input type="button" className="addBtn" value="Add" onClick={onAddClick} style={{backgroundColor:'teal', border:'0.1rem solid teal', borderRadius:'0.2rem', color:'white'}}/>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default ManageAvailableBloods
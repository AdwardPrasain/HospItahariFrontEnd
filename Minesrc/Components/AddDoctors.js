import React from 'react'
import '../Assets/CSS/AddDoctors.css'
import edit from '../Assets/Images/editicon.png'
import remove from '../Assets/Images/deleteicon.png'

const AddDoctors = () => {
  return (
    <div className='AddDoctors'>{/*This is the main division of add docttors form and covers the background image and the container div*/}
        <div className='container'>{/*The container division covers all the elements of add services form */}
            <div className='box1'>{/*This division contains the form for adding doctors data*/}
                <p>Please fill the form in order to add description of your doctors!</p>

                <div className='same-row'> 
                    <div className='input-box'>
                        <label className='lblname'>Full Name</label>  <br/> 
                        <input  type="text"  className="NameInput"/>
                    </div>

                    <div className="doctorPhoto">
                        <label for='inputTag' className='lblImage'>
                            Click to insert your photo <br/>
                            <i className='fa fa-2x fa-camera'></i>
                            <input id='inputTag' type='file' name='docPhoto'/><br/>
            
                            <img src='camera.png' className='cam' alt=''/> 
                        </label>
                    </div>
                </div>

                <div className='same-row'>
                    <div className='input-box'>
                        <label className='lblNmc'>NMC Number</label> <br/> 
                        <input  type="text"  className="nmcInput"/>
                    </div>

                    <div className='input-box'>
                        <label className='lblExperience'>Experience</label> <br/> 
                        <input  type="text"  className="experienceInput"/>
                        
                    </div>
                </div>

                <div className='same-row'>
                    <div className='input-box'>
                        <label className='lblSpeciality'>Speciality</label> <br/> 
                        <textarea  className="specialityInput"/>
                    </div>

                    <div className='input-box'>
                        <label className='lblQualification'>Qualification</label> <br/> 
                        <textarea className="qualificationInput"/>
                    </div>
                </div>
                
                <div className='same-row'>
                    <div className='input-box'>
                        <label className='lblTime'>Available Time</label> <br/> 
                        <input  type="text"  className="timeInput"/>
                    </div>

                    <div className='input-box'>
                        <label className='lblFee'>Consulation Fee</label> <br/> 
                        <input  type="text"  className="feeInput"/>
                    </div>
                </div>

                <input type='button' className='addButton' value='Add'/>
            </div>{/*End of box1 div*/}

            <div className='box2'>{/*This division contains table of added data of doctors*/}
                <p>Here you can edit or delete the information of your doctors.</p>
                    <div className='doctorsTable'>
                        <table id='doctors'>
                            <thead>
                                <th>Full Name</th>
                                <th>NMC Number</th>
                                <th>Experience</th>
                                <th>Speciality</th>
                                <th>Qualification</th>
                                <th>Available Time</th>
                                <th>Consulation Fee</th>
                                <th>Action</th>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>Susan Rayamajhi</td>
                                    <td>090909</td>
                                    <td>5 years</td>
                                    <td>Neuro Surgeon</td>
                                    <td>D.O</td>
                                    <td>11am-3pm</td>
                                    <td>1500</td>
                                    <td><img src={edit} className='editIcon' alt='edit'/>|<img src={remove} className='deleteIcon' alt='edit'/></td>
                                </tr>

                                <tr>
                                    <td>Susan Rayamajhi</td>
                                    <td>090909</td>
                                    <td>5 years</td>
                                    <td>Neuro Surgeon</td>
                                    <td>D.O</td>
                                    <td>11am-3pm</td>
                                    <td>1500</td>
                                    <td><img src={edit} className='editIcon' alt='edit'/>|<img src={remove} className='deleteIcon' alt='edit'/></td>
                                </tr>

                                <tr>
                                    <td>Susan Rayamajhi</td>
                                    <td>090909</td>
                                    <td>5 years</td>
                                    <td>Neuro Surgeon</td>
                                    <td>D.O</td>
                                    <td>11am-3pm</td>
                                    <td>1500</td>
                                    <td><img src={edit} className='editIcon' alt='edit'/>|<img src={remove} className='deleteIcon' alt='edit'/></td>
                                </tr>

                                <tr>
                                    <td>Susan Rayamajhi</td>
                                    <td>090909</td>
                                    <td>5 years</td>
                                    <td>Neuro Surgeon</td>
                                    <td>D.O</td>
                                    <td>11am-3pm</td>
                                    <td>1500</td>
                                    <td><img src={edit} className='editIcon' alt='edit'/>|<img src={remove} className='deleteIcon' alt='edit'/></td>
                                </tr>

                                <tr>
                                    <td>Susan Rayamajhi</td>
                                    <td>090909</td>
                                    <td>5 years</td>
                                    <td>Neuro Surgeon</td>
                                    <td>D.O</td>
                                    <td>11am-3pm</td>
                                    <td>1500</td>
                                    <td><img src={edit} className='editIcon' alt='edit'/>|<img src={remove} className='deleteIcon' alt='edit'/></td>
                                </tr>

                                <tr>
                                    <td>Susan Rayamajhi</td>
                                    <td>090909</td>
                                    <td>5 years</td>
                                    <td>Neuro Surgeon</td>
                                    <td>D.O</td>
                                    <td>11am-3pm</td>
                                    <td>1500</td>
                                    <td><img src={edit} className='editIcon' alt='edit'/>|<img src={remove} className='deleteIcon' alt='edit'/></td>
                                </tr>

                                <tr>
                                    <td>Susan Rayamajhi</td>
                                    <td>090909</td>
                                    <td>5 years</td>
                                    <td>Neuro Surgeon</td>
                                    <td>D.O</td>
                                    <td>11am-3pm</td>
                                    <td>1500</td>
                                    <td><img src={edit} className='editIcon' alt='edit'/>|<img src={remove} className='deleteIcon' alt='edit'/></td>
                                </tr>

                                <tr>
                                    <td>Susan Rayamajhi</td>
                                    <td>090909</td>
                                    <td>5 years</td>
                                    <td>Neuro Surgeon</td>
                                    <td>D.O</td>
                                    <td>11am-3pm</td>
                                    <td>1500</td>
                                    <td><img src={edit} className='editIcon' alt='edit'/>|<img src={remove} className='deleteIcon' alt='edit'/></td>
                                </tr>

                                <tr>
                                    <td>Susan Rayamajhi</td>
                                    <td>090909</td>
                                    <td>5 years</td>
                                    <td>Neuro Surgeon</td>
                                    <td>D.O</td>
                                    <td>11am-3pm</td>
                                    <td>1500</td>
                                    <td><img src={edit} className='editIcon' alt='edit'/>|<img src={remove} className='deleteIcon' alt='edit'/></td>
                                </tr>




                            </tbody>
                        </table>

                    </div>
            </div>{/*End of box2 div*/}
        </div>{/*End of container division*/}
    </div>/*End of add doctors division */
  )
}

export default AddDoctors
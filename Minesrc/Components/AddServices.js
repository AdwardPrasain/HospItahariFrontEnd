import React from 'react'
import '../Assets/CSS/AddServices.css'
import edit from '../Assets/Images/editicon.png'
import remove from '../Assets/Images/deleteicon.png'

const AddServices = () => {
  return (
    <div className='AddServices'>{/*This is the main division of add services form and covers the background image and the container div*/}
        <div className='container'>{/*The container division covers all the elements of add services form */}

            <div className='box1'>{/*This division contains the form for adding services and their price*/}
                <p>Please fill the form in order to add services of your hospital!</p>

                <div className='input-box'>
                    <label className='lblService'>Service Name</label><br/>
                    <input type='text' className='serviceInput'/>
                </div>

                <div className='input-box'>
                    <label className='lblAmount'>Amount</label><br/>
                    <input type='text' className='amountInput'/>
                </div>

                <input type='button' className='addButton' value='Add'/>

            </div>{/*End of box1 div*/}

            <div className='box2'>{/*This division contains table of added data from the services*/}
                <p>Here you can edit or delete the services of your hospital.</p>
                <div className='servicesTable'>
                    <table id='services'>
                        <thead>
                            <tr>
                                <th>Service Name</th>
                                <th>Amount in rupees</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>X-ray</td>
                                <td>500</td>
                                <td> <img src={edit} className='editIcon' alt='edit'/> | <img src={remove} className='deleteIcon' alt='edit'/></td>
                            </tr>

                            <tr>
                                <td>X-ray</td>
                                <td>500</td>
                                <td><img src={edit} className='editIcon' alt='edit'/> | <img src={remove} className='deleteIcon' alt='edit'/></td>
                            </tr>

                            <tr>
                                <td>X-ray</td>
                                <td>500</td>
                                <td><img src={edit} className='editIcon' alt='edit'/> | <img src={remove} className='deleteIcon' alt='edit'/></td>
                            </tr>

                            <tr>
                                <td>X-ray</td>
                                <td>500</td>
                                <td><img src={edit} className='editIcon' alt='edit'/> | <img src={remove} className='deleteIcon' alt='edit'/></td>
                            </tr>

                            <tr>
                                <td>X-ray</td>
                                <td>500</td>
                                <td><img src={edit} className='editIcon' alt='edit'/> | <img src={remove} className='deleteIcon' alt='edit'/></td>
                            </tr>

                            <tr>
                                <td>X-ray</td>
                                <td>500</td>
                                <td><img src={edit} className='editIcon' alt='edit'/> | <img src={remove} className='deleteIcon' alt='edit'/></td>
                            </tr>

                            <tr>
                                <td>X-ray</td>
                                <td>500</td>
                                <td><img src={edit} className='editIcon' alt='edit'/> | <img src={remove} className='deleteIcon' alt='edit'/></td>
                            </tr>      

                            <tr>
                                <td>X-ray</td>
                                <td>500</td>
                                <td><img src={edit} className='editIcon' alt='edit'/> | <img src={remove} className='deleteIcon' alt='edit'/></td>
                            </tr>

                            <tr>
                                <td>X-ray</td>
                                <td>500</td>
                                <td><img src={edit} className='editIcon' alt='edit'/> | <img src={remove} className='deleteIcon' alt='edit'/></td>
                            </tr>   

                            <tr>
                                <td>X-ray</td>
                                <td>500</td>
                                <td><img src={edit} className='editIcon' alt='edit'/> | <img src={remove} className='deleteIcon' alt='edit'/></td>
                            </tr>  

                            <tr>
                                <td>X-ray</td>
                                <td>500</td>
                                <td><img src={edit} className='editIcon' alt='edit'/> | <img src={remove} className='deleteIcon' alt='edit'/></td>
                            </tr>               
                        </tbody>
                    </table>
                </div>
                
                
            </div>{/*End of box2 div*/}
        </div>{/*End of container division*/}
    </div>/*End of add services division */
  )
}

export default AddServices
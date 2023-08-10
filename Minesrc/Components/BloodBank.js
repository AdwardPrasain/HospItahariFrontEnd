import React from 'react'
import '../Assets/CSS/BloodBank.css'
import {Link} from 'react-router-dom'


const BloodBank = () => {
  return (
    <div className='bloodBank'> {/*This is the main div and covers all of the portion of Bloodbank page*/}
     
        <div className='wrapup'>  {/*Ths division wrapups donor info and available bloods*/}

      <div className='box1'>
        <div className='Donor-info'> 
               <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Blood Group</th>
                      </tr>
                    </thead>

                     <tbody>
                        <tr>
                            <td>Susan Rayamajhi</td>
                            <td>20</td>
                            <td>Itahari</td>
                            <td>984206625</td>
                            <td>B+</td>
                        </tr>

                        <tr>
                            <td>Susan Rayamajhi</td>
                            <td>20</td>
                            <td>Itahari</td>
                            <td>984206625</td>
                            <td>B+</td>
                        </tr>

                        <tr>
                            <td>Susan Rayamajhi</td>
                            <td>20</td>
                            <td>Itahari</td>
                            <td>984206625</td>
                            <td>B+</td>
                        </tr>

                        <tr>
                            <td>Susan Rayamajhi</td>
                            <td>20</td>
                            <td>Itahari</td>
                            <td>984206625</td>
                            <td>B+</td>
                        </tr>

                        <tr>
                            <td>Susan Rayamajhi</td>
                            <td>20</td>
                            <td>Itahari</td>
                            <td>984206625</td>
                            <td>B+</td>
                        </tr>
                    </tbody>
                        
                  </table>
        </div>
      </div>

      <div className='box2'>
        <div className='Available-bloods'>
        <table className="table">
                    <thead>
                      <tr>
                        <th>Blood Groups</th>
                        <th>Number of Pouch</th>
                        
                      </tr>
                    </thead>

                     <tbody>
                        <tr>
                            <td>Susan Rayamajhi</td>
                            <td>20</td>                          
                        </tr>

                        <tr>
                            <td>Susan Rayamajhi</td>
                            <td>20</td>                        
                        </tr>

                        <tr>
                            <td>Susan Rayamajhi</td>
                            <td>20</td>                       
                        </tr>

                        <tr>
                            <td>Susan Rayamajhi</td>
                            <td>20</td>                       
                        </tr>

                        <tr>
                            <td>Susan Rayamajhi</td>
                            <td>20</td>
                        </tr>
                    </tbody>
                        
                  </table>
        </div> {/*end of available-bloods div*/}
        </div>
        </div> {/*End of wrapup div */}
        <Link to={'/BloodDonationForm'}>
          <input type='button' className='donateBlood' value='Donate Blood'/>
        </Link>
        

    </div>/*End of main bloodbank division*/
  )
}

export default BloodBank
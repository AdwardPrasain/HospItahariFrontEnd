import React from 'react'
import '../Assets/CSS/AboutUs.css'
import profile from '../Assets/Images/founder.jpg';

const AboutUs = () => {
  return (
    <div className='aboutUs'>{/*This division covers all the emlements from about us content*/}
        <div className='aboutUsWrapup'>
            <div className='box1'>
                    <img src={profile} className='founder' alt=''/>

                    <h1>Founder of HospItahari</h1>
                    <p>Mr. Susan Rayamajhi is a founder of HospItahari. 
                        It was his concept to create this web-based platform where different user's
                        will be able to find details about the hospitals and can book appointment to 
                        the doctors as per their choices. 
                    </p>
            </div>
                
            <div className='box2'>
                
                    <h2 className='aboutHospItahari'>About HospItahari</h2>
                    <p className='common-p'> HospItahari is an web-based online platform that helps to ease the users
                        by providing informations about the hospitals around the itahari and
                        facility to book appointment for doctors.
                    </p>
                    <h2>Some of the FAQS</h2>

                    <div className='faqs'>
                        <h2>What services can i get from HospItahari?</h2>
                        <p className='common-p'>
                            You can register at hospItahari as an patient/user or as an hospial.
                            Registering as an hospital can get to add their hospitals in the site
                            and can be able to display their doctors and services of their hospital
                            allowing patients to book appointment for their doctors. And likewise registering
                            as an user will allow you to visit hospitals profile and see the doctors availability,
                            as well as book appointment for the available doctors of your choice. You can also get 
                            the facility for the online payment and can register the blood donation form.
                        </p>
                    </div>

                    <div className='faqs'>
                        <h2>How to book appointment?</h2>
                        <p className='common-p'>
                            Below the doctors profile, you will see the book appointment options by clicking
                            on that option you will get to see the available date and time slots for booking
                            appointment. You can chose as per your wish within the given available date and
                            time slots.
                        </p>
                    </div>

                    <div className='faqs'>
                        <h2>How you will be notify if you book appointment?</h2>
                        <p className='common-p'>
                            You will receive an email from the hospital.
                        </p>
                    </div>

                    <div className='faqs'>
                        <h2>How to become partner at HospItahari?</h2>
                        <p className='common-p'>
                            You can simply click on the register as an hospital option, and fill the
                            form. After filling all the required data you will get verification code and
                            then you can add your hospitals in HospItahari by login in as an hospital.
                        </p>
                    </div>
                    
            </div>
        </div>
        
    </div>/*End of about us division*/
  )
}

export default AboutUs
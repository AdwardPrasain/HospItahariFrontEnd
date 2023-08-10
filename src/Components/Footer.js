import React from 'react'
import '../Assets/CSS/Footer.css'
import {Link} from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'


const Footer = () => {
  return (

   
    <div className="mainFooter">
        <footer className="bg-dark-gradient footer">
        <div className="footer-top">
            <div className="container">
                <div className="footer-border-bottom pb-3 mb-2">
                  
                </div>
                <div className="row">
                    <div className="col-sm-6 col-lg-3 my-2">
                        <div className="mb-2">
                            <img src="static/img/logo-light.svg" title="" alt=""/>
                        </div>
                        <div className="text-white-65 mb-2 ">Welcome to HospItahari. Get connected with us at.</div>
                        
                        <div className="nav footer-socila-icon">
                            <a href="#">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#">
                            <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#">
                            <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#">
                             <i className="fab fa-linkedin-in"></i>
                             </a>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-2 my-2">
                        <h5 className="text-white h6 mb-2">About</h5>
                        <ul className="list-unstyled white-link footer-links">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                          
                                <a href="ContactUs">Contact Us</a>
                            </li>

                            <li>
                                <a href="/AboutUs">About Us</a>
                            </li>
                            
                           
                        </ul>
                    </div>
                    <div className="col-sm-6 col-lg-2 my-2">
                        <h5 className="text-white h6 mb-2">Services</h5>
                        <ul className="list-unstyled white-link footer-links">
                            <li>
                                <a href="/ViewServices">Our Services</a>
                            </li>
                            <li>
                                <a href="/">Book Appointment</a>
                            </li>
                            <li>
                                <a href="/">View Hospitals</a>
                            </li>
                         
                         
                        </ul>
                    </div>
                    <div className="col-sm-6 col-lg-2 my-2">
                        <h5 className="text-white h6 mb-2">Login</h5>
                        <ul className="list-unstyled white-link footer-links">
                            <li>
                                <a href="#">As an User</a>
                            </li>
                            <li>
                                <a href="#">As an Hospital</a>
                            </li>
                            <li>
                                <a href="#">Legal &amp; Security</a>
                            </li>
                            
                        </ul>
                    </div>
                   
                </div>
            </div>
        </div>
        <div className="footer-bottom footer-border-top light py-3">
            <div className="container text-center">
                <p className="m-0">© 2023 copyright <a href="#" className="text-reset">HospItahari</a></p>
            </div>
        </div>
    </footer>
    </div>
  

    
  )
}

export default Footer
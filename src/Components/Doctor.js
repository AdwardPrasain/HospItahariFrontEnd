import React, {useState, useEffect, useContext}from 'react'
import '../Assets/CSS/Doctor.css'
import profile from '../Assets/Images/founder.jpg';
import { LoginContext } from '../Context/LoginContext';
import axios from 'axios';
import {useParams} from "react-router-dom"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Khalti from '../Components/Khalti/KhaltiBtn'
import Star from './Star';
import Calendar from 'react-calendar';
import  '../Assets/CSS/Calender.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Doctor = () => {


  const {loginDetails,setLoginDetails} = useContext(LoginContext);

  const {id} = useParams()

  /*For booking appointment form*/
  
  const initialBookAppointmentForm = {
    FullName:"",
    Gender:"",
    Age:"",
    Address:"",
    Email:"",
    UserId:loginDetails.UserId,

  }

  const [bookAppointmentForm, setBookAppointmentForm] = useState(initialBookAppointmentForm)

  const handleBookAppointmentFormChange = (e) =>{
    e.preventDefault();
    const {name, value} = e.target;
    setBookAppointmentForm({...bookAppointmentForm,[name]:value});
}



const postBookAppointmentFormData = async (e) =>{
    const result = await axios.post(loginDetails.URL +'/api/BookAppointment/BookAppointmentFormInsert', bookAppointmentForm)
    if(result.data == 1) {
        postBookAppointmentData();
       
    }
    else{
        toast.error("Data can't be registered.")
    }

} 
/*End of book appointment form*/

/* For email notification after booking appointment form*/
  
const sendMail = async() => {
  
  var otpObject  ={
      To: bookAppointmentForm.Email,
      Subject: "Regarding Doctor Appointment Schedule",
      Body: `Your appointment has been scheduled for ${bookAppointment.Date} on ${bookAppointment.Time} with Dr. ${doc.fullName} `
  }


  const result = await axios.post(loginDetails.URL +"/api/HospItahariEmail/HospItahariEmail", otpObject);

}


/* Common function validation, onclick and use effects for BookAppointmentForm and BookAppointment */

const [errors, setError] = useState({})
const [isSubmit, setIsSubmit] = useState(false);

const validation = (values, values2) => {
  let errors = {}
  setBookAppointment({...bookAppointment,Date:date.toDateString()});

  if (!values.FullName) {
    errors.FullName = "Please insert your full name."
  }
  else if(!values.Gender) {
    errors.Gender = "Please insert your gender."
  }
  else if (!values.Age) {
    errors.Age= "Please insert your age."
  }
  else if(!values.Address) {
    errors.Address = "Please insert your address."
  }
  else if(!values.Email) {
    errors.Email = "Please insert your email."
  }
  else if(!values2.Time){
   
    errors.Time = "Please select time for appointment"
  }
  else if(dayError){
    toast.error("Day do not matched");
  }
  else {
    setIsSubmit(true);
  }

  return errors;
}


const onBookAppointmentClick = (e) =>{
  e.preventDefault();

  if(loginDetails.UserId){

    setError(validation(bookAppointmentForm, bookAppointment));
  }
  else {
    const confirm = window.confirm("You have to login to the system to book appointment");
    if (confirm) {

      window.location.href = "/Login";

    }
  }

}

/*End of common validation and onClick function for bookAppointmentForm and bookAppointment*/


/*For book appointment time and day */

const [date, setDate] = useState(new Date());
const [dayError, setDayError] = useState(true);

const initialBookAppointment = {
  DoctorId:id,
  UserId:loginDetails.UserId,
  Day:'',
  Time:'',
  Date:'',
  PaymentMethod:'',
  PaymentStatus: '',
}

const [bookAppointment, setBookAppointment] = useState(initialBookAppointment)
const [paymentType, setPaymentType] = useState('');

const handleBookAppointmentChange = (e) =>{


  e.preventDefault();
  const {name, value} = e.target;
  setBookAppointment({...bookAppointment,[name]:value});
 // 
}

const setDateFunc = () => {
  setBookAppointment({...bookAppointment,Date:date.toDateString()});
}

const handleMethodChange = (e) => {

  setPaymentType(e.target.value);
  setBookAppointment((prevFormData) => ({
    ...prevFormData,
    PaymentMethod: e.target.value,
  }));

  if (e.target.value == "COD") {
    setBookAppointment((prevFormData) => ({
      ...prevFormData,
      PaymentStatus: 0,
    }));
  }


  if (e.target.value == "Khalti") {
    setBookAppointment((prevFormData) => ({
      ...prevFormData,
      PaymentStatus: 1,
    }));
  }

}



const postBookAppointmentData = async (e) =>{

  console.log(bookAppointment);

  const result = await axios.post(loginDetails.URL +'/api/BookAppointment/BookAppointmentInsert', bookAppointment)
 
  if(result.data == 1) {
      toast.success("Data has been registered.")
      sendMail();
      //setBookAppointmentForm(initialBookAppointmentForm);
      setIsSubmit(false);
    
      //setBookAppointment(initialBookAppointment);
 
  }
  else{
      toast.error("Data can't be registered.")
  }

}

/*End of book appointment data*/


/*For getting doctors data */

const [doc, setDoc] = useState({});

const getDoctorsData = async () => {

    const result = await axios.get(loginDetails.URL + `/api/Doctors/DoctorsAllGet`);

    const docData = result.data.filter(x => {

      return x.id == id;
    })

    setDoc(docData[0]);

   // setLoginDetails({...loginDetails, ConsulationFee: docData[0].consulationFee });

};

/*End of get doctors data */


/*For getting doctor schedule data */


  const [doctorSchedule, setDoctorSchedule] = useState([]);
  const [doctorTimeSchedule, setDoctorTimeSchedule] = useState([]);

  const [count, setCount] = useState();

  const getDoctorScheduleData = async () => {

    const result = await axios.get(loginDetails.URL + `/api/DoctorSchedule/DoctorScheduleGetByDocId?DoctorId=${id}`);
    console.log(result);

    setDoctorSchedule(result.data);
    setCount(result.data.length);

};

/*End of get doctor schedule */


/*For rating and review modal popup*/
const [modal, setModal] = useState(false);


const toggleModal = () => {
  setModal(!modal);
};

if(modal) {
  document.body.classList.add('active-modal')
} else {
  document.body.classList.remove('active-modal')
}



const initialRatingAndReview = {
  DoctorId:id,
  UserId:loginDetails.UserId,
  Review:"",
  Rating:"",
}

const [ratingAndReview, setRatingAndReview] = useState(initialRatingAndReview)

const [reviewErrors, setReviewErrors] = useState({})
const [ratingIsSubmit, setRatingIsSubmit] = useState(false)

const reviewValidation  = (values) => {
  let errors = {}

  if(!values.Rating){
    errors.Rating = "Rating is missing"
  }

   else if(values.Rating > 5){
    errors.Rating = "Rating can be given under the scale of 5 only."
  }

  else if(!values.Review){
    errors.Review = "Review is missing"
  }

  else {
    setBookAppointment({...bookAppointment,Date:date.toDateString()});
    setRatingIsSubmit(true);
  }

  return errors;
}




const handleRatingAndReviewChange = (e) =>{
  e.preventDefault();
  const {name, value} = e.target;
  setRatingAndReview({...ratingAndReview,[name]:value});
}



const postRatingAndReviewData = async () =>{

  console.log(ratingAndReview)
  const result = await axios.post(loginDetails.URL +'/api/RatingAndReview/RatingAndReviewInsert', ratingAndReview)

 
  if(result.data == 2) {
      toast.success("Data has been registered.")
      setRatingAndReview(initialRatingAndReview);
      setRatingIsSubmit(false);
  }
  else{
      toast.error("Data can't be registered.")
  }

}

  const [ratingAndReviewValue, setRatingAndReviewValue] = useState([]);

  const getRatingAndReview= async () => {
    const result = await axios.get(loginDetails.URL + `/api/RatingAndReview/GetRatingAndReviewByDoctorId?DoctorId=${id}`);
    setRatingAndReviewValue(result.data);
    console.log(result);
};

const onSendClick = (e) =>{

  e.preventDefault();
  setReviewErrors(reviewValidation(ratingAndReview));

}

/*End of rating and review popup */


useEffect(() => {

     getDoctorsData();
    
     getRatingAndReview();

     getDoctorScheduleData();

}, [loginDetails]);




useEffect(() =>{

  if(isSubmit ){   
 

     postBookAppointmentFormData();
  }

  if(ratingIsSubmit){
    
    postRatingAndReviewData();
  }
}, [isSubmit, ratingIsSubmit])





const filterTime= async(day) =>{
 
  const filtertimedata = doctorSchedule.filter(x => {
    return x.dayId ==  day
  });
  console.log(filtertimedata);
  setDoctorTimeSchedule(filtertimedata);
}

const handleDayChange = (value) => {

  setDayError(true);
  var day = value.getDay();

  filterTime(day);

  for(var i=0; i<doctorSchedule.length; i++)
  {
      if(doctorSchedule[i].dayId == day){
       setDayError(false);
       setBookAppointment({...bookAppointment,Day: doctorSchedule[i].day});
      }
  }
  if(dayError){

  }
  console.log(doctorSchedule);
}

// const handleDateChange = (e) => {
//   alert(e.target.value);
//  // setDate(e.target.value);
// }


  return ( 
    <div className='Doctor'>
  <ToastContainer/>
        <div className='doctorWrapup'>
            <div className='box1'>
                    <img src={ loginDetails.URL + "/staticfiles/DoctorImages/" + doc.image} className='doctorImage' alt=''/>

                  <div className='ratingStars'>
                  
                  <Star stars={doc.rating} reviews={doc.review} />

                  </div>

                    <h1>Dr. {doc.fullName}</h1>
                    <p>NMC Number: {doc.nmcNumber}</p>
                    <p>Speciality: {doc.speciality}</p>
                    <p>Qualification: {doc.qualification}</p>
                    <p>Experience: {doc.experience}</p>
                    <p>Consulation Fee: {doc.consulationFee} </p>

                    <button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#exampleModal"> Give Rating</button><br/>

                    {ratingAndReviewValue.map((data, index) => (

                      <>   
                            <p style={{fontSize:"small"}}>{data.fullName}</p>
                         <p style={{fontSize:"small"}}> <Star stars={data.rating} reviews={data.review}/>  </p>
                         <p style={{fontSize:"small"}}>{data.review}</p>
                      </>

                     ))}
            </div>

                
            <div className='box2'>
                
                    <h2 className='aboutBookingAppointment'>Check availability and book appointment</h2>


              <div className="appointmentForm">

              <div className='commonRow'>

                <div className='inputbox'>
                  <label>Full Name</label>
                  <input type='text' className='commonInput' name="FullName" value={bookAppointmentForm.FullName} onChange={handleBookAppointmentFormChange}/> 
                  {errors.FullName && <p style={{fontSize:'0.7rem', color:'rgb(103, 10, 10)',marginLeft:'-0.1rem', marginTop:'-0.1rem'}}>{errors.FullName}</p>} 
                </div>

                  
              <div className='inputbox' style={{marginLeft:'7rem'}}>
                <label>Gender</label>
                <input type='text' className='commonInput' name="Gender" value={bookAppointmentForm.Gender} onChange={handleBookAppointmentFormChange}/>
                {errors.Gender && <p style={{fontSize:'0.7rem', color:'rgb(103, 10, 10)',marginLeft:'-0.1rem', marginTop:'-0.1rem'}}>{errors.Gender}</p>}
              </div>
               
               
               
              </div>
               
              <div className='commonRow'>

                <div className='inputbox'>
                  <label>Age</label>
                  <input type='text' className='commonInput' name="Age" value={bookAppointmentForm.Age} onChange={handleBookAppointmentFormChange}/>
                  {errors.Age && <p style={{fontSize:'0.7rem',color:'rgb(103, 10, 10)',marginLeft:'-0.1rem', marginTop:'-0.1rem'}}>{errors.Age}</p>}
                </div>

                <div className='inputbox' style={{marginLeft:'7rem'}}>
                <label>Address</label>
                <input type='text' className='commonInput' name="Address" value={bookAppointmentForm.Address} onChange={handleBookAppointmentFormChange}/> 
                {errors.Address && <p style={{fontSize:'0.7rem', color:'rgb(103, 10, 10)',marginLeft:'-0.1rem', marginTop:'-0.1rem'}}>{errors.Address}</p>}
                </div>
             
              
              </div>
              <div className='inputbox' style={{marginLeft:'2rem', marginTop:'2rem'}}>
                <label>Email</label>
                <input type='text' className='commonInput' name="Email" value={bookAppointmentForm.Email} onChange={handleBookAppointmentFormChange}/> 
                {errors.Email && <p style={{fontSize:'0.7rem', color:'rgb(103, 10, 10)',marginLeft:'-0.1rem', marginTop:'-0.1rem'}}>{errors.Email}</p>}
                </div>

                <div style={{fontFamily:'initial', color:'teal', marginLeft:'2.1rem', marginTop:'1.7rem'}}>
                                {(count == 4)?

                                <>
                                <p>Please select {doctorSchedule[0].day}, {doctorSchedule[1].day}, {doctorSchedule[2].day}, {doctorSchedule[3].day} as appointment day </p>
                                </>

                                :

                                (count == 3)?

                                <>
                                <p>Please select {doctorSchedule[0].day}, {doctorSchedule[1].day}, {doctorSchedule[2].day} as appointment day </p>
                                </>

                                :
                                (count ==2)?
                                <>
                                <p>Please select {doctorSchedule[0].day}, {doctorSchedule[1].day} as appointment day </p>
                                </>
                                :

                                (count ==1)?
                                <>
                                <p>Please select {doctorSchedule[0].day} as appointment day </p>
                                </>

                                :
                                null
                                }
                </div>

              <div className='commonRow'>

              <Calendar

                onClickDay={handleDayChange}

                  onChange={setDate}
                  value={date}
                  maxDate={new Date(2023, 5, 1)} // will not allow date later than today
                  minDate={new Date(2023, 4, 1)} // will not allow date before 1st July 2015
                tileDisabled={({activeStartDate, date, view }) => date.getDay() === 6}
 
/>


                <div style={{marginLeft:'2rem'}}> 
                <label className='lblDoctorId'>Time</label><br/>
                    <select type='text' className='doctorIdInput' name="Time" onChange={handleBookAppointmentChange} style={{width:'6rem'}}>
                        <option value="">Select</option>
                        {doctorTimeSchedule.map((data, index) => ( 
                                <option value={data.time}>{data.time}</option>
                           ))}  
                    </select> 
                    {errors.Time && <p style={{fontSize:'0.7rem', color:'DeepSkyBlue',marginLeft:'3rem', marginTop:'-0.3rem', marginBottom:'3rem'}}>{errors.Time}</p>}<br/><br/>

              <h style={{paddingTop:'1rem'}}>Select Payment Method</h>
            <div className='paymentMethod' >{/*This method wrapups payment method*/}
             
              <div className='radioButton'>
                <div>
                <input type='radio'  value="COD" onClick={setDateFunc}
                 
                  checked={paymentType === "COD"}
                  onChange={handleMethodChange} />
                  </div>
                <div className='p-1'>Cash on Delivery</div>
              </div>

               
            <div className='radioButton' >
              <div>
                    <input type='radio'  value={"Khalti"} onClick={setDateFunc}
                      checked={paymentType === "Khalti"}
                      onChange={handleMethodChange} />
              </div>

                <div className="p-1" >Khalti</div>
            </div>

        </div>{/*End of paymentmethod div */}

        {(paymentType === "Khalti")?
                
                <p className='pay'> <div className=''>
                  <Khalti bookingData={bookAppointment} bookingDetails={bookAppointmentForm} docDetails={doc} className="appointmentBtn"/>
                </div></p>

                :

                  (paymentType === "COD") ?

                <div>
                  <button onClick={onBookAppointmentClick} className='appointmentBtn'>Book Appointment</button>
                </div>
                  : 

              <></>
        }
       

                </div>
                    
                 </div>

        </div> 
         
                
  {/*For rate and review */}

<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button><br/>
        
        <div>
          <img src={ loginDetails.URL + "/staticfiles/DoctorImages/" + doc.image} className='doctorImagePopup'/>
          <h5 style={{marginTop:'0.5rem', fontFamily:'cursive', color:'darkslategray'}}>Dr. {doc.fullName}</h5>
        </div>
        
          <h5 className="modal-title" id="exampleModalLabel" style={{marginLeft:'-18rem'}}>Rate and give review.</h5>
    
       </div>
       
      <div className="modal-body">
        <div className="rating"> 
         <input type='text' className='ratingInput' placeholder='rate on scale of 5' name="Rating" value={ratingAndReview.Rating}  onChange={handleRatingAndReviewChange}/>    
         {reviewErrors.Rating && <p style={{fontSize:'0.8rem', color:'#ea2020', marginTop:'0.3rem'}}>{reviewErrors.Rating}</p>}
      </div>

        <div className='review'>
          <textarea class="form-control" placeholder="give your review here" rows="4"  name="Review" value={ratingAndReview.Review} onChange={handleRatingAndReviewChange}/>
          {reviewErrors.Review && <p style={{fontSize:'0.7rem', color:'#ea2020',marginLeft:'3rem', marginTop:'4'}}>{reviewErrors.Review}</p>}
        </div>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-success" style={{backgroundColor:'teal'}} onClick={onSendClick}>Submit</button>
      </div>
    </div>
  </div>
</div>                           
           </div>
        </div>
        
  
    </div>/*End of doctor division*/
  )
}

export default Doctor
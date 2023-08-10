import React, {useState, useEffect} from "react";
import KhaltiCheckout from "khalti-checkout-web";
import config from "./khaltiConfig";


export default function Khalti(props) {
  let checkout = new KhaltiCheckout(config);

  let buttonStyles = {
    color: "white",
    cursor: "pointer",
    border: "1px solid teal",
    backgroundColor: "teal",
    height: "2rem",
    borderRadius: "0.3rem",
    marginLeft: "1rem",
  };

  const [bookingData, setBookingData] = useState();
  const [bookingDetails, setBookingDetails] = useState();
  const [docDetails, setDocDetails] = useState();
  
  useEffect(()=>{
    setBookingData(props.bookingData);
    setBookingDetails(props.bookingDetails);
    setDocDetails(props.docDetails);
    
    console.log(props.bookingData);
    console.log(props.bookingDetails);
    console.log(props.docDetails);
  },[])

  const handleClick = () => {
    checkout.show({ amount: docDetails.consulationFee*100})
    localStorage.setItem("bookingData",JSON.stringify(props.bookingData));
    localStorage.setItem("bookingDetails",JSON.stringify(props.bookingDetails));
    localStorage.setItem("docDetails",JSON.stringify(props.docDetails));
   
  }
  

  return (
    <div>
      <button
        onClick={handleClick}
        style={buttonStyles}
      >
        Pay Via Khalti
      </button>
    </div>
  );
}
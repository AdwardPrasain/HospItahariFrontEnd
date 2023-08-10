import myKey from "./khaltiKey";
import axios from "axios";

import {toast } from 'react-toastify';

let bookingData  = localStorage.getItem("bookingData");  
let bookingDetails  = localStorage.getItem("bookingDetails");  
let docDetails  = localStorage.getItem("docDetails");  

let config = {
  // replace this key with yours
  publicKey: myKey.publicTestKey,
  productIdentity: "123766",
  productName: "My Ecommerce Store",
  productUrl: "http://localhost:3000",
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verfication
      console.log(payload);
      let data = {
        token: payload.token,
        amount: payload.amount,
      };

      axios
        .get(
          `https://meslaforum.herokuapp.com/khalti/${data.token}/${data.amount}/${myKey.secretKey}`
        )
        .then((response) => {
          console.log(response.data);
          alert("Thank you for generosity");
        })
        .catch((error) => {

          console.log(JSON.parse(bookingData));
          console.log(JSON.parse(bookingDetails));
          console.log(JSON.parse(docDetails));

          axios.post('https://localhost:7294/api/BookAppointment/BookAppointmentFormInsert', JSON.parse(bookingDetails))
      
      axios.post('https://localhost:7294/api/BookAppointment/BookAppointmentInsert', JSON.parse(bookingData))

          toast.success("Thank you for using Khalti.")
        
          var otpObject  ={
            To: JSON.parse(bookingDetails).Email,
            Subject: "Regarding Doctor Appointment Schedule",
            Body: `Your appointment has been scheduled for ${JSON.parse(bookingData).Date} on ${JSON.parse(bookingData).Time} with Dr. ${JSON.parse(docDetails).fullName} `
        }
      
        axios.post("https://localhost:7294/api/HospItahariEmail/HospItahariEmail", otpObject);
      
        });
    },
    // onError handler is optional
    onError(error) {
      // handle errors
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },
  paymentPreference: [
    "KHALTI",
    "EBANKING",
    "MOBILE_BANKING",
    "CONNECT_IPS",
    "SCT",
  ],
};

export default config;
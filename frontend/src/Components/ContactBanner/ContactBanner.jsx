import React from "react"
import './ContactBanner.css'


const ContactBanner = () => {
  return (
    <div className="div_container contact_banner">
      <div className="contact_details">
        <p className="contact__">Contact</p>
        <p className="contact__info">
          Maya Customer Service Center is available Sunday to Friday from 9AM to
          10PM and Saturday from 10AM to 4PM.
        </p>
        <p>
          Our Customer Advisors will be delighted to assist you and provide
          personalized advice.
        </p>
      </div>
    </div>
  );
};

export default ContactBanner;

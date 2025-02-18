import React from "react";
import "./ContactItem.css";
function ContactItem() {
  return (
    <div className="container">
      <div className="contact_dett">
        <div className="contact_info_item">
          <h2>Call Us</h2>
          <h3>Our customer service will delight to assist you </h3>
          <h4>
            Maya Customer Service Center is available Sunday to Friday from 9AM
            to 10PM and Saturday from 10AM to 4PM.
          </h4>
          <a href="tel:+977 9849531357">Contact us at +977 9849531357</a>
        </div>
        <div className="contact_info_item">
          <h2>Instant messaging</h2>
          <h3>Would you like to contact us on an instant messaging app?</h3>
          <h4>Our Client Advisors will be delighted to assist you.</h4>
          <button>
            <a href="https://wa.me/9779849531357/">Chat on WhatsApp</a>
          </button>
        </div>
        <div className="contact_info_item">
          <h2>Chat online</h2>
          <h3>Looking for personalized advice? </h3>
          <h4>
            The option to chat becomes active when one of our Client Advisors is
            available.
          </h4>
          <button>
            <a href="https://www.instagram.com/mayawears.np/">
              Chat on Instagram
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactItem;

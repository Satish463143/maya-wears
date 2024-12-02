import React from "react";
import "./AboutUsItem.css";
import one_photo from "../../assets/images/one.png";
import two_photo from "../../assets/images/two.png";

function AboutUsItem() {
  return (
    <div className="about_item">
      <div>
        <div className="about_first_item">
          <img src={one_photo} alt="" />
          <p>
            Overlays is a brand for those who can think beyond the confines of
            what is? and imagine what if?
            <br />
            Through our unique approach to fabrics, design, color, and
            aesthetics, we transform and reshape perceptions, challenging
            conventional fashion and trends. We're constantly creating something
            new and unexpected. <br />
            Our aesthetic embraces the absurd and the surreal. <br />
            Overlays makes room for people to break free from the limitations of
            their world and escape into an alternate reality through our lens.
          </p>
        </div>
        <div className="about_second_item">
          <img src={two_photo} alt="" />
          <h1>We Believe</h1>
          <p>Traps Lmit Us. <br /> Ce unlocks New Possiblites <br />MAYA is your Licence <br /> To Alter Reality.</p>
          <h1>Our love and efforts are interwoven between the threads of each product we make.</h1>
        </div>
      </div>
    </div>
  );
}

export default AboutUsItem;

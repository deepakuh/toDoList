import React from "react";
import "./Contact.css";
import { FaInstagram , FaLinkedin} from "react-icons/fa";
import { SiGmail } from "react-icons/si";

function ContactPage() {

  const NavigateLocHref = ({url}) => {
    const navigate = ()=> window.location.href = url
    return (<FaInstagram className="instagramButton" onClick={navigate}>
  </FaInstagram>)
}

const NavigateLocHref1 = ({url}) => {
  const navigate = ()=> window.location.href = url
  return (<FaLinkedin className="linkedinButton" onClick={navigate}>
</FaLinkedin>)
}

  return (
    <div className="contactBg">
    
      <div>

        <h className="contactPara1">Contact Us</h>
        
        <div>
        <SiGmail className="gmailButton" onClick={() => window.location = 'mailto:deepakkumarm732@gmail.com'}/>
        <NavigateLocHref  url="https://www.instagram.com/deepak_uh?igsh=MWYxODd4cm5wYmw5Zg==" />
        <NavigateLocHref1  url="https://www.linkedin.com/in/deepak-kumar-95bb29217" />
        </div>

      </div>
    </div>
  );
}

export default ContactPage;

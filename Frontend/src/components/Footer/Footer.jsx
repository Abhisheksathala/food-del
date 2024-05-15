import React from 'react'
import "./Footer.css";
import { assets } from '../../assets/food del assets/frontend_assets/assets';
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p className="company-name">Delicious Food Delivery</p>
            <p className="company-description">Bringing the best food to your doorstep</p>
            <div className="contact-info">
                <p>Contact:989XXXXX</p>
                <p>Email: contact@example.com</p>
                <p>Phone: +1 (123) 456-7890</p>
                <p>Address: 123 Main St, City, Country</p>
            </div>
            <p>Follow Us:</p>
            <a href="https://www.facebook.com"><img src={assets.facebook_icon} alt="Facebook" /></a>
            <a href="https://www.twitter.com"><img src={assets.twitter_icon} alt="Twitter" /></a>
            <a href="https://www.linkedin.com"><img src={assets.linkedin_icon} alt="LinkedIn" /></a>
        </div>
        <div className="footer-content-center">
       <h2>COMPANY</h2>
       <ul>
        <li>Home</li>
        <li>About US</li>
        <li>Delivery</li>
        <li>Privacy</li>
       </ul>
        </div>
        <div className="footer-content-right">
         <h2>GET IN TOUCH</h2>
            <div className="newsletter">
                <p>contact</p>
                <p>XXXXXXXX</p>
            </div>
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
          <p>&copy; 2023 Delicious Food Delivery. All Rights Reserved.</p>
          <p>Terms of Service | Privacy Policy</p>
      </div>
    </div>
  )
}

export default Footer;

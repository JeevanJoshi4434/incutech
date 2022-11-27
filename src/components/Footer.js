import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './css/home.css';
const Footer = () => {

  return (
    <div>
      <div className='footer'>
                <div className='left'>
                    <p><a className='' href="/aboutus"><span className='footerbutton'>About Us</span> </a></p>
                    <p><Link to="/contact"><span className='footerbutton'>Contact Us</span></Link></p>
                    <p><span className='footerbutton'>Privacy Policy</span></p>
                  <p><Link to='/changepassword'><span className='footerbutton'>Change Password</span></Link></p>
                </div>
            </div>
    </div>
  )
}

export default Footer

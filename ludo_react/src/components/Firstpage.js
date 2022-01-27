import React from 'react'
import { HiUserCircle } from "react-icons/hi";
import { Link} from 'react-router-dom';
import './Firstpage.css';
import ConfigIcon from './ConfigIcon';
function Firstpage() {
  return (
    <div className='container'>

      {/* --------start menu part------- */}
      
      <div className='menubar'>
        <div className='menu_logo'>
        <ConfigIcon>
          <HiUserCircle /> 
          </ConfigIcon>
          <div className='menu_user'>User Name</div>
        </div>
        <div className='menu_body'>
        <h1>
Escape Reality And Play Games</h1>
        </div>
        <div className='menu_home'>
              <Link to="/main" className='menu_login_link'>Home</Link>
         </div>
        <div className='menu_login'>
              <Link to="/login" className='menu_login_link'>login</Link>
         </div>
      </div>

 {/* --------End menu part------- */}

    </div>
  )
}

export default Firstpage

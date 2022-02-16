import React, { useEffect } from 'react'
import { HiUserCircle } from "react-icons/hi";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { validateUser } from '../functions/config';
import './Firstpage.css';
import ConfigIcon from './ConfigIcon';
function Firstpage() {
  const [isLoggedIn, set_isLoggedIn] = React.useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    checkValidation()
    console.log('changed location: ', location.pathname)
  }, [location.pathname])
  

  const checkValidation = async () => {
    const isValidated = await validateUser()
    console.log('isValidated: ', isValidated)
    set_isLoggedIn(isValidated)
  }
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
          <Link to="/" className='menu_login_link'>Home</Link>
        </div>
        <div className='menu_login'>
          {isLoggedIn ? <button onClick={() => {
            localStorage.removeItem('token')
            navigate('/login')
          }}>Logout</button> : <Link to="/login" className='menu_login_link'>Login</Link>}
          
        </div>
      </div>

      {/* --------End menu part------- */}

    </div>
  )
}

export default Firstpage

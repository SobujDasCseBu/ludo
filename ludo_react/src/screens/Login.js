import React from 'react'
import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../assets/css/login.css'
import axios from '../functions/axios';


export default function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = React.useState('')
  const [pass, setPass] = React.useState('')
  const [emailReq, setEmailReq] = React.useState(false)
  const [passReq, setPassReq] = React.useState(false)

  const inputref = useRef(null)
  useEffect(() => {
    inputref.current.focus()
  }, [])


  const login = async () => {
    const loginRes = await axios.post('auth/login', {
      email,
      password: pass
    })
    console.log('loginRes: ', loginRes)
    if (loginRes?.data?.code === 200) {
      localStorage.setItem('token', JSON.stringify({ token: loginRes.data.token }))
      navigate('/main')
    }
  }

  return (
    <div className='login_body'>
      <div className='Container'>
        <div>
          <div className='Header'>LUDO</div>
          <div className='HDesc'>
            PLAY  & <div className='Bold'>ENOJY</div>
          </div>
        </div>
        <div className='Form'>
          <div className='Preq' style={emailReq ? { display: '' } : { display: 'none' }}>
            This field is required.{' '}
          </div>
          <input className='Input'
            ref={inputref}
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            onBlur={(e) => {
              if (!email) setEmailReq(true)
            }}
          />
          <div className='Preq' style={passReq ? { display: '' } : { display: 'none' }}>
            This field is required.{' '}
          </div>
          <input className='Input'
            placeholder='Password'
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type='password'
            onBlur={(e) => {
              if (!pass) setPassReq(true)
            }}
          />
          <div className='AFPass'>Forgot Password?</div>
          <div className='SButton' onClick={login}>Sign In</div>
          <p className='p_tag'>Don't have an account?</p>
          <div className='HDescs'>
            <div className='CSpan'>
              {' '}


              {/* <div className='CAngkor'>Sign up</div>  */}

              <Link to="/signup" className='CAngkor'>Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

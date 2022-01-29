import React from 'react';
import ReactDOM from 'react-dom';
import SignUpContainer from "./SignUpContainer"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
//import '../assets/css/sign_up.css'

const SignUp = () => (
 <div className='body'>
  <MuiThemeProvider>
    <SignUpContainer />
  </MuiThemeProvider>
  </div>
);


export default SignUp;

import React, { Component } from 'react';
import SignUpForm from './SignUpForm.js';
import axios from '../functions/axios'
import { createBrowserHistory } from 'history'
const FormValidators = require('./validate');
const validateSignUpForm = FormValidators.validateSignUpForm;
const zxcvbn = require('zxcvbn');

class SignUpContainer extends Component {
  history = createBrowserHistory({forceRefresh:true})
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        username: '',
        email: '',
        password: '',
        pwconfirm: ''
      },
      btnTxt: 'show',
      type: 'password',
      score: '0'
    };

    this.pwMask = this.pwMask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.pwHandleChange = this.pwHandleChange.bind(this);
  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  pwHandleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });

    if (event.target.value === '') {
      this.setState(state =>
        Object.assign({}, state, {
          score: 'null'
        })
      );
    } else {
      var pw = zxcvbn(event.target.value);
      this.setState(state =>
        Object.assign({}, state, {
          score: pw.score + 1
        })
      );
    }
  }

  async submitSignup(user) {
    var params = { name: user.usr, password: user.pw, email: user.email };
    const res = await axios.post('users/register', params)
    console.log('res: ', res)
    if (res.data.token.length > 0) {
      localStorage.setItem('token', JSON.stringify({ token: res.data.token }))
      window.location.pathname = '/main'
    }
  }

  validateForm(event) {
    event.preventDefault();
    var payload = validateSignUpForm(this.state.user);
    if (payload.success) {
      this.setState({
        errors: {}
      });
      var user = {
        usr: this.state.user.username,
        pw: this.state.user.password,
        email: this.state.user.email
      };
      this.submitSignup(user);
    } else {
      const errors = payload.errors;
      this.setState({
        errors
      });
    }
  }

  pwMask(event) {
    event.preventDefault();
    this.setState(state =>
      Object.assign({}, state, {
        type: this.state.type === 'password' ? 'input' : 'password',
        btnTxt: this.state.btnTxt === 'show' ? 'hide' : 'show'
      })
    );
  }

  render() {
    return (
      <div>
        <SignUpForm
          onSubmit={this.validateForm}
          onChange={this.handleChange}
          onPwChange={this.pwHandleChange}
          errors={this.state.errors}
          user={this.state.user}
          score={this.state.score}
          btnTxt={this.state.btnTxt}
          type={this.state.type}
          pwMask={this.pwMask}
        />
      </div>
    );
  }
}

export default SignUpContainer;

import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import CreateContexvalue from '../../CreateContext/CreateContext'

import './App.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isshowerror: false,
    errormsg: '',
    display: 'password',
  }

  usernametype = event => {
    this.setState({username: event.target.value})
  }

  passwordtype = event => {
    this.setState({password: event.target.value})
  }

  success = msg => {
    const {history} = this.props
    Cookies.set('jwt_token', msg, {expires: 30})
    history.replace('/')
  }

  failure = error => {
    this.setState({isshowerror: true, errormsg: error})
  }

  submitting = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const value = {username, password}
    const option = {
      method: 'POST',
      body: JSON.stringify(value),
    }
    const response = await fetch('https://apis.ccbp.in/login', option)
    const data = await response.json()
    if (response.ok === true) {
      this.success(data.jwt_token)
    } else if (response.ok === false) {
      this.failure(data.error_msg)
    }
  }

  displaying = event => {
    const a = event.target.checked
    if (a === true) {
      this.setState({display: 'text'})
    } else {
      this.setState({display: 'password'})
    }
  }

  render() {
    const {username, password, isshowerror, errormsg, display} = this.state
    const getting = Cookies.get('jwt_token')
    if (getting !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <CreateContexvalue.Consumer>
        {value => {
          const {bg} = value
          return (
            <div className={bg ? 'container' : 'container1'}>
              <form
                className={bg ? 'first-container' : 'first-container1'}
                onSubmit={this.submitting}
              >
                <img
                  src={
                    bg
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  }
                  alt="website logo"
                  className="img"
                />
                <label
                  htmlFor="firstlabel"
                  className={bg ? 'labels' : 'labels1'}
                >
                  USERNAME
                </label>
                <input
                  type="text"
                  id="firstlabel"
                  className={bg ? 'inputs' : 'inputs1'}
                  placeholder="Username"
                  onChange={this.usernametype}
                  value={username}
                />
                <label
                  htmlFor="secondlabel"
                  className={bg ? 'labels' : 'labels1'}
                >
                  PASSWORD
                </label>
                <input
                  type={display}
                  id="secondlabel"
                  className={bg ? 'inputs' : 'inputs1'}
                  placeholder="Password"
                  onChange={this.passwordtype}
                  value={password}
                />
                <div className="show-password">
                  <input
                    type="checkbox"
                    id="check"
                    onChange={this.displaying}
                    className="check"
                  />

                  <label
                    htmlFor="check"
                    className={bg ? 'showing' : 'showing1'}
                  >
                    Show Password
                  </label>
                </div>
                <button type="submit" className="container-btn">
                  Login
                </button>
                {isshowerror ? <p className="paras">*{errormsg}</p> : ''}
              </form>
            </div>
          )
        }}
      </CreateContexvalue.Consumer>
    )
  }
}
export default Login

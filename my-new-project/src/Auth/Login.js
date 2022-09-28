import React from 'react'
import axios from 'axios'
import Logo from '../common/Logo'

import { setToken } from '../lib/auth'
import { Link, withRouter } from 'react-router-dom'
import { getUserId } from '../lib/auth'



class Login extends React.Component{
  state = {
    formData: {
      username: 'DemoAccount',
      password: 'pass'
    },
    color: false,
    invalid: false,
    flashing: true
  }

  handleChange = event => {
    try {
      const formData = { ...this.state.formData, [event.target.name]: event.target.value }
      this.setState({ formData })
    } catch (err) {
      console.log(err)
    }
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await axios.post('/api/login/', { ...this.state.formData })
      setToken(res.data.token)
      window.location.replace(`/profile/${getUserId()}/activity`)
    } catch (err) {
      console.log(err)
      this.setState({ invalid: true })
    }
  }

  componentDidMount() {
    this.handleChangeColor()
  }

  handleChangeColor = () => {
    clearTimeout(this.timer)
    this.setState({ color: true })
    this.timer = setTimeout(this.changeback,100)
  }
  changeback = () => {
    clearTimeout(this.timer)
    this.setState({ color: false })
    this.timer = setTimeout(this.handleChangeColor,2000)
  }

toggleFlash = () => {
  this.state.flashing ? clearTimeout(this.timer) : this.handleChangeColor()
  this.setState({ flashing: !this.state.flashing })
}

componentWillUnmount() {
  clearTimeout(this.timer)
}

render() {

  const changingBg = this.state.color ? 'display-block' : 'display-none'
  const invalid = this.state.invalid ?  'invalid-auth' :  null
  return (
    <>
            
      <div 
        className={`changing-bg  ${changingBg}`}
        style ={ { backgroundImage: 'url(https://bit.ly/37ovt7y)' }}
      />
      <div className='absolute toggle flex'>
        <p className='toggle-text italic'> Flashing Img </p>
        <label className="switch">
          <input 
            onClick={this.toggleFlash}
            type="checkbox"/>
          <span className="slider round"></span>
        </label>
      </div> 

      <Link to='/demo'>
        <button className='demo-button center absolute'> DEMO/INFO</button>
      </Link>

      <div className=' auth center'>
        <div className='center column'>
          
          <Logo/>

          <div className='auth-form center pop-up'>
            <form onSubmit= {this.handleSubmit}>
              <div className='form-field'>            
                <h1>Log in</h1>
                <input
                  className={`${invalid} form-input`}
                  placeholder="Username"
                  name="username"
                  onChange={this.handleChange}
                  value={this.state.formData.username}
                />
              </div>

              <div className='form-field'>       
                <input
                  className={`${invalid} form-input`}
                  type='password'
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange}
                  value={this.state.formData.password}
                />
              </div>
              <p className={this.state.invalid ? 'shake-text' : 'display-none' }> Invalid username or password</p>
              <button className='form-button button'> Login </button>
              <Link to='/register'> <p>Register here</p></Link>
              
            </form>
          </div>
        </div>
      </div>

    </>
  )
}
}

export default withRouter(Login)


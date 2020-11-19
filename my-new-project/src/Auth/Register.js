import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Logo from '../common/Logo'


class Register extends React.Component{
  state = {
    formData: {}
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
      await axios.post('/api/register/', { ...this.state.formData })
      this.props.history.push('/login') 
    } catch (err) {
      console.log(err)

    }
  }


  render(){
    return (
      <>
        
        <div className='center column'>
          <Logo/>

          <div className='auth-form center pop-up'>
            <form onSubmit= {this.handleSubmit}>
              <h1>Register</h1>
              <div className='form-field'>            
                <label className='label'>First Name</label>
                <br/>
                <input
                  className='form-input'
                  placeholder="First name"
                  name="first_name"
                  onChange={this.handleChange}
                />
              </div>

              <div className='form-field'>            
                <label className='label'>Last name</label>
                <br/>
                <input
                  className='form-input'
                  placeholder="Last name"
                  name="last_name"
                  onChange={this.handleChange}
                />
              </div>

              <div className='form-field'>            
                <label className='label'>Username</label>
                <br/>
                <input
                  className='form-input'
                  placeholder="username"
                  name="username"
                  onChange={this.handleChange}
                />
              </div>

              <div className='form-field'>            
                <label className='label'>Email</label>
                <br/>
                <input
                  className='form-input'
                  placeholder="Email"
                  name="email"
                  onChange={this.handleChange}
                />
              </div>

              <div className='form-field'>       
                <label className='label'>Password</label>
                <br/>
                <input
                  className='form-input'
                  type='password'
                  placeholder="password"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>

              <div className='form-field'>       
                <label className='label'>Password Confirmation</label>
                <br/>
                <input
                  className='form-input'
                  type='password'
                  placeholder="password confirmation"
                  name="password_confirmation"
                  onChange={this.handleChange}
                />
              </div>

              <button className='form-button button'> Register Now </button>

              <Link to='/login'> <p>Already a member?</p></Link> 

            </form>
          </div>
        </div>
  
      </>
    )
  }
}

export default Register
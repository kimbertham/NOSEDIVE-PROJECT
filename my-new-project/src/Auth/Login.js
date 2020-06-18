import React from 'react'
import axios from 'axios'
import { setToken } from '../lib/auth'
import { Link } from 'react-router-dom'
import { getUserId } from '../lib/auth'


class Login extends React.Component{
  state = {
    formData: {},
    color: false
  }


  handleChange = event => {
    try {
      const formData = { ...this.state.formData, [event.target.name]: event.target.value }
      this.setState({ formData, error: '' })
    } catch (err) {
      console.log(err)
    }
  }


  handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await axios.post('/api/login/', { ...this.state.formData })
      setToken(res.data.token)
      this.props.history.push(`/profile/${getUserId()}/activity`)
      window.location.reload(false)
    } catch (err) {
      console.log(err)
      this.setState({ error: 'Invalid Credentials' })
    }
  }

  

  handleChangeColor = () => {
    this.setState({ color: !this.state.color })
    this.timer = setInterval(this.changeback,500)
    
  }

  changeback = () => {
    this.setState({ color: false })
  }

  componentDidMount() {
    this.timer = setInterval(this.handleChangeColor,100)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }



  render() {

    const changingBg = this.state.color ? 'display-block' : 'display-none'
    return (
      <> 

        <div 
          className={`changing-bg  ${changingBg}`}
          style ={ { backgroundImage: 'url(https://bit.ly/37ovt7y)' }}>
              hey
        </div>

        <img src='https://i.imgur.com/KC7u7fn.jpg'
          className='auth-logo center'
          alt='logo'/>

        <div className='auth-form center pop-up'>
          <form onSubmit= {this.handleSubmit}>
            <div className='form-field'>            
              <h1>Log in</h1>
              <input
                className='form-input'
                placeholder=" Username"
                name="username"
                onChange={this.handleChange}
              />
            </div>

            <div className='form-field'>       
              <input
                className='form-input'
                type='password'
                placeholder=" Password"
                name="password"
                onChange={this.handleChange}
              />
            </div>

            <button className='form-button button'> Login </button>
            <Link to='/register'> <p>Register .....here</p></Link> 
          </form>
        </div>


      </>
    )
  }
}

export default Login
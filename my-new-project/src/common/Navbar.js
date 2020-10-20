import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class Navbar extends React.Component {
  
handleLogout = () => {
  localStorage.removeItem('token')
  this.props.history.push('/login')
  window.location.reload()
}

handleProfileNav = () => {
  this.props.getData(this.props.cUserId)
  console.log(this.props.cUserId)
}

render(){
  const { cUserId } = this.props
  return (
    <div className='navbar'> 
    
      <Link
        to={`/profile/${this.props.cUserId}/activity`}
        onClick={this.handleProfileNav}>
        <img src='https://bit.ly/3h8vdNh'
          className='nav-icon'
          alt='user-profile'/>
      </Link>

      <Link 
        to={`/home/${cUserId}`}> 
        <img src='https://i.imgur.com/kkeEHVw.jpg'
          className='nav-icon'
          alt='home'/>
      </Link>

      <Link 
        to='/community'>
        <img src='https://i.imgur.com/ZNxb6AE.jpg'
          className='nav-icon'
          alt='community'/>
      </Link>

      <Link 
        to='/messages'>
        <img src='https://i.imgur.com/9caQtx2.jpg'
          className='nav-icon' alt='messages'/>
      </Link>

      <Link to={`/stats/${cUserId}`}>
        <img src='https://i.imgur.com/rr5afgV.jpg'
          className='nav-icon'
          alt='stats'/>
      </Link>

      <Link
        to={`/edit/${cUserId}`}>
        <img src='https://i.imgur.com/BvhVhb3.jpg' 
          className='nav-icon'
          alt='user-profile'/>
      </Link>
      
      <img 
        onClick={this.handleLogout}
        src='https://i.imgur.com/fgiTuvG.jpg' 
        className='nav-icon'
        alt='user-profile'/>

    </div>
  )
}
}

export default withRouter(Navbar)
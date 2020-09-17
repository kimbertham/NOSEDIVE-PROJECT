import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getUserId } from '../lib/auth'


const userId = getUserId()

class Navbar extends React.Component {
  
handleLogout = () => {
  localStorage.removeItem('token')
  this.props.history.push('/login')
  window.location.reload()
}

handleProfileNav = () => {
  this.props.history.push(`/profile/${userId}/activity`)
  window.location.reload()
}

render(){
  return (
    <div className='navbar'> 
    
    

      <div
        onClick={this.handleProfileNav}>
        <img src='https://bit.ly/3h8vdNh'
          className='nav-icon'
          alt='user-profile'/>
      </div>

   
      <Link 
        to={`/home/${userId}`}> 
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

      <Link to={`/stats/${userId}`}>
        <img src='https://i.imgur.com/rr5afgV.jpg'
          className='nav-icon'
          alt='stats'/>
      </Link>

      <Link
        to={`/edit/${userId}`}>
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
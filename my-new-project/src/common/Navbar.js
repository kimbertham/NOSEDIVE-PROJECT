import React from 'react'
import { Link } from 'react-router-dom'
import { getUserId } from '../lib/auth'

const userId = getUserId()

const Navbar = () => {
  

  return (
    <div className='navbar'> 
    
      <Link 
        to={`/profile/${userId}/activity`}>
        <img src='https://bit.ly/3cVoKCU'
          className='nav-icon'
          alt='user-profile'/>
      </Link>

      <Link 
        to='/home'> 
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

    </div>
  )
}

export default Navbar
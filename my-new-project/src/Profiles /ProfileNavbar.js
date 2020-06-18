import React from 'react'
import { Link, withRouter } from 'react-router-dom'


const ProfileNavbar = ({ id }) => {
  const user = id

  return ( 
    <>
      <div  className='profile-nav'>

        <Link 
          to={`/profile/${user}/bio`}> 
          <div className='nav-field'> Bio </div>
        </Link>

        <Link 
          to={`/profile/${user}/activity`}>
          <div className='nav-field'> Activity </div>
        </Link>

        <Link 
          to={`/profile/${user}/photos`}>
          <div className='nav-field'> Photos </div>
        </Link>
        
        <Link 
          to={`/profile/${user}/fans`}>
          <div className='nav-field'> Fans </div>
        </Link>
      
        <Link 
          to={`/profile/${user}/wishlist`}>
          <div className='nav-field'> Wishlist </div>
        </Link>

      </div>

      <br/>
    </>
  )
}

export default withRouter(ProfileNavbar)
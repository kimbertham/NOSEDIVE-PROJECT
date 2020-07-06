import React from 'react'
import { Link, withRouter } from 'react-router-dom'


const ProfileNavbar = ({ userProfile }) => {


  return ( 
    <>
      <div  className='profile-nav dark-border'>

        <Link 
          to={`/profile/${userProfile}/bio`}> 
          <div className='nav-field'> Bio </div>
        </Link>

        <Link 
          to={`/profile/${userProfile}/activity`}>
          <div className='nav-field'> Activity </div>
        </Link>

        <Link 
          to={`/profile/${userProfile}/photos`}>
          <div className='nav-field'> Photos </div>
        </Link>
        
        <Link 
          to={`/profile/${userProfile}/fans`}>
          <div className='nav-field'> Fans </div>
        </Link>
      
        <Link 
          to={`/profile/${userProfile}/wishlist`}>
          <div className='nav-field'> Wishlist </div>
        </Link>

      </div>

    </>
  )
}

export default withRouter(ProfileNavbar)
import React from 'react'
import { Link, withRouter } from 'react-router-dom'


const ProfileNavbar = ({ user }) => {


  return ( 
    <>
      <div  className='profile-nav dark-border'>

        <Link 
          to={`/profile/${user.bio.id}/bio`}> 
          <div className='nav-field'> Bio </div>
        </Link>

        <Link 
          to={`/profile/${user.bio.id}/activity`}>
          <div className='nav-field'> Activity </div>
        </Link>

        <Link 
          to={`/profile/${user.bio.id}/photos`}>
          <div className='nav-field'> Photos </div>
        </Link>
        
        <Link 
          to={`/profile/${user.bio.id}/fans`}>
          <div className='nav-field'> Fans </div>
        </Link>
      
        <Link 
          to={`/profile/${user.bio.id}/wishlist`}>
          <div className='nav-field'> Wishlist </div>
        </Link>

      </div>

    </>
  )
}

export default withRouter(ProfileNavbar)
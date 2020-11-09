import React from 'react'
import { Link } from 'react-router-dom'

const ProfileBio = ( { user,currentUserId }) => {

  const { bio } = user
  if (!user) return ''

  return (
    <>
      {currentUserId === user.bio.id ?
        <Link to={`/edit/${user.bio.id}`}>
          <img src='https://i.imgur.com/BvhVhb3.jpg' 
            className='nav-icon right'
            alt='settings'/>
        </Link>
        : ''}

      <div className='profile-bio-container'>
        <div className='profile-bio-info'>
          <div className="blockquote-wrapper">
            <div className="blockquote">
              <h1>{bio.description}</h1>
            </div>
          </div>
          
          <div className='flex'>
            <img src={bio.profile_image} className='bio-img'/>
            <div> 
              <h1> {bio.first_name} {bio.last_name}</h1>
              <h2> @{bio.username} </h2>
              <h2> {bio.tagline}</h2>
              <br/>
              <h2>Age: {bio.age}</h2>
              <h2>Career status: {bio.career}</h2>
              <h2>Relationship: {bio.relationship}</h2>
              <h2>Location: {bio.location} </h2>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default ProfileBio

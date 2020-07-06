import React from 'react'

const ProfileBio = ( { user }) => {

  const { bio } = user
  if (!user) return ''

  return (
    <div className='profile-bio-container'>
      <div className='profile-bio-info'>
        <div className="blockquote-wrapper">
          <div className="blockquote">
            <h1>{bio.description}</h1>
          </div>
        </div>

        <h1>Age: {bio.age}</h1>
        <h1>Career status: {bio.career}</h1>
        <h1>Relationship: {bio.relationship}</h1>
        <h1>Location: {bio.location} </h1>
      </div>
    </div>
  )
}

export default ProfileBio

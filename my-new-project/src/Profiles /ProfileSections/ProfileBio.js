import React from 'react'



const ProfileBio = ( { user }) => {
  if (!user) return ''
  return (
    <section className='profile-bio-section'>
      <div className='profile-bio-container'>
        <div className='profile-bio-info'>
          

          <div className="blockquote-wrapper">
            <div className="blockquote">
              <h1>{user.description}</h1>
            </div>
          </div>

          <h1>Age: {user.age}</h1>
          <h1>Career status: {user.career}</h1>
          <h1>Relationship: {user.relationship}</h1>
          <h1>Location: {user.location} </h1>
        </div>

      </div>
    </section>
  )
}





export default ProfileBio

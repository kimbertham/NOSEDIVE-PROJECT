import React from 'react' 
import BeautyStars from 'beauty-stars'

const NewsfeedBio = ({ profile }) => {

  if (!profile) return null
  return ( 

    <div className='bordered-box feed-bio flex'>

      <div 
        style={{  
          backgroundImage: `url(${profile.bio.profile_image})` }}
        className='profile-image'/>

      <div>
        <div className='feed-text center'>
          <h1>{profile.rating.toString().slice(0, 3)}
            <small>{profile.rating.toString().slice(3,5)}</small> 
          </h1>
          <p>{profile.bio.first_name} {profile.bio.last_name}</p>
          <p>@{profile.bio.username}</p>
        </div> 

        <BeautyStars
          value={profile.rating}
          size={'2vw'}/>
      </div>

    </div>

  )
}

export default NewsfeedBio
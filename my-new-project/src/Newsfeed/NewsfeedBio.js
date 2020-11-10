import React from 'react' 
import BeautyStars from 'beauty-stars'

const NewsfeedBio = ({ user, average  }) => {

  if (!user) return null
  return ( 

    <div className='bordered-box feed-bio flex'>

      <div 
        style={{  
          backgroundImage: `url(${user.bio.profile_image})` }}
        className='profile-image'/>

      <div>
        <div className='feed-text center'>
          <h1>{average.toString().slice(0, 3)}
            <small>{average.toString().slice(3,5)}</small> 
          </h1>
          <p>{user.bio.first_name} {user.bio.last_name}</p>
          <p>@{user.bio.username}</p>
        </div> 

        <BeautyStars
          value={average}
          size={'2vw'}/>
      </div>

    </div>

  )
}

export default NewsfeedBio
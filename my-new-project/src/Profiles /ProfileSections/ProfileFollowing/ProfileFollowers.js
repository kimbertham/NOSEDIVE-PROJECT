import React from 'react'
import { defaultImage } from '../../../lib/commonFiles'
import { Link } from  'react-router-dom'


const ProfileFollowers = ( { getData, user }) => {
  const { followers, following } = user.follow
  

  if (!followers ) return ''
  return (

    <div className='followers-container fill-width flex'>
      
      <button className='button'> Follow</button>

      {followers.map(follower => {
        return (

          
          <Link 
            to={`/profile/${follower.user_from.id}/activity`}  
            key={follower.id}> 
          
            <div onClick={() => {
              getData(follower.user_from.id)
            }}
              
            className='follow-field dark-border'>

              <div 
                className="follow-pic" 
                style ={ { backgroundImage: `url(${follower.user_from.profile_image ? 
                  follower.user_from.profile_image : defaultImage})` } }/>

              <h1 
                className='italic'> 
                {follower.user_from.first_name} {follower.user_from.last_name}
              </h1>

              <small> 
                Friends since {follower.created.split('-').reverse().join(' ')}
              </small>

            </div>
          </Link>
        )
      })}

    </div>

  )
}

export default ProfileFollowers
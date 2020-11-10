import React from 'react'
import { Link } from 'react-router-dom'

const NewsfeedFriends = ({ friends }) =>  {


  return (
    <div className='bordered-box italic'>
      <h2 className='feed-title dark-border'> Find New Friends</h2>
      <div className= 'find-cont center'>

        {friends ? friends.map(friend => {
          return <div 
            key={friend.id}
            className='friend-cont center  '>
            <Link to={`/profile/${friend.id}/activity`}>
              <div style={{
                backgroundImage: `url(${friend.profile_image})`
              }} className=' friend-icon profile-image '/>

              <p> {friend.first_name} {friend.last_name}</p>
              <p>@{friend.username}</p>
            </Link>
          </div>
        }) :
          <div> Follow more users to make more connections </div>
        }
      </div>
    </div>

  )
}

export default NewsfeedFriends
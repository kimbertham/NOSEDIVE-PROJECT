import React from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'
import { Link } from 'react-router-dom'
const user = getUserId()

class NewsfeedFriends extends React.Component  {
state = {
  friends: []
}

async componentDidMount(){
  const res = await axios.get(`/api/follow/find/${user}/`)
  this.setState({ friends: res.data })
}

render () {
  const { friends } = this.state
  return (
    <div className='bordered-box'>
      <h2 className='feed-title dark-border'> Friends of friends</h2>
      <div className= 'find-cont center'>
        {friends.map(friend => {
          return <div 
            key={friend.id}
            className='friend-cont center italic '>
            <Link to={`/profile/${friend.id}/activity`}>
              <div style={{
                backgroundImage: `url(${friend.profile_image})`
              }} className=' friend-icon profile-image '/>

              <p> {friend.first_name} {friend.last_name}</p>
              <p>@{friend.username}</p>
            </Link>
            <button className='button follow-button'>Follow</button>
          </div>
        
  
        })}
      </div>
    </div>

  )
}
}
export default NewsfeedFriends
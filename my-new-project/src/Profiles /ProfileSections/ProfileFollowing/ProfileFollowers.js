import React from 'react'
import { defaultImage } from '../../../lib/commonFiles'
import { Link } from  'react-router-dom'


class ProfileFollowers extends React.Component { 
  state = {
    fbutton: false
  }

handleButton = () => {
  this.setState({ fbutton: !this.state.fbutton })
}
  
  
render(){

  const { fbutton } = this.state
  const { getData, user } = this.props
  const { followers, following } = user.follow
  const section = fbutton ? 'Followers' : 'Following'

  if (!followers ) return ''
  return (
    <>

      <button onClick={this.handleButton} className='button right'> 
        {section} </button>

      <h1> {user.bio.first_name}&#39;s {section} </h1>

      <div className='followers-container fill-width flex'>
        {fbutton ? 
          <>
            {followers.map(follower => {
              return (
                <Link 
                  to={`/profile/${follower.user_from.id}/activity`}  
                  key={follower.id}> 
                  <div 
                    className='follow-field dark-border'
                    onClick={() => {
                      getData(follower.user_from.id)
                    }}>
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
          </>
          :
          <>
            {following.map(follow => {
              return (
                <Link 
                  to={`/profile/${follow.user_to.id}/activity`}  
                  key={follow.id}> 
                  <div 
                    className='follow-field dark-border'
                    onClick={() => {
                      getData(follow.user_to.id)
                    }}>
                    <div 
                      className="follow-pic" 
                      style ={ { backgroundImage: `url(${follow.user_to.profile_image ? 
                        follow.user_to.profile_image : defaultImage})` } }/>
                    <h1 
                      className='italic'> 
                      {follow.user_to.first_name} {follow.user_to.last_name}
                    </h1>
                    <small> 
                Friends since {follow.created.split('-').reverse().join(' ')}
                    </small>
                  </div>
                </Link>
              )
            })}
          </>
        }




      </div>

    </>

  )
}
}


export default ProfileFollowers
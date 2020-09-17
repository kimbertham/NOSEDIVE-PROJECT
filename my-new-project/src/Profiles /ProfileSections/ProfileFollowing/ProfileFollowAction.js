import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { getUserId,headers } from '../../../lib/auth'
const currentUserId = getUserId()

class ProfileFollowAction extends React.Component {
  state= {
    following: false
  }

  componentDidMount() {
    this.checkFollow()
  }

  checkFollow = () => {
    const following = this.props.following
    for (let i = 0; i < following.length; i++) {
      if (following[i].user_from.id === currentUserId) {
        this.setState({ following: true })
      } else {
        this.setState({ following: false })
      }
    }
  }

  handleFollow = async () => {
    const profileUser = this.props.match.params.id
    const follow = this.state.following ? 'unfollowing' : 'following'
    await axios.post(`/api/follow/${follow}/${profileUser}/`,'', headers())
    this.setState({ following: !this.state.following })
    this.props.updateProfile()
  }
  

  render(){
    const { following } = this.state
    const profileUser = this.props.match.params.id
    return (
      
      <div className={currentUserId.toString() === profileUser ?
        'display-none' : 'follow-button-container'}>

        <button 
          onClick={this.handleFollow}
          className='button follow-button'> 
          {following === true ? 'Unfollow' : 'Follow'}
        </button>
      </div>

    )
  }
}
export default withRouter(ProfileFollowAction)
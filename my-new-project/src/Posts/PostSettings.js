import React from 'react'
import { headers } from '../lib/auth'
import axios from 'axios'

class PostSettings extends React.Component {
state={
  settings: false
}

toggleSettings = () => {
  this.setState({ settings: !this.state.settings })
}

deletePost = async (id) => {
  await axios.delete(`/api/post/${id}/`, headers())
  this.props.updateProfile(this.props.user.bio.id)
}

render() {
  const { post, currentUserId } = this.props
  const { settings } = this.state
  return (

    <div className='settings-icon flex'>
        
      {post.owner.id === currentUserId ?
        <>
          <div className='flex dots-container' 
            onClick={this.toggleSettings}>
            <div className='dots'/> 
            <div className='dots'/> 
            <div className='dots'/>
          </div>
          <div 
 
            onClick={() => {
              this.deletePost(post.id)
            }}
            className={settings ? 
              'post-delete button pointer' : 'display-none'}>
            <p>Delete</p>
          </div>     
        </>  
        : ''}

    </div>
  )
}
}

export default PostSettings
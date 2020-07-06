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

deletePost = (id) => {
  axios.delete(`/api/post/${id}/`, headers())
  this.props.updateProfile()
}

render() {
  const { posts, currentUserId } = this.props
  const { settings } = this.state
  return (

    <div className='settings-icon flex'>
        
      {posts.owner.id === currentUserId ?
        <>
          <div className='flex dots-container' 
            onClick={this.toggleSettings}>
            <div className='dots'/> 
            <div className='dots'/> 
            <div className='dots'/>
          </div>
          <div 
            onClick={() => {
              this.deletePost(posts.id)
            }}
            className={settings ? 
              'post-delete button' : 'display-none'}>
            <p>Delete</p>
          </div>     
        </>  
        : ''}

    </div>
  )
}
}

export default PostSettings
import React from 'react'
import axios from 'axios'
import { headers } from '../../lib/auth'



class MakeComments extends React.Component {

  state = {
    form: 
    { content: '' }
  }

  handleChange = event => {
    const form = { ...this.state.form, [event.target.name]: event.target.value , post: this.props.id  }
    this.setState({ form })
  }
  
  handleSubmit = async event => {
    event.preventDefault()
    const p = this.props.page
    try {

      if (p === 'thread') {
        const parent = this.props.parent === null ? 
          0 : this.props.parent
        const forum = this.props.forum
        await axios.post(`/api/forum/${forum}/${parent}`, 
          this.state.form, headers())
        this.props.getComments()
        this.props.toggleReply()
        this.props.toggleReplies(true)
        
      }
      if (p === 'profile') {
        const postOwner = this.props.post.owner.id
        const postId = this.props.post.id
        await axios.post(`/api/comments/${postOwner}/${postId}/`,
          this.state.form, headers())
        this.props.updateProfile(this.props.user.bio.id)
      }

      this.setState({ form: { content: '' } })

    } catch (err) {
      console.log(err)
    }
  }

  render () {
    const { user } = this.props
    return (
      <>
        
        <form onSubmit={this.handleSubmit}
        
          className='bordered-box make-comment center'>
          <div className={user ? 'display-block' : 'display-none'}>
            <img src={user ? user.bio.profile_image : null} 
              className='small-icon' alt='profile-img' />
          </div>

          <input
            name='content'
            className='comment-input dark-border'
            placeholder='Post a comment'
            onChange={this.handleChange}
            value={this.state.form.content}
          />
          <button className='button comment-button italic'> Comment</button>
        </form>
      </>
    
    )
  }
}

export default MakeComments
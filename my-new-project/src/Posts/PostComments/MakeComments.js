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
    try {
      const postOwner = this.props.posts.owner.id
      const postId = this.props.posts.id
      await axios.post(`/api/comments/${postOwner}/${postId}/`, this.state.form, headers())
      this.setState({ form: { content: '' } })
      this.props.updateProfile()
    } catch (err) {
      console.log(err)
    }
  }

  render () {
    return (

      <form onSubmit={this.handleSubmit}
        className='make-comment-container bordered-box'>
        <input
          name='content'
          className='comment-input dark-border'
          placeholder='Post a comment'
          onChange={this.handleChange}
          value={this.state.form.content}
        />
        <button className='button comment-button italic'> Comment</button>
      </form>

    
    )
  }
}

export default MakeComments
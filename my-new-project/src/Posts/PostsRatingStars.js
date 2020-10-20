import React from 'react'
import axios from 'axios'
import BeautyStars from 'beauty-stars'
import { headers } from '../lib/auth'



class PostsRatingStars extends React.Component {
  state = {
    rating: 0

  }

  handleChange = async rating => {
    this.setState({ rating }, async ()  => {

      const userId = this.props.post.owner.id
      const postId = this.props.post.id
      await axios.post(`/api/postratings/${postId}/${userId}/`,this.state, headers())
      this.props.updateProfile(this.props.userProfile)
    })
  }

  render(){
    return (
      <BeautyStars
        value={this.state.rating}
        size={'12px'}
        onChange={this.handleChange}
      />
    )
  }
}

export default PostsRatingStars
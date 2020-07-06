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
      const userId = this.props.posts.owner.id
      const postId = this.props.posts.id
      await axios.post(`/api/postratings/profile/${userId}/post/${postId}/`,this.state, headers())
      this.props.getPostRatings()
      this.props.updateProfile()
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
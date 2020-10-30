import React from 'react'
import axios from 'axios'
import BeautyStars from 'beauty-stars'
import { headers } from '../lib/auth'



class PostsRatingStars extends React.Component {
  state = {
    rating: 0,
    message: false

  }
  handleChange = async rating => {
    this.setState({ rating }, async ()  => {

      const userId = this.props.post.owner.id
      const postId = this.props.post.id
      await axios.post(`/api/postratings/${postId}/${userId}/`,this.state, headers())
      this.props.updateProfile(this.props.user.bio.id, 'average')
      this.props.updateProfile(this.props.user.bio.id, 'posts')
    })
  }

  showText = () => {
    this.setState({ message: true })
    setTimeout(() => this.setState({ message: false }), 1000)
  }
  

  render(){
    const { post , currentUserId , user } = this.props
    const ave = post.ratings.reduce((a,b) => a + b.rating, 0) / post.ratings.length

    console.log(currentUserId)
    console.log(user.bio.id)
    return (
      <div className='flex column'>
        <BeautyStars
          value={this.state.rating ? this.state.rating : ave}
          size={'12px'}
          onChange={currentUserId === user.bio.id ? this.showText : this.handleChange}/>
        <p className={this.state.message ? 'shake-text italic' : 'display-none'}> &#9432; You cannot rate yourself</p>
      </div>
    )
  }
}

export default PostsRatingStars
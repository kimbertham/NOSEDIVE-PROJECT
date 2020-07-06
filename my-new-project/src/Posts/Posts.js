import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

import PostContent from './PostContent'
import MakeComments from './PostComments/MakeComments'
import PostComments from './PostComments/PostComments'
import PostsRatingStars from './PostsRatingStars'

class Posts extends React.Component {
  state = {
    comments: false,
    ratings: []
  }

  showComments = () => {
    this.setState({ comments: !this.state.comments })
  }

  async componentDidMount() {
    this.getPostRatings()
  }

  getPostRatings = async () => {
    const postId = this.props.posts.id
    const userId = this.props.user.bio.id
    const ratings = await axios.get(`/api/postratings/profile/${userId}/post/${postId}/`) 
    this.setState({ ratings: ratings.data })
  }

  render(){
    const { posts, updateProfile, currentUserId } = this.props
    const { ratings,comments } = this.state
    return (
      <div className='posts'>
          
        <div className='post-stars'>

          <PostsRatingStars
            posts={posts}
            updateProfile={updateProfile} 
            getPostRatings={this.getPostRatings}/>
        </div>

        <PostContent 
          posts={posts}
          ratings={ratings}
          showComments={this.showComments} 
          currentUserId={currentUserId}
          updateProfile={updateProfile}/>
            

        <div className={comments ?
          'display-block' : 'display-none'}>

          {posts.comments.map(comment => {
            return (
              <PostComments 
                key={comment.id} 
                comment={comment}
                updateProfile={updateProfile}/>
            )
          })}

          <MakeComments 
            posts={posts}
            updateProfile={updateProfile}/>

        </div>
      </div>
    )
  }
}

export default withRouter(Posts)
import React from 'react'
import axios from 'axios'

import PostContent from './PostContent'
import MakeComments from './PostComments/MakeComments'
import PostComments from './PostComments/PostComments'
import PostsRatingStars from './PostsRatingStars'
import { getUserId } from '../lib/auth'

class Posts extends React.Component {
  state = {
    comments: false,
    ratings: []
  }

  showComments = () => {
    this.setState({ comments: !this.state.comments })
  }

  async componentDidMount() {
    const postId = this.props.posts.id
    const userId = getUserId()
    const ratings = await axios.get(`/api/postratings/profile/${userId}/post/${postId}`) 
    this.setState({ ratings: ratings.data })
    
  }

  render(){
    const { posts, data, updateProfile } = this.props
    const { ratings } = this.state
    return (
      <div className='posts'>
          
        <div className='post-stars'>
          <PostsRatingStars
            postId={posts.id} 
            userId={posts.owner.id} 
            updateProfile={updateProfile} 
            data={data}/>
        </div>

        <PostContent 
          posts={posts}
          ratings={ratings}
          showComments={this.showComments} />
            

        <div className=
          {this.state.comments === true ?
            'display-block' : 'display-none'}>

          {posts.comments.map(comment => {
            return (
              <PostComments 
                key={comment.id} 
                comment={comment}/>
            )
          })}

          <MakeComments 
            ownerId={posts.owner.id} 
            postId={posts.id} 
            data={data}/>

        </div>

      </div>
    )
  }
}

export default Posts
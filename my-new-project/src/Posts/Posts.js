import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import PostContent from './PostContent'
import MakeComments from './PostComments/MakeComments'
import PostComments from './PostComments/PostComments'
import PostsRatingStars from './PostsRatingStars'
import RatingModal from './RatingModal'

class Posts extends React.Component {
  state = {
    comments: false,
    ratings: [],
    ratingModal: false,
    ratingPop: ''
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

  showComments = () => {
    this.setState({ comments: !this.state.comments })
  }

  showRatings = (info) => {
    if (info){
      this.setState({ ratingPop: info }) 
    }
    this.setState({ ratingModal: !this.state.ratingModal })
  }

  render(){
    const { posts, updateProfile, currentUserId, user } = this.props
    const { ratings,comments, ratingModal,ratingPop } = this.state

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
          showRatings={this.showRatings}
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
                updateProfile={updateProfile}
                page={'profile'}/>
            )
          })}

          <MakeComments 
            posts={posts}
            user={user}
            updateProfile={updateProfile}/>
        </div>


        <RatingModal
          ratingPop={ratingPop}
          ratingModal={ratingModal}
          showRatings={this.showRatings}/>


      </div>

    )
  }
}

export default withRouter(Posts)
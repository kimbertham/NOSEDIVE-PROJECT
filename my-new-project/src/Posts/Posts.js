import React from 'react'
import { withRouter } from 'react-router-dom'
import PostContent from './PostContent'
import MakeComments from './PostComments/MakeComments'
import PostComments from './PostComments/PostComments'
import PostsRatingStars from './PostsRatingStars'
import RatingModal from './RatingModal'

class Posts extends React.Component {
  state = {
    comments: false,
    ratingModal: false,
    ratingPop: ''
  }


  showComments = () => {
    this.setState({ comments: !this.state.comments })
  }

  showRatings = (i) => {

    if (i) {
      this.setState({ ratingPop: i }) 
    }

    this.setState({ ratingModal: !this.state.ratingModal })
  }

  render(){
    const { post, userProfile, currentUserId, updateProfile } = this.props
    const { comments, ratingModal,ratingPop } = this.state

    return (
      <div className='posts'>
          
        <div className='post-stars'>
          <PostsRatingStars
            post={post}
            updateProfile={ updateProfile}
            userProfile={userProfile}/>
        </div>

        <PostContent 
          post={post}
          showRatings={this.showRatings}
          showComments={this.showComments} 
          currentUserId={currentUserId}
          userProfile={userProfile}
          updateProfile={ updateProfile }/>
            

        <div className={comments ?
          'display-block' : 'display-none'}>
          {post.comments ? post.comments.map(comment => {
            return (
              <PostComments 
                key={comment.id} 
                comment={comment}
                userProfile={userProfile}
                updateProfile={ updateProfile }
                page={'profile'}/>
            )
          }) : null}

          <MakeComments 
            post={post}
            updateProfile={updateProfile}
            userProfile={userProfile}
            page={'profile'}/>
            
        </div>

        <RatingModal
          ratingPop={ratingPop}
          ratingModal={ratingModal}
          showRatings={this.showRatings}
          updateProfile={updateProfile}/>

      </div>

    )
  }
}

export default withRouter(Posts)
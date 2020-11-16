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
    const { post, currentUserId, updateProfile, user } = this.props
    const { comments, ratingModal,ratingPop } = this.state
    
    return (
      <div className='posts'>
          
        <div className='post-stars'>
          <PostsRatingStars
            post={post}
            user={user}
            updateProfile={ updateProfile}
            currentUserId={currentUserId}/>
        </div>

        <PostContent 
          post={post}
          user={user}
          updateProfile={updateProfile}
          showRatings={this.showRatings}
          showComments={this.showComments} 
          currentUserId={currentUserId}/>
            

        <div className={comments ?
          'display-block' : 'display-none'}>
          {post.comments ? post.comments.map(comment => {
            return (
              <PostComments 
                key={comment.id} 
                comment={comment}
                user={user}
                updateProfile={ updateProfile }
                currentUserId={currentUserId}
                page={'profile'}/>
            )
          }) : null}

          <MakeComments 
            post={post}
            updateProfile={updateProfile}
            user={user}
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
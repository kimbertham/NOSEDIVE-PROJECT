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

  showRatings = (info) => {
    if (info){
      this.setState({ ratingPop: info }) 
    }
    this.setState({ ratingModal: !this.state.ratingModal })
  }

  render(){
    const { post, getPosts, currentUserId, updateProfile } = this.props
    const { comments, ratingModal,ratingPop } = this.state

    return (
      <div className='posts'>
          
        <div className='post-stars'>
          <PostsRatingStars
            post={post}
            getPosts={ getPosts }
            updateProfile={updateProfile} />
        </div>

        <PostContent 
          post={post}
          showRatings={this.showRatings}
          showComments={this.showComments} 
          currentUserId={currentUserId}
          getPosts={ getPosts }/>
            

        <div className={comments ?
          'display-block' : 'display-none'}>
          {post.comments ? post.comments.map(comment => {
            return (
              <PostComments 
                key={comment.id} 
                comment={comment}
                getPosts={ getPosts }
                page={'profile'}/>
            )
          }) : null}

          <MakeComments 
            post={post}
            getPosts={getPosts }
            page={'profile'}
          />
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
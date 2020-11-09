/* eslint-disable camelcase */
import React from 'react' 
import ThreadOptions from './ThreadOptions'

class Recursive extends React.Component {
state = {
  replies: false
}

toggleReplies = (set) => {
  set ? this.setState({ replies: set })
    : this.setState({ replies: !this.state.replies })
}


render() {
  const { comment, getComments } = this.props
  const { comment_owner } = comment
  const { replies } = this.state
  console.log(comment)
  return (
    <>
      <div className='tcom-top dark-border'>
        <p className={comment.parent === null ? 
          'display-none' : 'right'}>
          {'<<<'} </p>
      </div>

      <div className='tcom-contain bordered-box'>
        <div className='flex'>

          <div className='indent center'>
            <div className='line'/>
            <div className='text'/>
          </div>

          <div className='tcom-info center'>
            <img alt='profile-img' className='small-icon'
              src={comment_owner.profile_image}/>
            <p>{comment_owner.first_name} {comment_owner.last_name}</p>
            <small>{comment.created_at}</small>
          </div>

          <div className='full-width'>
            <div className='bordered-box tcom-cont'>
              <p>{comment.content}</p>

            </div>
            <ThreadOptions 
              comment={comment}
              getComments={getComments}
              replies={this.state.replies}
              toggleReplies={this.toggleReplies}/>
          </div>
        </div>


        <div 
          className={replies ? 
            'display-block' :  'display-none' }>
          {comment.children ? comment.children.map(comment => {
            return (
              <Recursive 
                key={comment.id}
                comment={comment}
                getComments={getComments}/>
            )
          }) : null}
        </div>

      </div>
    </>
  )
}
}

export default Recursive
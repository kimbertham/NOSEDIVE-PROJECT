import React from 'react'
import { defaultImage } from '../../lib/commonFiles'

const PostComments = ( { comment }) => {
  return (
    <div 
      key={comment.id}
      className='post-comments dark-border flex'>

      <img className='small-icon' 
        src={comment.comment_owner.profile_image ? 
          comment.comment_owner.profile_image : defaultImage}
        alt='commenter-img'/>
      
      <div className='full-width'>
        <p>{comment.content} </p>
        <div className='comment-details'> 
          <small>{comment.comment_owner.first_name} {comment.comment_owner.last_name} </small>
          <small>{comment.created_at.slice(0, 10).split('-').reverse().join(' ')}</small>
        </div>
      </div>

    </div>
  )
}

export default PostComments
import React from 'react'
import axios from 'axios'
import { defaultImage } from '../../lib/commonFiles'
import { headers,getUserId } from '../../lib/auth'
const currentUserId = getUserId()

const PostComments = ( { comment, updateProfile }) => {

  const deleteComment = async () => {
    await axios.delete(`/api/comments/${comment.id}/`, headers())
    updateProfile()
  }

  return (

    <div 
      key={comment.id}
      className='post-comments dark-border flex'>

      <img 
        className='small-icon' 
        src={comment.comment_owner.profile_image ? 
          comment.comment_owner.profile_image : defaultImage}
        alt='commenter-img'/>

      
      <div className='full-width '>
        <div className='comment-content'>
          <p>{comment.content}</p>
          {comment.comment_owner.id === currentUserId ? 
            <small 
              className='pointer'
              onClick={deleteComment}>Delete</small> 
            : '' }
        </div>

        <div className='comment-details'> 
          <small>{comment.comment_owner.username} </small>
          <small>
            {comment.created_at.split('-').reverse().join(' ')}
          </small>
        </div>
        
      </div>
    </div>
  )
}

export default PostComments
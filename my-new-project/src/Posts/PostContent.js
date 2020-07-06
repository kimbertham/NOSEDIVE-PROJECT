import React from 'react'
import { defaultImage } from '../lib/commonFiles'
import PostSettings from './PostSettings'

const PostContent = ({ posts, showComments, ratings,updateProfile, currentUserId }) => { 

  return (

    <div className='post-view flex'>

      <img className='post-icon'
        alt='post-owner-pic'
        src={posts.owner.profile_image ? 
          posts.owner.profile_image : defaultImage}/>

      <div className='full-width'>
        <h1> {posts.owner.first_name} {posts.owner.last_name}</h1>
        <div className='flex post-settings'>
          <p className='date-text'>
            {posts.created_at.split('-').reverse().join(' ')}</p>

          <PostSettings
            posts={posts}
            currentUserId={currentUserId}
            updateProfile={updateProfile}/> 

        </div>

        <p className='post-content italic'>{posts.content}</p>
          
        <div className='post-interactions'>
          <small>rated by {ratings.length}</small>
          <div onClick={showComments}>
            <small className='button comment-button'> 
            Comments ({posts.comments.length})
            </small>
          </div>
        </div>
      </div>
    </div>
  )
}


export default PostContent
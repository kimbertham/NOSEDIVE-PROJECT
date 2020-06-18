import React from 'react'
import { defaultImage } from '../lib/commonFiles'

const PostContent = ({ posts, showComments, ratings }) => {
  return (


    <div className='post-view flex '>
      <img className='post-icon'
        src={posts.owner.profile_image ? 
          posts.owner.profile_image : defaultImage}
        alt='post-owner-pic'/>
      <div className='full-width'>
        <h1>
          {posts.owner.first_name} {posts.owner.last_name}
        </h1>
        <p className='date-text'>
          {posts.created_at.slice(0, 10).split('-').reverse().join(' ')}
        </p>
        <p className='post-content italic'>
          {posts.content}
        </p>
        <div className='post-interactions'>
          <small>rated by {ratings.length}</small>
          <div onClick={showComments}>
            <small>Comments ({posts.comments.length})</small>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default PostContent
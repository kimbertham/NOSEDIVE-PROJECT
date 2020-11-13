import React from 'react'
import { defaultImage } from '../lib/commonFiles'
import PostSettings from './PostSettings'
import { Link } from 'react-router-dom'

const PostContent = ({ post, showComments ,updateProfile, currentUserId, user, showRatings }) => { 
  return (
    <>

      <div className='post-view flex'>
        
        <Link to={`/profile/${post.owner.id}/activity`} >
          <img className='post-icon'
            alt='post-owner-pic'
            src={post.owner.profile_image ? 
              post.owner.profile_image : defaultImage}
            onClick={()=>{
              updateProfile(post.owner.id)
            }}/>
        </Link>
        <div className='full-width'>
          <h1> {post.owner.first_name} {post.owner.last_name} 
            <span> {post.owner.id !== post.profile_owner.id ? `  >>  ${post.profile_owner.first_name}${post.profile_owner.last_name} ` : ''} </span>
          </h1>
          <div className='flex post-settings'>
            <p className='date-text'>
              {post.created_at.split('-').reverse().join(' ')}</p>
            

            <PostSettings
              post={post}
              currentUserId={currentUserId}
              user={user}
              updateProfile={updateProfile}/> 
          </div>

          <p className='post-content italic'>{post.content}</p>
          
          <img src={post.image} className='post-image' />
          
          <div className='post-interactions'>
            <small 
              className='button pointer comment-button'
              onClick={() => {
                showRatings(post.ratings)
              }}>rated by {post.ratings.length}</small>

            <small 
              onClick={showComments}
              className='button pointer comment-button'> 
            Comments ({post.comments ? post.comments.length : null})</small>
  
          </div>
        </div>
      </div>
    </>
  )
}


export default PostContent
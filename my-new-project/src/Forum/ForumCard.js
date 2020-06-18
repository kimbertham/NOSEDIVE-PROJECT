import React from 'react'
import { Link } from 'react-router-dom'


const ForumCard = ({ thread }) => {
  if (!thread) return ''
  return (
    <>
      <Link to={`forum/${thread.id}`}>
        <div key={thread.id}
          className=' forum-thread bordered-box dark-border  flex'>

          <div className='flex'>
            <img src={thread.image}
              className='forum-icon
                dark-border'
              alt='forum-pic'/>

            <div>
              <h1>{thread.title}</h1>
              <p>{thread.description}</p>
              <div className='thread-small'>
                <p>Created by: {thread.forum_owner.first_name} {thread.forum_owner.last_name} </p>
                <p>Created at: {thread.created_at}</p>
              </div>
            </div>
          </div>
          {thread.limitations ? 
            <p className='thread-limits'>
                NO { thread.limitations } STARS ALLOWED 
            </p> : ''}
        </div>
      </Link>

    </>
  )
}

export default ForumCard

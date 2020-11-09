import React from 'react'
import { Link } from 'react-router-dom'


const ForumCard = ({ thread }) => {
  if (!thread) return ''
  return (
    <>
      <Link to={`forum/${thread.id}`}>

        <div key={thread.id}
          className='forum-thread bordered-box dark-border flex'>

          <div className='flex full-width'>
            
            <div 
              style={{  
                backgroundImage: `url(${thread.image})`
              }} className=' dark-border forum-icon '/>

            <div className='full-width'>
              <div className='flex-between'> 
                <h1>{thread.title}</h1>
                {thread.limitations ? 
                  <p className='thread-limits'> NO { thread.limitations } STARS ALLOWED </p> 
                  : null}
              </div>
              <p>{thread.description}</p>
              <div className='thread-small'>
                <p>Created by: {thread.forum_owner.first_name} {thread.forum_owner.last_name} </p>
                <p>Created at: {thread.created_at}</p>
              </div>
            </div>
          </div>
  
        </div>
      </Link>

    </>
  )
}

export default ForumCard

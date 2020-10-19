import React from 'react' 
import { Link } from 'react-router-dom'

const ForumNews = ({ thread }) => {
  return (
    <>
      <Link to={`/forum/${thread.forum.id}`}>
        <div className='news-f-cont bordered-box flex'>
          <img src={thread.forum.image} className='small-icon' alt='group-img'/>
          <div>
            <p className='news-f-title'>{thread.comment_owner.first_name} 
              {thread.comment_owner.last_name} &gt;&gt;&gt; {thread.forum.title} </p> 
            <p className='news-f-content'>{thread.content.substring(0,80)}...</p>
          </div>
        </div>
      </Link>
    </>

  )
}

export default ForumNews
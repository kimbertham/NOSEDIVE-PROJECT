import React from 'react'


const SidebarPosts = ({ posts }) => {

  if (!posts) return ''
  return (
    <>
      {posts.map(post => {
        return (
          <div 
            key={post.id}
            className='sidebar-post-field'>
            <h1>{post.owner.first_name} {post.owner.last_name}</h1>
            <p>{post.content}</p>
            <p> {post.ratings.length === 1 ? 
              `${post.ratings.length} PERSON RATED THIS POST` :
              `${post.ratings.length} PEOPLE RATED THIS POST`} </p>
          </div>
        )
      })}
    </>
  )
}

export default SidebarPosts
import React from 'react'
import Posts from '../../../Posts/Posts'
import MakePost from '../../../Posts/MakePost'
import ProfileInteractions from './ProfileInteractions'

const ProfileActivity = ({   user, updateProfile, currentUserId }) => {

  const { posts,ratings } = user

  if (!posts) return ''
  return (
    <>

      {currentUserId === user.bio.id ?
        <MakePost 
          updateProfile={updateProfile}
          page='profile-post'/>
        : ''}


      <div className='flex'>
        <div className=' profile-posts bordered-box'>
          {posts.slice(0).reverse().map(post => {
            return <Posts 
              key={post.id} 
              user={user}
              posts={post}
              currentUserId={currentUserId} 
              updateProfile={updateProfile}/>
          })}
        </div>

        <div className='sticky'>
          <ProfileInteractions
            user={user}
            ratings={ratings}/>
        </div>
      </div>

    </>
  )
}


export default ProfileActivity
import React from 'react'
import Posts from '../../../Posts/Posts'
import MakePost from '../../../Posts/MakePost'
import ProfileInteractions from './ProfileInteractions'

const ProfileActivity = ( { user, currentUserId, updateProfile, modal, handleModal }) => {

  const { posts } = user
  if (!posts) return ''
  return (
    <>

      <MakePost 
        page='profile-post'
        updateProfile={updateProfile}
        user={user}
      />
      
      <div className='flex'>
        <div className=' profile-posts bordered-box'>
          {posts.slice(0).reverse().map(post => {
            return <Posts 
              key={post.id}
              modal={modal}
              handleModal={handleModal}
              post={post}
              currentUserId={currentUserId} 
              updateProfile={updateProfile}
              user={user}/>
          })}
        </div>

        <div className='sticky'>
          <ProfileInteractions
            user={user}/>
        </div>
      </div>

    </>
  )
}


export default ProfileActivity
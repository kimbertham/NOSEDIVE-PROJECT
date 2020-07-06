import React from 'react'
import Posts from '../../../Posts/Posts'
import MakePost from '../../../Posts/MakePost'
import ProfileInteractions from './ProfileInteractions'

class ProfileActivity extends React.Component {

  render() {

    const { 
      user, 
      updateProfile, 
      currentUserId } = this.props

    const { posts,ratings } = user

    if (!posts) return ''
    return (
      <>

        {currentUserId === user.bio.id ?
          <MakePost 
            updateProfile={updateProfile}/>
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
}

export default ProfileActivity
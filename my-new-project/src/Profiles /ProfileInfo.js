import React from 'react'
import { defaultImage } from '../lib/commonFiles'
import ProfileRatingStars from './ProfileSections/ProfileActivity/ProfileRatingStars'
import ProfileFollowAction from './ProfileSections/ProfileFollowing/ProfileFollowAction'

const ProfileInfo = ({ user,handleModal, modal, updateProfile, currentUserId }) => {

  const { bio, average, follow } = user


  if (!user.bio) return null
  return (
  
    <div className='profile-info'>
      <div className='flex'>

        <div 
          style={{  
            backgroundImage: `url(${bio.profile_image ? 
              bio.profile_image : defaultImage})`
          }} className='profile-image'/>

        <div className='profile-text'>
          <div className='center'>
            <h1> {bio.first_name} {bio.last_name}</h1>

            <ProfileFollowAction
              userProfile={bio.id}
              updateProfile={updateProfile}
              following={follow.followers}
              currentUserId={currentUserId}/>
          </div>

          <div className='profile-details'>
            <h1>{average ? average.toString().slice(0, 3) : 0}
              <small>{average ? average.toString().slice(3,5) : 0}</small> 
            </h1>
            <p>{bio.tagline}</p>
          </div>
        </div>
        
      </div>
      <div>

        <ProfileRatingStars 
          userProfile={bio.id}
          average={average}
          currentUserId={currentUserId}
          updateProfile={updateProfile}
          modal={modal}
          handleModal={handleModal}/>
      </div>
    </div>
    
  )
}

export default ProfileInfo
import React from 'react'
import { defaultImage } from '../lib/commonFiles'
import ProfileRatingStars from './ProfileSections/ProfileActivity/ProfileRatingStars'
import ProfileFollowAction from './ProfileSections/ProfileFollowing/ProfileFollowAction'



const ProfileInfo = ({ user,handleModal, modal, updateProfile }) => {

  const { bio, avg, followers } = user

  if (!user) return ''
  return (
  
    <div className='profile-info'>
      <div className='flex'>


        <div 
          style={{  
            backgroundImage: `url(${bio.profile_image ? 
              bio.profile_image : defaultImage})`
          }} className='profile-image'/>

        {/* <img 
          className='circle profile-image'
          alt='profile-pic'
          src={bio.profile_image ? 
            bio.profile_image : defaultImage}/> */}

        <div className='profile-text'>
          <div className='center'>
            <h1> {bio.first_name} {bio.last_name}</h1>

            <ProfileFollowAction
              updateProfile={updateProfile}
              following={followers}/>
          </div>

          <div className='profile-details'>
            <h1>{avg ? avg.toString().slice(0, 3) : 0}
              <small>{avg ? avg.toString().slice(3,5) : 0}</small> 
            </h1>
            <p>{bio.tagline}</p>
          </div>
        </div>
        
      </div>
      <div>

        <ProfileRatingStars 
          user={user} 
          updateProfile={updateProfile}
          modal={modal}
          handleModal={handleModal}/>
      </div>
    </div>
    
  )
}

export default ProfileInfo
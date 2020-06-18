import React from 'react'
import { defaultImage } from '../lib/commonFiles'
import ProfileRatingStars from './ProfileRatingStars'



const ProfileInfo = ({ user, rating, data, handleModal, modal }) => {

  const modalClass = modal ? 'display-block' : 'display-none'
  if (!user) return ''
  return (
    <>
      <div className='profile-info'>
      
        <div className='flex'>
          <img 
            src={user.profile_image ? user.profile_image : defaultImage} 
            className='circle profile-image'
            alt='profile-pic'
          />

          <div className='profile-text'>
            <h1> {user.first_name} {user.last_name} </h1>
            <div className='profile-details'>
              <h1>{rating ? rating.toString().slice(0, 3) : 0}
                <small>{rating ? rating.toString().slice(3,5) : 0}</small> 
              </h1>
              <p> {user.tagline} </p>
            </div>
          </div>
        </div>


        <div>
          <div >
            <ProfileRatingStars id={user.id} data={data}/>
            <div className='center'
            >
              <small onClick={handleModal}>leave feedback</small>
            </div>
          </div>
    
          <div className={`${modalClass} center`}
          >
            <div>
              <select defaultValue={''} id="feedback">
                <option value="" disabled></option>
                <option value="1">Unpleasant Smell</option>
                <option value="2">Rude Interaction</option>
                <option value="3">Unattractive</option>
                <option value="3">Impoverished Vibes</option>
                <option value="3">Discriminatory</option>
              </select>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default ProfileInfo
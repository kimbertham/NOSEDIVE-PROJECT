import React from 'react'
import { defaultImage } from '../../../lib/commonFiles'


const ProfileInteractions = ({ user }) => {


  return (
    <section className='profile-interactions dark-border italic sticky'>
      <div className='sticky int-h1'> <h1> Interactions</h1> </div>
      <div className='scroll'>

        {user.ratings.map(interaction => {
          return (
            <div key={interaction.id} 
              className='posts-interactions dark-border flex'>

              <img 
                src={interaction.owner.profile_image ?
                  interaction.owner.profile_image : defaultImage}
                className='small-icon'
                alt='profile-pic'/>

              <p> {`${interaction.owner.username} 
              rated ${user.bio.username}
              ${interaction.rating} stars `} </p>
            </div>
          )
        })}

      </div>
    </section>
  )
}


export default ProfileInteractions
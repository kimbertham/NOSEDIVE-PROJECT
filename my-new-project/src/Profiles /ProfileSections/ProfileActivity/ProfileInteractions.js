import React from 'react'
import { defaultImage } from '../../../lib/commonFiles'
import { Link } from 'react-router-dom'


const ProfileInteractions = ({ user, updateProfile }) => {


  return (
    <section className='profile-interactions dark-border italic sticky'>
      <div className='sticky int-h1'> <h1> Interactions</h1> </div>
      <div className='scroll'>

        {user.ratings.map(interaction => {
          return (
            <Link key={interaction.id}
              to={`/profile/${interaction.owner.id}/activity`} >
              <div
                className='posts-interactions dark-border flex'
                onClick={()=>{
                  updateProfile(interaction.owner.id)
                }}>

                <img 
                  src={interaction.owner.profile_image ?
                    interaction.owner.profile_image : defaultImage}
                  className='small-icon'
                  alt='profile-pic'/>

                <p> {`${interaction.owner.username} 
              rated ${user.bio.username}
              ${interaction.rating} stars `} </p>
              </div>
            </Link>
          )
        })}

      </div>
    </section>
  )
}


export default ProfileInteractions
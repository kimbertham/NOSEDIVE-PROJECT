import React from 'react'
import { Link } from 'react-router-dom'
const RatingModal = ({ showRatings, ratingModal, ratingPop, updateProfile }) => {

  return (

    <div
      className={ratingModal ? 'modal center ' : 'display-none'}
      onClick={showRatings}>

      <div className='modal-pop ratings-modal'>

        <h1 className='bordered-box'>Post Ratings</h1>

        {ratingModal ? ratingPop.map(ratings => {
          return ( 

            <div key={ratings.id} onClick={()=> updateProfile(ratings.rating_owner.id)}>
              <Link to={`/profile/${ratings.rating_owner.id}/activity`} 
                className=' center bordered-box flex'> 
                <img 
                  className='small-icon' alt='profile-img'
                  src={ratings.rating_owner.profile_image} />
                <p>{ratings.rating_owner.first_name} {ratings.rating_owner.last_name} rated this post {ratings.rating} stars</p>
              </Link>
            </div>
          )
        }) : ''
        }

      </div>
    </div>
  )
}


export default RatingModal
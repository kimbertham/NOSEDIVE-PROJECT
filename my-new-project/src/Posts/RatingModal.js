import React from 'react'

const RatingModal = ({ showRatings, ratingModal, ratingPop }) => {

  return (

    <div
      className={ratingModal ? 'modal center ' : 'display-none'}
      onClick={showRatings}>

      <div className='modal-pop ratings-modal'>

        <h1 className='bordered-box'>Post Ratings</h1>

        {ratingModal ? ratingPop.map(ratings => {
          return ( 
            <div 
              className='bordered-box flex center'
              key={ratings.id}>
              <img 
                className='small-icon' alt='profile-img'
                src={ratings.rating_owner.profile_image} />
              <p>{ratings.rating_owner.first_name} {ratings.rating_owner.last_name} rated this post {ratings.rating} stars</p>
            </div>
          )
        }) : ''
        }

      </div>
    </div>
  )
}


export default RatingModal
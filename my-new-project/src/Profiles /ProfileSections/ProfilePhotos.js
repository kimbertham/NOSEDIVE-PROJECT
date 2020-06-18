import React from 'react'
import ImageUpload from '../../common/ImageUpload'

const ProfilePhotos = ({ images }) => {

  return (
    <>

      <h1> Kimberleys Photos </h1>
      <ImageUpload/>

      <div className='profile-photos bordered-box dark-border'>

        {images ? images.map(image => {
          return <div key={image.id}
            className="users-photos" 
            style ={ { backgroundImage: `url(${image.image})` } }></div>
        }) : ''}
        
      </div>
    </>

  )
}

export default ProfilePhotos
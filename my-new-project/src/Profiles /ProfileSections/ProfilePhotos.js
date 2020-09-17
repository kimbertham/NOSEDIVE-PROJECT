import React from 'react'
import ImageUpload from '../../common/ImageUpload'
import  axios from 'axios'
import { headers } from '../../lib/auth'

class ProfilePhotos extends React.Component {
state={
  image: '',
  i: '',
  gallery: false,
  loading: false
}


  openImage = (image , i) => {
    if (image && i) {
      this.setState({ image, i, gallery: true })
    } else 
      this.setState({ gallery: !this.state.gallery })
  }

  dontCloseModal = (e)=> {
    e.stopPropagation()
    this.setState({ gallery: true })
  }

  deleteImg = async () => {
    await axios.delete(`/api/photos/${this.state.image.id}/`, headers())
    this.openImage()
    this.props.updateProfile()
  }

  handleImage = (action) => {
    let image 
    let i
    if (action === 'next') {
      i = this.state.i + 1
      image = this.props.user.photos[i]
      if (!this.props.user.photos[i]) {
        i = 0
        image = this.props.user.photos[0]
      }
    } else {
      i = this.state.i - 1
      image = this.props.user.photos[i]
      if (!this.props.user.photos[i]) {
        i = this.props.user.photos.length - 1
        image = this.props.user.photos[0]
      }
    }
    this.setState({ image, i })
  }


  render(){
    const { updateProfile, currentUserId, user } = this.props
    const { photos } = user
    const { image, gallery } = this.state

    return (
      <>

        <h1> Kimberleys Photos </h1>

        {currentUserId === user.bio.id ? 
          <ImageUpload
            updateProfile={updateProfile}/>
          : ''}
        
        <div 
          onClick={this.openImage}
          className={`modal center
          ${gallery ? '' : 'display-none'}`}>
          
          <div 
            onClick={this.dontCloseModal}
            className='gallery-container '>

            <button 
              className='gallery-button'
              onClick={()=>{
                this.handleImage('prev')
              }}> {'<<<'} </button>

            <img src={image.image}
              className='gallery-image'
              alt='user-img'/>

            <img 
              onClick={this.deleteImg}
              src='https://i.imgur.com/ptmQbO9.jpg'
              className='img-settings'
              alt='delete-img'/>

            <button 
              className='gallery-button'
              onClick={()=>{
                this.handleImage('next')
              }}> {'>>>'} </button>
          </div>
        </div>

        <div className='profile-photos bordered-box dark-border'>
          {photos ? photos.map((image,i) => {
            return <div 
              key={image.id}
              onClick={()=>{
                this.openImage(image, i)
              }}
              className="users-photos" 
              style ={ { backgroundImage: `url(${image.image})` } }></div>
          }) : ''}
        </div>

      </>
    )
  }
}

export default ProfilePhotos
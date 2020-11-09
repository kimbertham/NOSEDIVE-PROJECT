import React from 'react'
import axios from 'axios'
import BeautyStars from 'beauty-stars'
import { headers } from '../../../lib/auth'



class ProfileRatingStars extends React.Component {
  state = {
    rating: 0 ,
    feedback: '',
    modal: false,
    message: false, 
    info: false
  }

  handleChange = async rating => {
    this.setState({ rating }, async ()  => {
      await axios.post(`/api/ratings/${this.props.userProfile}/`, this.state , headers() )
      this.props.updateProfile(this.props.userProfile, 'average')
      this.props.updateProfile(this.props.userProfile, 'ratings')
    })
  }

  handleFeedback = (event) => {
    this.setState({ feedback: event.target.value })
  }

  handleModal = () => {
    this.setState({ modal: !this.state.modal })
  }

handleinfo = () => {
  this.setState({ info: ! this.state.info })
}

  showText = () => {
    this.setState({ message: true })
    setTimeout(() => this.setState({ message: false }), 1000)
  
  }

  render(){
    const { modal, message,info } = this.state
    const { currentUserId, userProfile, average } = this.props
    return (
      <>
        <div className='feedback-container'>

          {currentUserId === userProfile ? 
            <>
              <BeautyStars
                value={average}
                size={'30px'}
                onChange={this.showText}/>
              <p className={message ? 'shake-text italic' : 'display-none'}> &#9432; You cannot rate yourself</p>
            </>
            :
            <>
              <BeautyStars
                value={this.state.rating}
                size={'30px'}
                onChange={this.handleChange}/>

              <div className='center' 
                onClick={this.handleModal}>
                <button className='button'> 
            Leave feedback...
                </button>
              </div>
            </>
          }

          <div className={modal ? 
            'center' : 'display-none'}>

            <div className='italic' onClick={this.handleinfo}> &#9432;</div>
            <div className={info ? 'feedback-i' : 'display-none'}> 
              <div onClick={this.handleinfo}>
              Choose your feedback option first then send it off with your star rating choice
                <p className='absolute right'> x </p>
              </div>
            </div>
            
            <select id="feedback"
              value={this.state.feedback}
              onChange={this.handleFeedback} >
              <option value=''></option>
              <option value="Unpleasant Smell">Unpleasant Smell</option>
              <option value="Rude Interaction">Rude Interaction</option>
              <option value="Unattractive">Unattractive</option>
              <option value="Impoverished Vibes">Impoverished Vibes</option>
              <option value="Discriminatory">Discriminatory</option>
            </select>
          </div>
        </div>
        
      </>
    )
  }
}

export default ProfileRatingStars
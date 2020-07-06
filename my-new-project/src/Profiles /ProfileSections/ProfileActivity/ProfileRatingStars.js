import React from 'react'
import axios from 'axios'
import BeautyStars from 'beauty-stars'
import { headers } from '../../../lib/auth'



class ProfileRatingStars extends React.Component {
  state = {
    rating: 0 ,
    feedback: ''
  }

  handleChange = async rating => {
    this.setState({ rating }, async ()  => {
      const id = this.props.user.bio.id
      await axios.post(`/api/ratings/${id}/`, this.state , headers() )
      this.props.updateProfile()
    })
  }

  handleFeedback = (event) => {
    this.setState({ feedback: event.target.value })
  }

  render(){
    const { modal, handleModal } = this.props
    return (

      <div className='feedback-container'>
        <BeautyStars
          value={this.state.rating}
          size={'30px'}
          onChange={this.handleChange}
        />

        <div className='center' 
          onClick={() => {
            handleModal('feedback')
          }}>
          <button className='button'> 
            <p>Leave feedback...</p>
          </button>
        </div>

        <div className={modal === 'feedback' ? 
          'center' : 'display-none'}>
          <select
            value={this.state.feedback}
            onChange={this.handleFeedback} 
            id="feedback">
            <option value="Unpleasant Smell">Unpleasant Smell</option>
            <option value="Rude Interaction">Rude Interaction</option>
            <option value="Unattractive">Unattractive</option>
            <option value="Impoverished Vibes">Impoverished Vibes</option>
            <option value="Discriminatory">Discriminatory</option>
          </select>
        </div>
      </div>

    )
  }
}

export default ProfileRatingStars
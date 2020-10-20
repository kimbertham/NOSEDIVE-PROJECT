import React from 'react'
import axios from 'axios'
import BeautyStars from 'beauty-stars'
import { headers } from '../../../lib/auth'



class ProfileRatingStars extends React.Component {
  state = {
    rating: 0 ,
    feedback: '',
    modal: false
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
  render(){
    const { modal } = this.state
    return (
      <div className='feedback-container'>

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

        <div className={modal ? 
          'center' : 'display-none'}>
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
    )
  }
}

export default ProfileRatingStars
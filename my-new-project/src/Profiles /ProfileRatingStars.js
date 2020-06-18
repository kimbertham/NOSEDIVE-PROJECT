import React from 'react'
import axios from 'axios'
import BeautyStars from 'beauty-stars'
import { headers } from '../lib/auth'



class ProfileRatingStars extends React.Component {
  state = {
    rating: 0 ,
    feedback: ''
  }

  handleChange = async rating => {
    this.setState({ rating }, async ()  => {
      const id = this.props.id 
      await axios.post(`/api/ratings/${id}/`, this.state , headers() )
      this.props.data()
      
    })
  }

  render(){
    return (
      <BeautyStars
        value={this.state.rating}
        size={'30px'}
        onChange={this.handleChange}
      />
    )
  }
}

export default ProfileRatingStars
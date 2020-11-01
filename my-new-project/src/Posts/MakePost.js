import React from 'react'
import axios from 'axios'
import { headers } from '../lib/auth'
import ImageUpload from '../common/ImageUpload'

class MakePost extends React.Component {
  state = {
    form: {
      content: ''
    },
    image: false
  }

  handleChange = event => {
    const form = { ...this.state.form, [event.target.name]: event.target.value }
    this.setState({ form })
  }
  

  handleSubmit = async event => {
    event.preventDefault()
    const p = this.props.page
    try {
      if (p === 'thread-post') {
        const threadId = this.props.threadId
        await axios.post(`/api/forum/${threadId}/0/`, this.state.form, headers())
        this.props.getComments()
      } 
      if (p === 'profile-post'){
        await axios.post(`/api/post/${this.props.user.bio.id}/`, this.state.form, headers())
        this.props.updateProfile(this.props.user.bio.id)
      }
      this.setState({ form: { content: '' } })
    } catch (err) {
      console.log(err)
    }
  }

  toggleImage = () => {
    this.setState({ image: !this.state.image })
  }

  handleImage = (img) => {
    const form = { ...this.state.form, image: img }
    this.setState({ form })
  }

  render(){
    const { image } = this.state
    return (
      <div className='make-post-container  dark-border'>

        <form 
          className='post-form center'
          onSubmit={this.handleSubmit}>
          <textarea
            className='post-texarea dark-border'
            placeholder={'What\'s happening?'}
            name='content'
            onChange={this.handleChange}
            value={this.state.form.content}/>
          <div className='center'>
            <button className='post-button button'> Send!</button>
            <img src={'https://i.imgur.com/WPwXvQU.jpg'} className='camera-button'
              onClick={this.toggleImage}/>
          </div>
        </form>
        <div className={image ? 'flex-end' : 'display-none' }>
          <ImageUpload
            page={'post'}
            post={this.handleImage}
            toggleImg={this.toggleImage}/>
        </div>
  

      </div>

    )
  }
}


export default MakePost
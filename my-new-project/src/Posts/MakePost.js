import React from 'react'
import axios from 'axios'
import { headers } from '../lib/auth'

class MakePost extends React.Component {
  state = {
    form: {
      content: ''
    },
    page: ''
  }

  handleChange = event => {
    const form = { ...this.state.form, [event.target.name]: event.target.value }
    this.setState({ form })
  }
  

  componentDidMount = () => {
    this.setState({ page: this.props.page })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const { page } = this.state
    try {
      if (page === 'thread-post') {
        console.group('called')
        const threadId = this.props.threadId
        await axios.post(`/api/forum/${threadId}/0`, this.state.form, headers())
        this.props.getComments()
      } 
      if (page === 'profile-post'){
        await axios.post('/api/post/', this.state.form, headers())
        this.props.updateProfile()
      }
      this.setState({ form: { content: '' } })

    } catch (err) {
      console.log(err)
    }
  }

  render(){
    return (
      <div className='make-post-container dark-border'>
        <form 
          className='post-form center'
          onSubmit={this.handleSubmit}>
          <textarea
            className='post-texarea dark-border'
            placeholder={'What\'s happening?'}
            name='content'
            onChange={this.handleChange}
            value={this.state.form.content}
          />
          <br/>
          <button className='dark-border post-button button'> Send!</button>
        </form>
      </div>

    )
  }
}


export default MakePost
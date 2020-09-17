import React from 'react'
import axios from 'axios'
import { headers } from '../lib/auth'


class MessagePost extends React.Component {
  state = {
    form: {
      content: '',
      conversation: ''
    }
  
  }
  
  handleChange = event => {
    const form = { ...this.state.form, [event.target.name]: event.target.value }
    this.setState({ form })
  }
  
  handleClear = () => {
    const form = { ...this.state.form, content: '', conversation: '' }
    this.setState({ form })  
  }

  handleSubmit = async () => {
    try {
      const f = { ...this.state.form, conversation: this.props.convo.id } 
      const id = this.props.convo.participants.id
      await axios.post(`/api/messaging/${id}/`, f, headers())
      await this.props.getConvos()
      await this.props.setChat(0,1)
      this.handleClear()
    } catch (err) {
      console.log(err)
    }
  }

  
  render () {
    const { convo } = this.props
    return (

      <div className={convo ? 'msg-post center' : 'display-none'}>
    
        <input
          className='msg-input'
          placeholder={'Send a message...'}
          name='content'
          onChange={this.handleChange}
          value={this.state.form.content}
        />

        <button 
          onClick={this.handleSubmit}
          className='button'> Send</button>

    
      </div>
      
    )
  }
}
  


export default MessagePost
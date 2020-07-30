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
  

  handleSubmit = async () => {
    try {
      const form = { ...this.state.form, conversation: this.props.selectedChat } 
      this.setState({ form }, async () => {
        const id = this.props.selectedInfo.id
        await axios.post(`/api/messaging/${id}/`, this.state.form, headers())
        this.props.setChat(0,this.props.selectedInfo ,1)
        const form = { ...this.state.form, content: '', conversation: '' }
        this.setState({ form })  
      })
    } catch (err) {
      console.log(err)
    }
  }

  
  render () {
    const { selectedInfo } = this.props
    return (

      <div className={selectedInfo ? 'msg-post center' : 'display-none'}>
    
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
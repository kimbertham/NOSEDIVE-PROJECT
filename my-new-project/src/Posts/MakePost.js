import React from 'react'
import axios from 'axios'
import { headers } from '../lib/auth'

class MakePost extends React.Component {
  state = {
    form: {
      content: ''
    }
  }

  handleChange = event => {
    const form = { ...this.state.form, [event.target.name]: event.target.value }
    this.setState({ form })
  }
  
  handleSubmit = async event => {
    event.preventDefault()
    try {
      await axios.post('/api/post/', this.state.form, headers())
      this.setState({ form: { content: '' } }, () => {
        // this.props.data()
      })
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
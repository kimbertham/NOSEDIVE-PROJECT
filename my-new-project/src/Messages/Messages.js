import React from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'
const userId = getUserId()

class Messages extends React.Component {
  state = {
    messages: []
  }

  async componentDidMount() {
    const res = await axios.get(`/api/messaging/${userId}/`)
    this.setState({ messages: res.data })
  }

  render () {
    console.log(this.state.messages)
    return (
      <h1> Hello worlds</h1>
    )
  }
}

export default Messages
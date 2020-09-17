import React from 'react'
import { getUserId, headers } from '../lib/auth'
import axios from 'axios'
import Chat from './Chat'
import Conversations from './Conversations'
import MessagePost from './MessagePost'
import NewConvo from './NewConvo'

const userId = getUserId()

class Messages extends React.Component {
  state = {
    conversations: [],
    chat: '',
    convo: '',
    newConvo: false
  }
  
  async componentDidMount() {
    this.getConvos()
  }

  getConvos = async  () => {
    const res = await axios.get(`/api/conversations/${userId}/`)
    res.data.map(c => {
      return c.participants = c.participants.find(u => u.id !== userId)
    })
    this.setState({ conversations: res.data })
  }

  setChat = async (i, update) => {
    i =  update ? this.state.index : i
    this.setState({ 
      index: i,
      newConvo: false,
      convo: this.state.conversations[i]
    })
  }

  setRead = async (messages) => {
    
    const read =  messages.map(async m  => { 
      if (m.read === false && m.reciever.id === userId) {
        const read = { ...m, sender: m.sender.id, reciever: m.reciever.id, read: true }
        await axios.put(`/api/messaging/${m.id}/`, read , headers())
      }
    })
    Promise.all(read)
      .then(() => {
        this.getConvos()
      })
  }

  setNew = () => {
    this.setState({ 
      newConvo: !this.state.newConvo, convo: false })
  }
  
  render () {
    const { 
      conversations,
      newConvo,
      convo } = this.state

    return (
      <div className='flex'>

        <Conversations
          conv={conversations}
          userId={userId}
          setChat={this.setChat}
          setNew={this.setNew}
          setRead={this.setRead}/>

        <div className='chat-container'>

          <NewConvo 
            userId={userId}
            newConvo={newConvo}
            conversations={conversations}
            handleNew={this.handleNew}
            setChat={this.setChat}
            getConvos={this.getConvos}/>
            
          <Chat
            userId={userId}
            convo={convo}/>

          <MessagePost
            convo={convo}
            getConvos={this.getConvos}
            setChat={this.setChat}/>

        </div>
        
      </div>

    )
  }
}
  


export default Messages



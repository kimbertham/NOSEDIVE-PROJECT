import React from 'react'
import { getUserId } from '../lib/auth'
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
    selectedChat: '',
    selectedInfo: false,
    messages: [],
    newConvo: false
  }
  
  async componentDidMount() {
    this.getConvos()
  }

  getConvos = async  () => {
    const res = await axios.get(`/api/conversations/${userId}/`)
    res.data.map(conv => {
      conv.participants = conv.participants.filter(
        user => user.id !== userId
      )
    })
    this.setState({ conversations: res.data })
  }


  setChat = async (id,info, update) => {
    this.setState({ newConvo: false })
    if (update) {
      id = this.state.selectedChat
    } 
    const res = await axios.get(`/api/messaging/${id}/`)
    this.setState({ 
      messages: res.data,
      selectedChat: id,
      selectedInfo: info })
  }

  setNew = () => {
    this.setState({ 
      newConvo: !this.state.newConvo, 
      selectedInfo: false
    })
  }

  handleNew = async (id) => { 
    const conv = this.state.conversations
    const u = conv.find(c => {
      return c.participants.some(u => u.id === id)
    })
    if (u) {
      this.setChat(u.id, u.participants[0])
    } else {
      await axios.post(`/api/conversations/${id}/`,
        { userId: userId })
      this.getConvos()
      this.setNew()
    }
  }
  
  render () {
    const { 
      conversations,
      chat,
      selectedChat,
      messages,
      selectedInfo ,
      newConvo } = this.state

    return (

      <div className='flex'>

        <Conversations
          conv={conversations}
          userId={userId}
          setChat={this.setChat}
          selectedChat={selectedChat}
          setNew={this.setNew}/>

        <div className='chat-container'>

          <NewConvo 
            userId={userId}
            newConvo={newConvo}
            handleNew={this.handleNew}
            conversations={conversations}/>
            
          <Chat
            chat={chat}
            selectedInfo={selectedInfo}
            userId={userId}
            messages={messages}/>

          <MessagePost
            selectedInfo={selectedInfo}
            selectedChat={selectedChat} 
            setChat={this.setChat}/>

        </div>
        
      </div>
      
    )
  }
}
  


export default Messages
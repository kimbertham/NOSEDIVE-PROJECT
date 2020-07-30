import React from 'react'

const Chat = ({ selectedInfo, messages, userId } ) => {


  return (
    <>
  
      <div className={selectedInfo ? ' chat-name flex' : 'display-none'}>
        <img src={selectedInfo.profile_image} 
          alt='info-img' className='small-icon'/>
        <h1>{selectedInfo.first_name} {selectedInfo.last_name} </h1>
      </div>

      <div className='chat-messages scroll'>
        {messages ? messages.reverse().map(message => {
          if (message.sender.id === userId) {
            return <div key={message.id} className=' message-user'> 
              <p className='message-pop bordered-box'>{message.content} </p>
              <img src={message.sender.profile_image} className='msg-icon small-icon' />
            </div>
          } else {
            return <div key={message.id} className=' message-sender'> 
              <img src={message.sender.profile_image} className='msg-icon small-icon' />
              <p className='message-pop bordered-box'>{message.content} </p>
            </div> 
          }
        }) : null }
      </div>
    </>
  )
}


export default Chat
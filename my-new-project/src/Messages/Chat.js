import React from 'react'

const Chat = ({ userId, convo } ) => {
  if (!convo) return ''

  return (
    <>
  
      <div className={convo ? ' chat-name flex' : 'display-none'}>
        <img src={convo.participants.profile_image} 
          alt='info-img' className='small-icon'/>
        <h1>{convo.participants.first_name} {convo.participants.last_name} </h1>
      </div>

      <div className='chat-messages scroll'>
        {convo.messages ? convo.messages.map(message => {
          if (message.sender.id === userId) {
            return <div key={message.id} className='message-user'> 
              <p className='message-pop bordered-box'>{message.content} </p>
              <img src={message.sender.profile_image} className='msg-icon small-icon' alt='pp-img' />
            </div>
          } else {
            return <div key={message.id} className=' message-sender'> 
              <img src={message.sender.profile_image} className='msg-icon small-icon' alt='pp-img'/>
              <p className='message-pop bordered-box'>{message.content} </p>
            </div> 
          }
        }) : null }
      </div>
    </>
  )
}


export default Chat
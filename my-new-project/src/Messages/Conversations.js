import React from 'react'



const Conversations = ({ conv, setChat, selectedChat,setNew, setRead, userId }) => {

  const unread  = (messages) => {
    const u = messages.filter(m => 
      m.read === false && m.reciever.id === userId).length 
    return u === 0 ? null : u
  }

  if (!conv) return null
  return (

    <div className='conv-container' >

      <button onClick={setNew} 
        className='button right'>
        + New Chat
      </button>

      <h1 className='conv-header'> Conversations</h1>

      {conv.map((convo,index) => {
        return (
          <div key={convo.id}
            className={`flex conv-field
              ${convo.id === selectedChat ? 'selected-chat' : ''}` }
            onClick={()=> {
              setRead(convo.messages)
              setChat(index)
            } }>

            <img src={convo.participants.profile_image} 
              alt='profile-img' className='small-icon' />
            <div className='full-width flex-between'>
              <p>{convo.participants.first_name} {convo.participants.last_name}</p>
              {unread(convo.messages) ? 
                <div className='center read-notif'>{unread(convo.messages)}</div> 
                : null}
            </div>
          </div>

        )
      })}
    </div>
  )
}


export default Conversations
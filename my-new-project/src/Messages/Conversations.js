import React from 'react'



const Conversations = ({ conv, setChat, selectedChat,setNew }) => {

  const unread  = (messages) => {
    const u = messages.filter(m => m.read === false).length 
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
            onClick={()=> setChat(index)}>

            <img src={convo.participants.profile_image} 
              alt='profile-img' className='small-icon' />
            <div className='space-between'>
              <p>{convo.participants.first_name} {convo.participants.last_name}</p>
              <p>{unread(convo.messages)} </p>
            </div>
          </div>

        )
      })}
    </div>
  )
}


export default Conversations
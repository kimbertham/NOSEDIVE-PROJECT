import React from 'react'



const Conversations = ({ conv, setChat, selectedChat,setNew }) => {
  
  if (!conv) return null
  return (


    <div className='conv-container' >

      <button onClick={setNew} 
        className='button right'>
        + New Chat
      </button>

      <h1 className='conv-header'> Conversations</h1>


      {conv.map(convo => {
        const convoId = convo.id
        return convo.participants.map(user => {
          return (
            <div key={convoId}
              className={`flex conv-field
              ${convoId === selectedChat ? 'selected-chat' : ''}` }
              onClick={()=> setChat(convoId, user)}>

              <img src={user.profile_image} 
                alt='profile-img' className='small-icon' />

              <p>{user.first_name} {user.last_name}</p>
            </div>

          )
        })
      })}
    </div>
  )
}


export default Conversations
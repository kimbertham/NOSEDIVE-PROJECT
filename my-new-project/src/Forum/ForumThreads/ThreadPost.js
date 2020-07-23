import React from 'react'

const ThreadPost = ({ modal, thread, owner }) =>  {

  const modalClass = !modal ?  'display-none' : 'display:block'
  return (
    <>

      <div className={`modal blurred center ${modalClass}`}>
        <div className='modal-pop'>
          <p> {`This thread is private, 
          You need to be a ${thread.limitations} star to enter`}
          </p>
        </div>
      </div>

      <div className='bordered-box thread-post flex'>

        <div>
          <img 
            src={thread.image} 
            className='thread-img dark-border'
            alt='thread-img'/>
          <div className='flex'>
            <img
              src={owner.profile_image} 
              alt='owner-img'
              className='small-icon'/>
            <div>
              <p>{owner.first_name} {owner.last_name}</p>
              <p>{thread.created_at}</p>
            </div>
          </div>
        </div>

        <div className='full-width'>
          <p className='thread-limits right'>
            {thread.limitations ?
              `NO ${thread.limitations} STARS ALLOWED` : 'PUBLIC'} </p>
          <h1>{thread.title}</h1>
          <p>{thread.description}</p>
          <p className='bordered-box thread-content'>
            {thread.content}</p>
        </div>

      </div>

    </>
  )
}
export default ThreadPost
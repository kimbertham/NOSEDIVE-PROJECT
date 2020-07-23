import React from 'react'


const ProfileWish = ({ handleChange, handleSubmit,search,user, currentUserId }) => {

  return (
    <>

      {currentUserId === user.bio.id ? 
    
        <form 
          className='post-form bordered-box dark-border center'
          onSubmit={handleSubmit}>

          <textarea
            className='post-texarea dark-border'
            placeholder={'What\'s happening?'}
            name='search'
            onChange={handleChange}
            value={search}/>

          <br/>

          <button className='dark-border post-button button'>Send!</button>
        </form>

        : ''}

    </>
  )
}

export default ProfileWish
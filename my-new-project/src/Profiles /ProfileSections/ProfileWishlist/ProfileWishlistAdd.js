import React from 'react'


class ProfileWish extends React.Component {

  render() {
    const { handleChange,handleSubmit,search,user, currentUserId } = this.props
    return (
      <>

        {currentUserId === user.bio.id ? 
    
          <form 
            className='post-form bordered-box dark-border center'
            onSubmit={handleSubmit}
          >
            <textarea
              className='post-texarea dark-border'
              placeholder={'What\'s happening?'}
              name='search'
              onChange={handleChange}
              value={search}
            />
            <br/>
            <button className='dark-border post-button button'> Send!</button>
          </form>
          : ''}

      </>
    )
  }
}

export default ProfileWish
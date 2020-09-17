import React from 'react'
import axios from 'axios'


class NewConvo extends React.Component {
  state = {
    input: '',
    users: [],
    searchUsers: []
  }

  async componentDidMount () {
    const userId = this.props.userId
    const res = await axios.get(`/api/profile/${userId}/all/`)
    this.setState({ users: res.data })
  }

  handleChange = async event => {
    const value = event.target.value
    if (value !== '') {
      const usersFiltered = this.state.users.filter(user => {
        const regex = new RegExp(value, 'i')
        return user.first_name.match(regex) || user.last_name.match(regex)
      })
      this.setState({ searchUsers: usersFiltered, input: value  })
    } else {
      this.setState({ searchUsers: [] , input: value })
    }
  }
  
  handleNew = async (id) => { 
    const conv = this.props.conversations
    const i = conv.findIndex(c => {
      return c.participants.id === id
    })
    if (i >= 0) {
      this.props.setChat(i)
    } else {
      await axios.post(`/api/conversations/${id}/`,
        { userId: this.props.userId })
      await this.props.getConvos()
      const i = conv.length 
      this.props.setChat(i)
    }
  }

  render () {
    const { input,searchUsers } = this.state
    const { newConvo } = this.props

    return (
  
      <div className={newConvo ? ' newConvo-container ' : 'display-none'}>

        <div className='flex center'>
          <h1> New Chat</h1>
          <img className='search-btn small-icon'
            src='https://i.imgur.com/NFkcPiE.jpg' alt='pp-img'/>
        </div>
        
        <div className='bordered-box'>
          <input 
            className='msg-search'
            value={input} 
            placeholder='Search for a user...' 
            onChange={this.handleChange} />

    

          <div className='results-container'>
            {searchUsers.map(user => {
              return (
                <div 
                  key={user.id}
                  className=' search-user pointer flex'
                  onClick={() => {
                    this.handleNew(user.id)
                  }}>
                  <img src={user.profile_image}
                    className='small-icon' alt='pp-img'/>
                  <p> {user.first_name} {user.last_name}</p>
                </div>
              )
            })}
          </div>
        </div>
 

      </div>
      

    
    )
  }
}
  


export default NewConvo
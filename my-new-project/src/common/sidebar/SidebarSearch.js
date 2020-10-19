import React from 'react'
import axios from 'axios'
import { getUserId } from '../../lib/auth'

const user = getUserId()

class SidebarSearch extends React.Component {
  state = {
    query: '',
    users: [],
    searchUsers: []
  }


  async componentDidMount() {
    const res = await axios.get(`/api/profile/${user}/all/`)
    this.setState({ users: res.data })
  }

  handleChange = async event => {
    const value = event.target.value
    if (value !== '') {
      const usersFiltered = this.state.users.filter(user => {
        const regex = new RegExp(value, 'i')
        return user.first_name.match(regex) || user.last_name.match(regex)
      })
      this.setState({ searchUsers: usersFiltered, query: value  })
    } else {
      this.setState({ searchUsers: [] , query: value })
    }
  }
  

  render() {
    const { query, searchUsers } = this.state
    
    return (
      <div className='search-bar flex'>

        <form className='flex center'>
          <input
            className='search-input dark-border'
            onChange={this.handleChange}
            value={query}
          />
    
          <button className='button'> Search</button>
        </form>

        <div className='results-container side-results'>
          {searchUsers.map(user => {
            return (
              <div 
                key={user.id}
                className='side-user dark-border pointer flex'
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
    )
  }
}
export default SidebarSearch
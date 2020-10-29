import React from 'react'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'



class SidebarSearch extends React.Component {
  state = {
    query: '',
    users: [],
    searchUsers: []
  }

  async componentDidMount() {
    const res = await axios.get(`/api/profile/${this.props.currentUserId}/all/`)
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

  changeProfile = (id) => {
    this.props.getData(id)
    this.setState({ query: '' , searchUsers: [] })
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
              <Link 
                key={user.id}
                to={`/profile/${user.id}/activity`}>
                <div 
                  className='side-user dark-border pointer flex'
                  onClick={()=>{
                    this.changeProfile(user.id)  
                  }}>
                  <img src={user.profile_image}
                    className='small-icon' alt='pp-img'/>
                  <p> {user.first_name} {user.last_name}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }
}
export default withRouter(SidebarSearch)
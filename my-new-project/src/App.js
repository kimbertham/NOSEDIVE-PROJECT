import React from 'react'
import axios from 'axios'
import { BrowserRouter , Switch, Route } from 'react-router-dom'
import { getUserId } from './lib/auth'

import ProfilePage from './Profiles /ProfilePage'
import ProfileBioEdit from './Profiles /ProfileSections/ProfileBio/ProfileBioEdit'
import Sidebar from './common/sidebar/Sidebar'
import Login  from './Auth/Login'
import Register from './Auth/Register'
import Stats from './Stats/Stats'
import Forum from './Forum/Forum'
import Newsfeed from './Newsfeed/Newsfeed'

import { getToken } from './lib/auth'
import ForumThreads from './Forum/ForumThreads/ForumThreads'
import Messages from './Messages/Messages'


const token = getToken()
const currentUserId = getUserId()


class App extends React.Component {
  state = {
    user: {},
    forum: {},
    followed: []
  }

  getData = async ( profile, action ) => {
    const user = await axios.get(`/api/profile/${profile}/${action ? action : 'user'}/`)
    const change = { ...this.state.user, [action]: user.data[action] } 
    action ? this.setState({ user: change }) : this.setState({ user: user.data })
    console.log('called')
  }

  getDataForum = async () => {
    const res = await axios.get('/api/forum/')
    const followed = res.data.filter(t => 
      t.followers.includes(currentUserId))
    this.setState({ forum: res.data, followed })

  }

  render(){
    const { user, forum, followed } = this.state 

    return (
      <>
        <BrowserRouter>
      
          {token ?   
            <Route render={() => 
              <Sidebar 
                user= {user} 
                currentUserId={currentUserId} 
                getData={this.getData}
                changeProfile={this.changeProfile} /> }/> 
            : ''}

          <Switch>

            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/messages' component={Messages}/>

            <div className='left-section'>

              <Route path='/profile/:id/' render={() => 
                <ProfilePage 
                  user={user}
                  currentUserId={currentUserId} 
                  getData={this.getData} /> }/>

              <Route path='/edit' render={() => 
                <ProfileBioEdit currentUserId={currentUserId}/> }/>

              <Route path='/home/:id' render={() => 
                <Newsfeed currentUserId={currentUserId} /> }/>

              <Route path='/stats/:id' component={Stats}/>

              <Route path='/community' render={() => 
                <Forum 
                  currentUserId={currentUserId}
                  getData={this.getDataForum}
                  forum={forum}
                  followed={followed}/> }/>
              <Route path='/forum/:id' render={() => 
                <ForumThreads 
                  currentUserId={currentUserId}
                  getData={this.getDataForum}/> }/>

            </div>

          </Switch>
        </BrowserRouter>

      </>
    )
  }
}

export default App

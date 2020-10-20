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
const cUserId = getUserId()


class App extends React.Component {
  state = {
    user: {}
  }

  getData = async (profile, action) => {
    const user = await axios.get(`/api/profile/${profile}/${action ? action : 'full'}/`)
    const change = { ...this.state.user, [action]: user.data[action] } 
    this.setState({ user: action ? change :  user.data })
  }

  render(){
    const { user, modal } = this.state 
    return (
      <>
        <BrowserRouter>
      
          {token ?   <Route render={() => 
            <Sidebar user= {user} cUserId={cUserId} getData={this.getData} /> }/> : ''}

          <Switch>

            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/messages' component={Messages}/>

            <div className='left-section'>

              <Route path='/profile/:id/' render={() => 
                <ProfilePage user= {user} cUserId={cUserId} modal={modal} handleModal={this.handleModal} getData={this.getData} /> }/>
                
              <Route path='/edit' component={ProfileBioEdit}/>
              <Route path='/home/:id' component={Newsfeed}/>
              <Route path='/stats/:id' component={Stats}/>

              <Route path='/community' component={Forum} /> 
              <Route path='/forum/:id' component={ForumThreads} /> 
            </div>

          </Switch>
        </BrowserRouter>

      </>
    )
  }
}

export default App

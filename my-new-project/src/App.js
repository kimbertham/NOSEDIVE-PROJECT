import React from 'react'
import { BrowserRouter , Switch, Route } from 'react-router-dom'

import ProfilePage from './Profiles /ProfilePage'
import ProfileBioEdit from './Profiles /ProfileSections/ProfileBio/ProfileBioEdit'
import Sidebar from './common/sidebar/Sidebar'
import  Login  from './Auth/Login'
import Register from './Auth/Register'
import Stats from './Stats/Stats'
import Forum from './Forum/Forum'
import Newsfeed from './Newsfeed/Newsfeed'
import Messages from './Messages/Messages'

import { getToken } from './lib/auth'
import ForumThreads from './Forum/ForumThreads/ForumThreads'


const token = getToken()


const App = () => {

  
  return (
    <>
      <BrowserRouter>
      
        {token ?  <Route component={Sidebar}/> : ''}

        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />

          <div className='left-section'>
            <Route exact path='/profile/:id/edit' component={ProfileBioEdit}/>
            <Route path='/messages' component={Messages}/>
            <Route path='/home/:id' component={Newsfeed}/>
            <Route path='/stats/:id' component={Stats}/>
            <Route path='/profile/:id' component={ProfilePage}/>
            <Route path='/community' component={Forum} /> 
            <Route path='/forum/:id' component={ForumThreads} /> 
          </div>

        </Switch>
      </BrowserRouter>

    </>
  )
}

export default App

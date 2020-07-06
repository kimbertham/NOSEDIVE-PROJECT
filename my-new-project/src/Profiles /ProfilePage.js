import React from 'react'
import axios from 'axios'
import { Switch, Route } from 'react-router-dom'
import { getUserId } from '../lib/auth'
import ProfileInfo from './ProfileInfo'
import ProfileNavbar from './ProfileNavbar'
import ProfileBio from './ProfileSections/ProfileBio/ProfileBio'
import ProfileActivity from './ProfileSections/ProfileActivity/ProfileActivity'
import ProfilePhotos from './ProfileSections/ProfilePhotos'
import ProfileFollowers from './ProfileSections/ProfileFollowing/ProfileFollowers'
import ProfileWishlist from './ProfileSections/ProfileWishlist/ProfileWishlist'


class ProfilePage extends React.Component {
state = {
  user: {},
  rating: '',
  wishlist: [],
  modal: false
}

async componentDidMount() {
  this.getData()
}
getData = async (id) => {
  if (id) {
    const user = await axios.get(`/api/profile/${id}/full/`)
    this.setState({ user: user.data })
    this.props.history.push(`/profile/${id}/activity`)
  } else {
    const id = this.props.match.params.id
    const user = await axios.get(`/api/profile/${id}/full/`)
    this.setState({ user: user.data })
  }
}

handleModal=(section) => {
  this.state.modal ?   
    this.setState({ modal: false }) : 
    this.setState({ modal: section })
}

render(){

  const { user, modal } = this.state
  const userProfile = this.props.match.params.id
  const currentUserId = getUserId()


  if (!this.state.user.photos) return ''
  return (
    <>
      <div className='sticky profile-head'>
        <ProfileInfo 
          user={user} 
          updateProfile={this.getData} 
          modal={modal}
          handleModal={this.handleModal}/>

        <ProfileNavbar 
          userProfile={userProfile}/>
      </div>

      <div className='profile-section full-width'>
        <Switch>

          <Route path='/profile/:id/bio' render={() => 
            <ProfileBio 
              user= {user} />
          }/>

          <Route path='/profile/:id/activity'render={() => 
            <ProfileActivity 
              user={user}
              userProfile={userProfile}
              currentUserId={currentUserId}
              updateProfile={this.getData} />
          }/>

          <Route path='/profile/:id/photos' render={() => 
            <ProfilePhotos
              user={user}
              currentUserId={currentUserId}
              updateProfile={this.getData} />
          }/>


          <Route path='/profile/:id/fans' render={() => 
            <ProfileFollowers
              user={user}
              getData={this.getData}/>
          }/>

          <Route path='/profile/:id/wishlist' render={() => 
            <ProfileWishlist
              user={user}
              currentUserId={currentUserId}
              updateProfile={this.getData} />
          }/>

        </Switch>
      </div>
    </>
  )
}
}

export default ProfilePage
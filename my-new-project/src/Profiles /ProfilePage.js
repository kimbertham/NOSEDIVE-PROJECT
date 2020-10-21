import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import ProfileInfo from './ProfileInfo'
import ProfileNavbar from './ProfileNavbar'
import ProfileBio from './ProfileSections/ProfileBio/ProfileBio'
import ProfileActivity from './ProfileSections/ProfileActivity/ProfileActivity'
import ProfilePhotos from './ProfileSections/ProfilePhotos'
import ProfileFollowers from './ProfileSections/ProfileFollowing/ProfileFollowers'
import ProfileWishlist from './ProfileSections/ProfileWishlist/ProfileWishlist'


class ProfilePage extends React.Component {


  async componentDidMount () {
    await this.props.getData(this.props.match.params.id)
  }

  render(){

    const { user, getData,currentUserId  } = this.props
    if (!user.bio) return null 
    return (
      <>
        <div className='sticky profile-head'>
          <ProfileInfo 
            user={user} 
            updateProfile={getData} />

          <ProfileNavbar 
            user={user}/>
        </div>

        <div className='profile-section full-width'>
          <Switch>
            <Route path='/profile/:id/bio' render={() => 
              <ProfileBio 
                user= {user} /> }/>

            <Route path='/profile/:id/activity'render={() => 
              <ProfileActivity 
                user={user}
                currentUserId={currentUserId}
                updateProfile={getData} /> }/>

            <Route path='/profile/:id/photos' render={() => 
              <ProfilePhotos
                user={user}
                currentUserId={currentUserId}
                updateProfile={getData} /> }/>

            <Route path='/profile/:id/fans' render={() => 
              <ProfileFollowers
                user={user}
                getData={getData}/> }/>

            <Route path='/profile/:id/wishlist' render={() => 
              <ProfileWishlist
                user={user}
                currentUserId={currentUserId}
                updateProfile={getData} /> }/>
          </Switch>
        </div>
      </>
    )
  }
}

export default withRouter(ProfilePage)
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
    const currentUserId = this.props.cUserId
    const userProfile = this.props.match.params.id
    const { user, modal, getData } = this.props
    console.log(user)
    if (!user.ratings) return null 
    return (
      <>
        <div className='sticky profile-head'>
          <ProfileInfo 
            user={user} 
            userProfile={userProfile}
            updateProfile={getData} 
            modal={modal}
            handleModal={this.handleModal}/>

          <ProfileNavbar 
            userProfile={userProfile}/>
        </div>

        <div className='profile-section full-width'>
          <Switch>
            <Route path='/profile/:id/bio' render={() => 
              <ProfileBio 
                user= {user} /> }/>

            <Route path='/profile/:id/activity'render={() => 
              <ProfileActivity 
                user={user}
                userProfile={userProfile}
                currentUserId={currentUserId}
                updateProfile={getData} /> }/>

            <Route path='/profile/:id/photos' render={() => 
              <ProfilePhotos
                user={user}
                currentUserId={currentUserId}
                userProfile={userProfile}
                updateProfile={getData} /> }/>

            <Route path='/profile/:id/fans' render={() => 
              <ProfileFollowers
                user={user}
                getData={getData}/> }/>

            <Route path='/profile/:id/wishlist' render={() => 
              <ProfileWishlist
                user={user}
                userProfile={userProfile}
                currentUserId={currentUserId}
                updateProfile={getData} /> }/>
          </Switch>
        </div>
      </>
    )
  }
}

export default withRouter(ProfilePage)
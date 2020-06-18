import React from 'react'
import axios from 'axios'
import { Switch, Route } from 'react-router-dom'
import ProfileInfo from './ProfileInfo'
import ProfileNavbar from './ProfileNavbar'
import ProfileBio from './ProfileSections/ProfileBio'
import ProfileActivity from './ProfileSections/ProfileActivity'
import ProfileInteractions from './ProfileInteractions'
import ProfilePhotos from './ProfileSections/ProfilePhotos'
import ProfileFollowers from './ProfileSections/ProfileFollowers'
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
      const user = await axios.get(`/api/profile/${id}`)
      this.setState({ user: user.data })
      this.props.history.push(`/profile/${id}/activity`)
    } else {
      const id = this.props.match.params.id
      const user = await axios.get(`/api/profile/${id}`)
      this.setState({ user: user.data })
    }
  }


  handleModal=() => {
    this.setState({ modal: !this.state.modal })
  }


  render(){
    const { 
      bio, 
      followers, 
      photos, 
      posts, 
      ratings, 
      wishlist, 
      avg } = this.state.user

    const id = this.props.match.params.id

    return (

      <>
        <div className='sticky profile-head'>
          <ProfileInfo 
            user={bio} 
            data={this.getData} 
            rating={avg}
            modal={this.state.modal}
            handleModal={this.handleModal}/>

          <ProfileNavbar 
            id={id}/>
        </div>

        <div className='cont-int flex'>
          <div className='profile-section full-width'>

            <Switch>

              <Route 
                path='/profile/:id/bio' 
                render={() => 
                  <ProfileBio 
                    user= {bio} 
                    isAuthed={true}/>}/>

              <Route 
                path='/profile/:id/activity'              
                render={() => 
                  <ProfileActivity 
                    posts={posts} 
                    updateProfile={this.getData} 
                    isAuthed={true}/>}/>
                    
              <Route path='/profile/:id/photos'
                render={() => 
                  <ProfilePhotos
                    images={photos} 
                    updateProfile={this.getData} 
                    isAuthed={true}/>}/>


              <Route path='/profile/:id/fans'
                render={() => 
                  <ProfileFollowers
                    followers={followers}
                    getData={this.getData}
                    isAuthed={true}/>}/>


              <Route path='/profile/:id/wishlist'
                render={() => 
                  <ProfileWishlist
                    wishlist={wishlist}
                    user={bio}
                    rating={ratings}
                    updateProfile={this.getData} 
                    isAuthed={true}/>}/>

            </Switch>
          </div>

          <ProfileInteractions
            userId={id}/>
          
        </div>
      </>
    )
  }
}

export default ProfilePage
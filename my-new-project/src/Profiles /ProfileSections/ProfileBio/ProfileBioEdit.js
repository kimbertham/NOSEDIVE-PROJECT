import React from 'react'
import axios from 'axios'
import { headers } from '../../../lib/auth'
import ImageUpload from '../../../common/ImageUpload'
import { withRouter } from 'react-router-dom'


class ProfileBioEdit extends React.Component {
    state = {
      profile: {
        profile_image: ''
      },
      image: ''
    }

    async componentDidMount() {
      this.getData()
    }
  
    getData = async () => { 
      const res = await axios.get(`/api/profile/${this.props.currentUserId}/bio/`)
      console.log(res)
      this.setState({ profile: res.data.bio })
    }

    handleChange = event => {
      try {
        const profile = { ...this.state.profile, [event.target.name]: event.target.value }
        this.setState({ profile })
      } catch (err) {
        console.log(err)
      }
    }

    handleSubmit = async event => {
      event.preventDefault()
      try {
        await axios.put(`/api/profile/${this.props.currentUserId}/edit/`, 
          this.state.profile , headers())
        this.props.history.push(`/profile/${this.props.currentUserId}/bio`)
      } catch (err) {
        console.log(err)
      }
    }

    handleImage = (img) => {
      const profile = { ...this.state.profile, profile_image: img }
      this.setState({ profile })
    }
  
  
    render(){

      const { profile } = this.state
      console.log(this.state)
      if (!profile) return null
      return (

        <>
          
          <div className='auth-form'>     
            <h1>Edit Profile</h1>
          </div>

          <div className='auth-form edit-cont pop-up'>
            <div className='center'>

              <div 
                style={{  
                  backgroundImage: `url(${profile.profile_image})`
                }} className=' profile-image edit-img'/>

            </div>

            <form onSubmit= {this.handleSubmit}>

              <div className='form-field'>            
                <label className='label'>First Name</label>
                <br/>
                <input
                  className='form-input'
                  id='edit-input'
                  name="first_name"
                  value={profile.first_name}
                  onChange={this.handleChange}
                />
              </div>
              
              <div className='form-field'>            
                <label className='label'>Second Name</label>
                <br/>
                <input
                  className='form-input'
                  id='edit-input'
                  name="last_name"
                  value={profile.last_name}
                  onChange={this.handleChange}
                />
              </div>

              <div className='form-field'>            
                <label className='label'>Profile Image</label>
                <br/>
                <ImageUpload
                  page='edit'
                  image={this.handleImage}/>
              </div>

              <div className='form-field'>            
                <label className='label'>Tagline</label>
                <br/>
                <input
                  className='form-input'
                  id='edit-input'
                  name="tagline"
                  value={profile.tagline}
                  onChange={this.handleChange}
                />
              </div>

              <div className='form-field'>            
                <label className='label'>Description</label>
                <br/>
                <textarea
                  className='form-input long-textarea '
                  id='edit-input'
                  name="description"
                  value={profile.description}
                  onChange={this.handleChange}
                />
              </div>

              <div className='form-field'>            
                <label className='label'>Career</label>
                <br/>
                <input
                  className='form-input'
                  id='edit-input'
                  name="career"
                  value={profile.career}
                  onChange={this.handleChange}
                />
              </div>

              <div className='form-field'>            
                <label className='label'>Location</label>
                <br/>
                <input
                  className='form-input'
                  id='edit-input'
                  name="location"
                  value={profile.location}
                  onChange={this.handleChange}
                />
              </div>

              <div className='form-field'>   
                <label className='label'>Relationship : </label>
                <select 
                  defaultValue={profile.relationship} 
                  onChange={this.handleChange}
                  name='Relationship'>
                  <option value="" disabled></option>
                  <option value="Single">Single</option>
                  <option value="Relationship">In a Relationship</option>
                  <option value="Complicated">Complicated</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Engaged">Engaged</option>
                </select>
              </div>

              <div className='form-field'>            
                <label className='label'>Age</label>
                <br/>
                <input
                  className='form-input'
                  id='edit-input'
                  name="age"
                  value={profile.age}
                  onChange={this.handleChange}
                />
              </div>

              <button className='form-button button'> Save! </button>
            </form>
          </div>
          
        </>
      )
    }
}
  

export default withRouter(ProfileBioEdit)
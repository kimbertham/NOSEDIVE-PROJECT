import React from 'react'
import axios from 'axios'
import { headers } from '../../../lib/auth'
import { getUserId } from '../../../lib/auth'

const userid = getUserId()

class ProfileBioEdit extends React.Component {
    state = {
      formData: {
      }
    }

    async componentDidMount() {
      const res = await axios.get(`/api/profile/${userid}/simple/`)
      this.setState({ formData: res.data })
    }
  
    handleChange = event => {
      try {
        const formData = { ...this.state.formData, [event.target.name]: event.target.value }
        this.setState({ formData })
      } catch (err) {
        console.log(err)
      }
    }

    handleSubmit = async event => {
      event.preventDefault()
      try {
        const formData = await axios.put(`/api/profile/${userid}/edit/`, { ...this.state.formData }, headers())
        this.setState({ formData })
        this.props.history.push(`/profile/${userid}/bio`)
      } catch (err) {
        console.log(err.response.data)
      }
    }
  
  
    render(){
  
      const { formData } = this.state
      return (

        <>
          
          <div className='auth-form'>     
            <h1>Edit Profile</h1>
          </div>

          <div className='auth-form edit-cont pop-up'>
            <div className='center'>
              <img src={formData.profile_image} 
                className='edit-img' alt='profile-img'/>
            </div>

            <form onSubmit= {this.handleSubmit}>
              <div className='form-field'>            
                <label className='label'>First Name</label>
                <br/>
                <input
                  className='form-input'
                  id='edit-input'
                  placeholder="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={this.handleChange}
                />
              </div>
              
              <div className='form-field'>            
                <label className='label'>Second Name</label>
                <br/>
                <input
                  className='form-input'
                  id='edit-input'
                  placeholder="Second Name"
                  name="second_name"
                  value={formData.last_name}
                  onChange={this.handleChange}
                />
              </div>

              <div className='form-field'>            
                <label className='label'>Tagline</label>
                <br/>
                <input
                  className='form-input'
                  id='edit-input'
                  placeholder="Tagline"
                  name="tagline"
                  value={formData.tagline}
                  onChange={this.handleChange}
                />
              </div>

              <div className='form-field'>            
                <label className='label'>Second Name</label>
                <br/>
                <input
                  className='form-input'
                  id='edit-input'
                  placeholder="Second Name"
                  name="second_name"
                  value={formData.last_name}
                  onChange={this.handleChange}
                />
              </div>
  
              <div className='form-field'>            
                <label className='label'>Description</label>
                <br/>
                <textarea
                  className='form-input long-textarea '
                  id='edit-input'
                  placeholder="Description"
                  name="description"
                  value={formData.description}
                  onChange={this.handleChange}
                />
              </div>

              <div className='form-field'>            
                <label className='label'>Career</label>
                <br/>
                <input
                  className='form-input'
                  id='edit-input'
                  placeholder="Career"
                  name="career"
                  value={formData.career}
                  onChange={this.handleChange}
                />
              </div>

              <div className='form-field'>            
                <label className='label'>Location</label>
                <br/>
                <input
                  className='form-input'
                  id='edit-input'
                  placeholder="Location"
                  name="location"
                  value={formData.location}
                  onChange={this.handleChange}
                />
              </div>

              <div className='form-field'>   
                <label className='label'>Relationship : </label>
                <select 
                  defaultValue={formData.relationship} 
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
                  placeholder="Age"
                  name="age"
                  value={formData.age}
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
  

export default ProfileBioEdit
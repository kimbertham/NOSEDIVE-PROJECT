import React from 'react'
import axios from 'axios'
import { headers } from '../lib/auth'
import ImageUpload from '../common/ImageUpload'


class Register extends React.Component{
  state = {
    formData: {}
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
      await axios.post('/api/forum/', { ...this.state.formData }, headers())
      this.props.handleModal()
      this.props.updateForum()
    } catch (err) {
      console.log(err.response.data)
    }
  }

  handleImage = (img, e) => {
    const formData = { ...this.state.formData, [e]: img  }
    this.setState({ formData })
  }

  render(){

    return (
      <>
        <div className='auth-form center pop-up'>
          <form onSubmit= {this.handleSubmit}>
            <h1>New Thread</h1>
            <div className='form-field'>            
              <label className='label'>Title</label>
              <br/>
              <input
                className='form-input'
                placeholder="Title"
                name="title"
                onChange={this.handleChange}
              />
            </div>

            <div className='form-field'>            
              <label className='label'>Description</label>
              <br/>
              <input
                className='form-input'
                placeholder="Description"
                name="description"
                onChange={this.handleChange}
              />
            </div>

            <div className='form-field'>
              <label className='label'>Image (Optional)</label>
              <ImageUpload
                image={this.handleImage}
                page='forum'
                field='image'/>
            </div>

            <div className='form-field'>            
              <label className='label'>Limit Acces (Optional)</label>
              <br/>
              <select id="feedback"
                className='form-input'
                placeholder="Limit Acces"
                name="limitations"
                onChange={this.handleChange}>
                <option value=''></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div className='form-field'>            
              <label className='label'>Post</label>
              <br/>
              <textarea
                className='form-input'
                placeholder="make the first post here!"
                name="content"
                onChange={this.handleChange}
              />
            </div>

            <div className='form-field'>
              <label className='label'>Image (Optional)</label>
              <ImageUpload
                image={this.handleImage}
                page='forum'
                field='post_image'/>
            </div>

            <button className='form-button button'> Create New Thread</button>

          </form>
        </div>
      </>
    )
  }
}

export default Register



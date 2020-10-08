import React from 'react'
import axios from 'axios'
import { headers } from '../lib/auth'
import Loader from '../common/Loader'

const uploadUrl = 'https://api.cloudinary.com/v1_1/diyxyp4qk/image/upload'
const uploadPreset = 'eceecv3s'


class ImageUpload extends React.Component {
  state = {
    formData: {
      image: ''
    },
    loading: false
  }

  toggleLoad = () => { 
    this.setState({ loading: !this.state.loading })
  }

  handleUpload = async event => {
    this.toggleLoad()
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const photoRes = await axios.post(uploadUrl, data)
    this.setState({ formData: { image: photoRes.data.url } },
      async () => {
        
        await axios.post('/api/photos/', this.state.formData, headers())
        this.props.updateProfile()
        this.toggleLoad()
        // if ( this.props.page === 'edit') {
        //   await axios.patch('/')
        // }
      }
    )
  }

  

  render() {
    const { loading } = this.state
    return (
  
      <div className='flex' > 

        <input
          name='image'
          className="img-up bordered-box dark-border"
          type="file"
          onChange={this.handleUpload}
        />

        {loading ? <Loader /> : null}

      </div>

    )
  }
}
export default ImageUpload
import React from 'react'
import axios from 'axios'
import { headers } from '../lib/auth'

const uploadUrl = 'https://api.cloudinary.com/v1_1/diyxyp4qk/image/upload'
const uploadPreset = 'eceecv3s'


class ImageUpload extends React.Component {
  state = {
    formData: {
      image: ''
    }
  }

  handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const photoRes = await axios.post(uploadUrl, data)
    this.setState({ formData: { image: photoRes.data.url } },
      async () => {
        const res = await axios.post('/api/photos/', this.state.formData, headers())
        console.log(res.data)
      }
    )
  }

  

  render() {
    return (

      <input
        name='image'
        className="input bordered-box dark-border"
        type="file"
        onChange={this.handleUpload}
      />

    )
  }
}
export default ImageUpload
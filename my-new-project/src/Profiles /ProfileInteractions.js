import React from 'react'
import axios from 'axios'
import { defaultImage } from '../lib/commonFiles'
import { getUserId } from '../lib/auth'

class ProfileInteractions extends React.Component {
state = {
  interactions: []
}

async componentDidMount() {
  const userId = getUserId()
  const res = await axios.get(`/api/postratings/${userId}`)
  const interactions = res.data.splice(0).reverse()
  this.setState({ interactions })
}

render(){
  const { interactions } = this.state
  return (

    <section className='profile-interactions dark-border italic sticky'>

      <h1> Interactions</h1>
      
      {interactions.map(interaction => {

        return (

          <div key={interaction.id}
            className='posts-interactions dark-border flex'>

            <img 
              src={interaction.rating_owner.profile_image ?
                interaction.rating_owner.profile_image : defaultImage}
              className='small-icon '
              alt='profile-pic'/>

            <p>{`${interaction.rating_owner.first_name} 
              ${interaction.rating_owner.last_name} 
              rated 
              ${interaction.post_owner.first_name}

              ${interaction.rating} stars `}</p>

          </div>

        )
      })}



    </section>
  )
}
}

export default ProfileInteractions
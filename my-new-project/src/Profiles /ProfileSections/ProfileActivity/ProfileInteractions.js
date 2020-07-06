import React from 'react'
import axios from 'axios'
import { defaultImage } from '../../../lib/commonFiles'
import { getUserId } from '../../../lib/auth'

class ProfileInteractions extends React.Component {
state = {
  interactions: []
}

async componentDidMount() {
  const userId = getUserId()
  const res = await axios.get(`/api/postratings/${userId}/`)
  const interactions = res.data.splice(0).reverse()
  this.setState({ interactions })
}

render(){
  const { ratings ,user } = this.props
  return (

    <section className='profile-interactions dark-border italic sticky'>
      <div className='sticky int-h1'> <h1> Interactions</h1></div>

      <div className='scroll'>
        {ratings.map(interaction => {
          return (

            <div key={interaction.id} className='posts-interactions dark-border flex'>

              <img 
                src={interaction.owner.profile_image ?
                  interaction.owner.profile_image : defaultImage}
                className='small-icon'
                alt='profile-pic'/>

              <p>{`${interaction.owner.username} 
              rated ${user.bio.username}
              
              ${interaction.rating} stars `}</p>
            </div>
          )
        })}

      </div>
    </section>
  )
}
}

export default ProfileInteractions
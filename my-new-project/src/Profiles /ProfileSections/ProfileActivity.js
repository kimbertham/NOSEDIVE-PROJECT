import React from 'react'
import axios from 'axios'
import Posts from '../../Posts/Posts'
import MakePost from '../../Posts/MakePost'
import { headers } from '../../lib/auth'
import { getUserId } from '../../lib/auth'


class ProfileActivity extends React.Component {
  state = {
    form: {
      content: ''
    },
    posts: []
  }
  
  async componentDidMount(){
    this.getData()
  }

  getData = async () => {
    const user = getUserId()
    const posts = await axios.get(`/api/post/${user}`, headers())
    this.setState({ posts: posts.data })
    console.log('getting')
  }

  render() {
    const { posts } = this.props
    if (!posts) return ''
    return (
      <>

        <MakePost 
          data={this.getData}
        />


        {posts.slice(0).reverse().map(post => {
          return <Posts 
            key={post.id} 
            posts={post} 
            updateProfile={this.props.updateProfile} 
            data={this.getData}/>
        })}

      </>
    )
  }
}

export default ProfileActivity
import React from 'react'
import axios from 'axios'


class SidebarPosts extends React.Component {
  state = {
    ratings: []
  }
  
  async componentDidMount(){
    const userId = this.props.userId
    const postId = this.props.postId
    const ratings = await axios.get(`/api/postratings/profile/${userId}/post/${postId}`) 
    this.setState({ ratings: ratings.data })
  }

  render(){
    const { ratings } = this.state
    const { post } = this.props
    if (!post) return ''
    return (
      <div className='sidebar-post-field'>
        <h1>{post.owner.first_name} {post.owner.last_name}</h1>
        <p>{post.content}</p>
        <p> {ratings.length === 1 ? 
          `${ratings.length} PERSON RATED THIS POST` :
          `${ratings.length} PEOPLE RATED THIS POST`} </p>
      </div>
    )
  }
}

export default SidebarPosts
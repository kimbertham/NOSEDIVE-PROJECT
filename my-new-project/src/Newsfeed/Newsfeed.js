import React from 'react'
import axios from 'axios'
import MakePost from '../Posts/MakePost'
import Posts from '../Posts/Posts'

class Newsfeed extends React.Component {
state = {
  posts: []
}

async componentDidMount(){
  this.getPosts()
}

getPosts = async ()  => {
  const userId = this.props.match.params.id
  const posts = await axios.get(`/api/post/newsfeed/${userId}/`)
  this.setState({ posts: posts.data })
}

render() {
  const { posts }  = this.state
  const currentUserId = parseInt(this.props.match.params.id)

  return (
    <>
      <div className='bordered-box'>
        <h1>NewsFeed</h1>
      </div>
      <MakePost 
        page='newsfeed-post'
        updateProfile={this.getPosts}/>

      {posts.slice(0).reverse().map(post => {
        return <Posts 
          key={post.id} 
          page='profile'
          post={post}
          currentUserId={currentUserId} 
          updateProfile={this.getPosts}/>
      })}

    </>
    
  )
}
}



export default Newsfeed


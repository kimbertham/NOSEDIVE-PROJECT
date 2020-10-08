import React from 'react'
import axios from 'axios'
import MakePost from '../Posts/MakePost'
import Posts from '../Posts/Posts'
import { defaultImage } from '../lib/commonFiles'

class Newsfeed extends React.Component {
state = {
  posts: [],
  profile: ''
}

async componentDidMount(){
  this.getPosts()
}

getPosts = async ()  => {
  const userId = this.props.match.params.id
  const posts = await axios.get(`/api/post/newsfeed/${userId}/`)
  const profile = await axios.get(`/api/profile/${userId}/simple/`)
  this.setState({ posts: posts.data, profile: profile.data })
}

render() {
  const { posts, profile }  = this.state
  const currentUserId = parseInt(this.props.match.params.id)
  if (!profile) return null
  return (
    <>
      {/* <div className='bordered-box'>
        <h2>NewsFeed</h2>
      </div> */}
          
      <MakePost 
        page='newsfeed-post'
        updateProfile={this.getPosts}/>

      <div className='flex'>

        <div className='feed-left'>
          <div className='bordered-box flex'>
            <div 
              style={{  
                backgroundImage: `url(${profile.bio.profile_image})` }}
              className='profile-image'/>
            <div className='feed-text center'>
              <h1>{profile.rating.toString().slice(0, 3)}
                <small>{profile.rating.toString().slice(3,5)}</small> 
              </h1>
              <p>{profile.bio.first_name} {profile.bio.last_name}</p>
              <p>@{profile.bio.username}</p>
            </div> 
          </div>

          <div className='bordered-box feed-forum'>
            <h2 className='feed-title'> New Forums</h2>
          </div>
        </div>

        <div className='bordered-box feed-post' >
          <h2 className='feed-title'> Newest Posts </h2>
          {posts.slice(0).reverse().map(post => {
            return <Posts 
              key={post.id} 
              page='profile'
              post={post}
              currentUserId={currentUserId} 
              updateProfile={this.getPosts}/>
          })}
        </div>
      </div>

    </>
    
  )
}
}



export default Newsfeed


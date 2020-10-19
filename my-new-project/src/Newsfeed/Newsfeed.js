import React from 'react'
import axios from 'axios'
import MakePost from '../Posts/MakePost'
import Posts from '../Posts/Posts'
import ForumNews from '../Forum/ForumNews'
import NewsfeedBio from './NewsfeedBio'
import NewsfeedFriends from './NewsfeedFriends'

class Newsfeed extends React.Component {
state = {
  posts: [],
  forums: [],
  profile: ''
}

async componentDidMount(){
  this.getPosts()
}

getPosts = async ()  => {
  const userId = this.props.match.params.id
  const posts = await axios.get(`/api/post/newsfeed/${userId}/`)
  const profile = await axios.get(`/api/profile/${userId}/simple/`)
  const forums = await axios.get(`/api/forum/newsfeed/${userId}/`)
  this.setState({ posts: posts.data, profile: profile.data, forums: forums.data })
}

render() {
  const { posts, profile,forums }  = this.state
  const currentUserId = parseInt(this.props.match.params.id)
  if (!profile) return null
  return (
    <>
      <div className='bordered-box'>
        <h2>NewsFeed</h2>
      </div>
          
      <MakePost 
        page='newsfeed-post'
        updateProfile={this.getPosts}/>

      <div className='flex'>
        <div className='feed-left'>

          <NewsfeedBio 
            profile={profile}/>

          <div className='bordered-box feed-forum'>
            <h2 className='feed-title dark-border'> New Forums</h2>
            {forums.map(forum => {
              return <ForumNews
                key={forum.id}
                thread={forum}/>
            })}
          </div>

          <NewsfeedFriends/>
        </div>

        <div className='bordered-box feed-post' >
          <h2 className='feed-title dark-border'> Newest Posts </h2>
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


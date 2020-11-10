import React from 'react'
import axios from 'axios'
import MakePost from '../Posts/MakePost'
import Posts from '../Posts/Posts'
import ForumNews from '../Forum/ForumNews'
import NewsfeedBio from './NewsfeedBio'
import NewsfeedFriends from './NewsfeedFriends'
import { headers } from '../lib/auth'

class Newsfeed extends React.Component {
state = {
  posts: [],
  forums: [],
  friends: []
}

async componentDidMount(){
  await this.getData()
}

getData = async () => {
  const id = this.props.currentUserId
  const user  =  await axios.get(`/api/profile/${id}/bio/`)
  const forums = await axios.get(`/api/forum/newsfeed/${id}/`)
  const posts =  await axios.get(`/api/post/newsfeed/${id}/`)
  const average =  await axios.get(`/api/profile/${id}/average/`)
  const friends =  await axios.get(`/api/follow/find/${id}/`, headers())
  
  
  this.setState({ 
    posts: posts.data, 
    forums: forums.data, 
    user: user.data,
    average: average.data.average,
    friends: friends ? friends.data : null })
}

render() {

  const { posts ,forums, friends, user, average }  = this.state
  const { currentUserId } = this.props
  console.log(friends)
  if (!user) return null
  return (
    <>
      <div className='bordered-box'>
        <h2>NewsFeed</h2>
      </div>
          
      <MakePost 
        page='profile-post'
        user={user}
        updateProfile={this.getData}/>

      <div className='flex'>
        <div className='feed-left'>

          <NewsfeedBio 
            user={user}
            average={average}/>

          <div className='bordered-box feed-forum'>
            <h2 className='feed-title dark-border'> New Forums</h2>
            {forums.map(forum => {
              return <ForumNews
                key={forum.id}
                thread={forum}/>
            })}
          </div>

          <NewsfeedFriends
            friends={friends}
            user={user}/>
        </div>

        <div className='bordered-box feed-post' >
          <h2 className='feed-title dark-border'> Newest Posts </h2>
          {posts.slice(0).reverse().map(post => {
            return <Posts 
              user={user}
              key={post.id} 
              page='profile-post'
              post={post}
              currentUserId={currentUserId} 
              updateProfile={this.getData}/>
          })}
        </div>
        
      </div>

    </>
    
  )
}
}



export default Newsfeed


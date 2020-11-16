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
  friends: [],
  page: { page: [0,5] }
}

async componentDidMount(){
  await this.getData()
}

getData = async () => {
  const id = this.props.currentUserId
  const user  =  await axios.get(`/api/profile/${id}/bio/`)
  const forums = await axios.get(`/api/forum/newsfeed/${id}/`)
  const posts = await axios.post(`/api/post/newsfeed/${this.props.currentUserId}/`, this.state.page)
  const average =  await axios.get(`/api/profile/${id}/average/`)
  const friends =  await axios.get(`/api/follow/find/${id}/`, headers())
  
  this.setState({ 
    posts: posts.data, 
    forums: forums.data, 
    user: user.data,
    average: average.data.average,
    friends: friends ? friends.data : null })
}

getPosts = async () => {
  const page = { page: this.state.page }
  const posts = await axios.post(`/api/post/newsfeed/${this.props.currentUserId}/`, page)
  this.setState({ posts: posts.data })
}

setPage = (i) =>{
  this.setState({ page: i }, () => {
    this.getPosts()
  })
  
}

render() {

  const { posts ,forums, friends, user, average }  = this.state
  const { currentUserId } = this.props

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

          <div className='feed-post-cont'>
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
        
          <div className='page-nums right flex'>
            <div className='p-nums italic pointer' onClick={()=>{
              this.setPage([0,5])
            }}>1</div>
            <div className='p-nums italic pointer' onClick={()=>{
              this.setPage([5,10])
            }}>2</div>
            <div className='p-nums italic pointer' onClick={()=>{
              this.setPage([10,15])
            }}>3</div>
            <div className='p-nums italic pointer' onClick={()=>{
              this.setPage([15,20])
            }}>4</div>
            <div className='p-nums italic pointer' onClick={()=>{
              this.setPage([20,25])
            }}>5</div>
            <div className='p-nums italic pointer'> →
            </div>
          </div>

        </div>
      </div>
      
  

    </>
    
  )
}
}



export default Newsfeed


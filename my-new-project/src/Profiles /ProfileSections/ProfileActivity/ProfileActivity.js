import React from 'react'
import axios from 'axios'
import Posts from '../../../Posts/Posts'
import MakePost from '../../../Posts/MakePost'
import ProfileInteractions from './ProfileInteractions'

class ProfileActivity extends React.Component {
state ={
  posts: [],
  ratings: []
}

componentDidMount() {
  this.getPosts()
}

getPosts =  async () => {
  const posts = await axios.get(`/api/post/${this.props.userProfile}/`)
  this.setState({ posts: posts.data })
}


render() {
  const { posts  } = this.state
  const { user, currentUserId, userProfile, updateProfile } = this.props
  if (!posts) return ''
  return (
    <>


      <MakePost 
        getPosts={this.getPosts}
        page='profile-post'
        profile={userProfile}
      />
      


      <div className='flex'>
        <div className=' profile-posts bordered-box'>
          {posts.slice(0).reverse().map(post => {
            return <Posts 
              key={post.id}
              post={post}
              currentUserId={currentUserId} 
              getPosts={this.getPosts}
              updateProfile={updateProfile}/>
          })}
        </div>

        <div className='sticky'>
          <ProfileInteractions
            user={user}/>
        </div>
      </div>

    </>
  )
}
}


export default ProfileActivity
import React from 'react'
import axios from 'axios'
import SidebarSearch from './SidebarSearch'
import SidebarPosts from './SidebarPosts'
import SidebarTopPosts from './SidebarTopPosts'
import Navbar from '../../common/Navbar'


class Sidebar extends React.Component {
state = {
  newPosts: [],
  ratings: []
}

async componentDidMount() {
  const res = await axios.get('/api/post/')
  this.setState({ newPosts: res.data })
}

render(){
  const { newPosts } = this.state
  return (
    <>
      


      <section className='sidebar '>
        <img src='https://bit.ly/2MMLjiE'
          className='sidebar-logo '
          alt='logo'/>
        <Navbar />
        <SidebarSearch />

        <div className='sidebar-section'>
          <h1> New Posts</h1>
          {/* {newPosts.map(post => {
            return (
              <SidebarPosts 
                key={post.id} 
                post={post} 
                userId={post.owner.id} 
                postId={post.id}/>
            )
          })} */}
        </div>




        <SidebarTopPosts/>
      </section>
    </>
  )
}
}

export default Sidebar
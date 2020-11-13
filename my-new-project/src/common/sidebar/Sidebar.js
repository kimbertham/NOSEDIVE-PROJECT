import React from 'react'
import axios from 'axios'
import SidebarSearch from './SidebarSearch'
import SidebarPosts from './SidebarPosts'
import Navbar from '../../common/Navbar'


class Sidebar extends React.Component {
state = {
  newPosts: [],
  topPosts: []

}

async componentDidMount() {
  const res = await axios.get('/api/post/')
  this.setState({ 
    newPosts: res.data.new_posts,
    topPosts: res.data.top_posts })
}

render(){
  const { newPosts, topPosts } = this.state
  const { getData, currentUserId } = this.props

  if (!newPosts || !topPosts) return ''
  return (

    <div className='sidebar-container'>
      <section className='sidebar'>
        <img src='https://bit.ly/2MMLjiE'
          className='sidebar-logo '
          alt='logo'/>


        <Navbar 
          currentUserId={currentUserId}
          getData={getData}
        />
        
        <SidebarSearch 
          currentUserId={currentUserId}
          getData={getData}/>

        <h1 className='sidebar-title'> New Posts</h1>
        <div className='sidebar-section'>
          <SidebarPosts 
            posts={newPosts}/>
        </div>

        <h1 className='sidebar-title'> Top Posts</h1>
        <div className='sidebar-section'>
          <SidebarPosts 
            posts={topPosts}/>
        </div>

      </section>
    </div>

  )
}
}

export default Sidebar
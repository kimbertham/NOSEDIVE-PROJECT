import React from 'react'
import SidebarPosts from './SidebarPosts'

const SidebarTopPosts = () =>{

  return (
    <div className='sidebar-section'>
      <h1> Top Rated Posts</h1>
      
      <SidebarPosts />
      <SidebarPosts />
    </div>
  )
}

export default SidebarTopPosts
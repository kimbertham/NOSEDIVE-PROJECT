import React from 'react'

const Demo = () => {
  
  
  return (
    <div className='demo italic'>

      <div className='logo-set column center'>
        <div>
          <img src={require('../styles/assets/logo-n.jpg')}/>
          <img src={require('../styles/assets/o.jpg')}
            className='logo-o'alt='logo'/>
          <img  src={require('../styles/assets/logo-sins.jpg')}
            alt='logo'/>
        </div>
        <p className='logo-head'> Black Mirror S03E01</p>
      </div>

      <div className='center'>
        <img src={require('../styles/assets/nosedive-website.jpg')}
          className='demo-img' alt='og-site'/>
        <img src={require('../styles/assets/Black-Mirror-Nosedive-1.jpg')}
          className='demo-img' alt='og-site'/>
        <>
          <img src={require('../styles/assets/nosedive05.png')}
            className='demo-img' alt='og-site'/>
        </>
      </div>

      <section className='italic'>
  
        <h1 className='underline'> Nosedive</h1>
        <div className='demo-box'>
          <p> A project based on the website seen in an episode of the Black Mirror series. The website is a social media platform that is based around a 5 star ranking that determines an individuals public social standing and the users ability to access different privileges on the webpage. I have added in a few extra features that I thought would fit well with a platform mainly focused on the user interactions through rating such as a messaging system, forum, wishlist and stats which all have elements that depend on the users current star rating.  </p>
        </div>

        <h1> Profile</h1>
      </section>
    </div>

  )
}
export default Demo
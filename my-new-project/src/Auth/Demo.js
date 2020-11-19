import React from 'react'
import Logo from '../common/Logo'
import { Link } from 'react-router-dom'



class Demo extends React.Component {
  state = {
    img: null,
    caption: ''
  }

image = (e) => {
  
  this.setState({ 
    img: e.target.src,
    caption: e.target.id ? this[e.target.id].textContent : ''
  })

}

hide = (e) => {
  e.target.height = '0'
  e.target.width = '0'
}

modal = () => {
  this.setState({ img: !this.state.img })
}


render() {
  
  const { img } = this.state

  return (
    <div className='demo italic'>
      
      <Link to='/login'>
        <button className='button right'> Log in </button>
      </Link>
      
      <div onClick={this.modal}  className={img ? 'modal' : 'display-none'}>
        <div className='center screen-height'>
          <div className='demo-selected'>
            <video src={img} autoPlay onError={this.hide} />
            <img src={img} onError={this.hide}/>
            <p> {this.state.caption}</p>
          </div>
        </div>
      </div> 

      <Logo/>

      <section className='center'>
        <img onClick={this.image} src='https://bit.ly/2IUgz0h'
          className='demo-img' alt='og-site'/>
        <img onClick={this.image} src='https://bit.ly/2UINhV6'
          className='demo-img' alt='og-site'/>
        <>
          <img onClick={this.image} src='https://bit.ly/2UIbomU'
            className='demo-img' alt='og-site'/>
        </>
      </section>

  
      <h1 className='underline'> Nosedive</h1>
      <div className='demo-box'>
        <p> A project based on the website seen in an episode of the Black Mirror series. The website is a social media platform that is based around a 5 star ranking that determines an individuals public social standing and the users ability to access different privileges on the webpage. I have added in a few extra features that I thought would fit well with a platform mainly focused on the user interactions through rating such as a messaging system, forum, wishlist and stats which all have elements that depend on the users current star rating.  </p>
      </div>

      <h1 className='center'> Profile </h1>

      <div className='center demo-section flex-between'>
        <div className='demo-post'>

          <h2> Bio </h2>
          <video
            src='https://bit.ly/3ffM8xO' id='bio' className='demo-vid' 
            controls={false}  muted={true}
            onClick={this.image} onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
          <p className='display-none' ref={ref => this.bio = ref}>
            A project based on the website seen in an episode of the Black Mirror series. The website is a social media platform that is based around a 5 star ranking that determines an individuals public social standing.
          </p>
        </div>

        <div className='demo-post'>
          <h1> Photos</h1>
          <video
            src='https://bit.ly/331wjWN' id='photos' className='demo-vid' 
            controls={false}  muted={true}
            onClick={this.image} onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
          <p className='display-none' ref={ref => this.photos = ref}>
            A project based on the website seen in an episode of the Black Mirror series. The website is a social media platform that is based around a 5 star ranking that determines an individuals public social standing.            </p>
        </div>

        <div className='demo-post'>
          <h1>Fans</h1>
          <video
            src='https://bit.ly/36NLeEY' id='photos' className='demo-vid' 
            controls={false}  muted={true}
            onClick={this.image} onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
          <p className='display-none' ref={ref => this.photos = ref}>
            A project based on the website seen in an episode of the Black Mirror series. The website is a social media platform that is based around a 5 star ranking that determines an individuals public social standing.            </p>
        </div>

        <div className='demo-post'>
          <h1>Activity:<small> Posts</small> </h1>
          
          <video
            src='https://bit.ly/3lSfCoc' id='photos' className='demo-vid' 
            controls={false}  muted={true}
            onClick={this.image} onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
          <p className='display-none' ref={ref => this.photos = ref}>
            A project based on the website seen in an episode of the Black Mirror series. The website is a social media platform that is based around a 5 star ranking that determines an individuals public social standing.
          </p>
        </div>

        <div className='demo-post'>
          <br/>
          <h3> Comments</h3>
          <video
            src='https://bit.ly/36P1GoC' id='photos' className='demo-vid' 
            controls={false}  muted={true}
            onClick={this.image} onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
          <p className='display-none' ref={ref => this.photos = ref}>
            A project based on the website seen in an episode of the Black Mirror series. The website is a social media platform that is based around a 5 star ranking that determines an individuals public social standing.
          </p>
        </div>

        <div className='demo-post'>
          <br/>
          <h3>Post ratings</h3>
          <video
            src='https://bit.ly/2UGHqzL' id='photos' className='demo-vid' 
            controls={false}  muted={true}
            onClick={this.image} onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
          <p className='display-none' ref={ref => this.photos = ref}>
            A project based on the website seen in an episode of the Black Mirror series. The website is a social media platform that is based around a 5 star ranking that determines an individuals public social standing.
          </p>
        </div>

        <div className='demo-post'>
          <br/>
          <h1>Wishlist</h1>
          <video
            src='https://bit.ly/3fgR7yw' id='photos' className='demo-vid' 
            controls={false}  muted={true}
            onClick={this.image} onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
          <p className='display-none' ref={ref => this.photos = ref}>
            A project based on the website seen in an episode of the Black Mirror series. The website is a social media platform that is based around a 5 star ranking that determines an individuals public social standing.
          </p>
        </div>

        <div className='demo-post'>
          <br/>
          <h3>Wishlist Rating Not High Enough</h3>
          <video
            src='https://bit.ly/2UJQCmS' id='photos' className='demo-vid' 
            controls={false}  muted={true}
            onClick={this.image} onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
          <p className='display-none' ref={ref => this.photos = ref}>
            A project based on the website seen in an episode of the Black Mirror series. The website is a social media platform that is based around a 5 star ranking that determines an individuals public social standing.
          </p>
        </div>

        <div className='demo-post'>
          <br/>
          <h3>Wishlist Rating Dropped Too Low</h3>
          <video
            src='https://bit.ly/3lNBsZV' id='photos' className='demo-vid' 
            controls={false}  muted={true}
            onClick={this.image} onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
          <p className='display-none' ref={ref => this.photos = ref}>
            A project based on the website seen in an episode of the Black Mirror series. The website is a social media platform that is based around a 5 star ranking that determines an individuals public social standing.
          </p>
        </div>
      </div>

      <h1 className='center'> Ratings and Stats </h1>
      <div className='center demo-section flex-between'>

        <div className='demo-post'>
          <h2> Rate </h2>
          <video
            src='https://bit.ly/2ITalxI' id='bio' className='demo-vid' 
            controls={false}  muted={true}
            onClick={this.image} onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
          <p className='display-none' ref={ref => this.bio = ref}>
            A project based on the website seen in an episode of the Black Mirror series. The website is a social media platform that is based around a 5 star ranking that determines an individuals public social standing.
          </p>
        </div>


        <div className='demo-post'>
          <h2> Feedback </h2>
          <video
            src='https://bit.ly/3nD0f37' id='bio' className='demo-vid' 
            controls={false}  muted={true}
            onClick={this.image} onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
          <p className='display-none' ref={ref => this.bio = ref}>
            A project based on the website seen in an episode of the Black Mirror series. The website is a social media platform that is based around a 5 star ranking that determines an individuals public social standing.
          </p>
        </div>

        <div className='demo-post'>
          <h2> Stats/Advice </h2>
          <video
            src='https://bit.ly/2IP5rlK' id='bio' className='demo-vid' 
            controls={false}  muted={true}
            onClick={this.image} onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
          <p className='display-none' ref={ref => this.bio = ref}>
            A project based on the website seen in an episode of the Black Mirror series. The website is a social media platform that is based around a 5 star ranking that determines an individuals public social standing.
          </p>
        </div>

      </div>

      <h1 className='center'> Forum </h1>
      <div className='center demo-section flex-between'>

        <div className='demo-post'>
          <h2> Forum </h2>
          <video
            src='https://bit.ly/2UGZ4TV' id='bio' className='demo-vid' 
            controls={false}  muted={true}
            onClick={this.image} onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
          <p className='display-none' ref={ref => this.bio = ref}>
            A project based on the website seen in an episode of the Black Mirror series. The website is a social media platform that is based around a 5 star ranking that determines an individuals public social standing.
          </p>
        </div>
          
        <div className='demo-post'>
          <h2> Posts/Replies </h2>
          <video
            src='https://bit.ly/36LUvNQ' id='bio' className='demo-vid' 
            controls={false}  muted={true}
            onClick={this.image} onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
          <p className='display-none' ref={ref => this.bio = ref}>
            A project based on the website seen in an episode of the Black Mirror series. The website is a social media platform that is based around a 5 star ranking that determines an individuals public social standing.
          </p>
        </div>

        <div className='demo-post'>
          <h2> Rating Restrictions </h2>
          <video
            src='https://bit.ly/2IRJy50' id='bio' className='demo-vid' 
            controls={false}  muted={true}
            onClick={this.image} onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
          <p className='display-none' ref={ref => this.bio = ref}>
            A project based on the website seen in an episode of the Black Mirror series. The website is a social media platform that is based around a 5 star ranking that determines an individuals public social standing.
          </p>
        </div>

        <div className='demo-post'>
          <h2> Follow Threads </h2>
          <video
            src='https://bit.ly/3kMEkVi' id='bio' className='demo-vid' 
            controls={false}  muted={true}
            onClick={this.image} onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
          <p className='display-none' ref={ref => this.bio = ref}>
            A project based on the website seen in an episode of the Black Mirror series. The website is a social media platform that is based around a 5 star ranking that determines an individuals public social standing.
          </p>
        </div>
      </div>
  
      <h1 className='center'> Messaging </h1>
      <div className='center demo-section flex-between'>
        <div className='demo-post'>
          <h2> Forum </h2>
          <video
            src='https://bit.ly/3pMaGDp' id='bio' className='demo-vid' 
            controls={false}  muted={true}
            onClick={this.image} onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
          <p className='display-none' ref={ref => this.bio = ref}>
            A project based on the website seen in an episode of the Black Mirror series. The website is a social media platform that is based around a 5 star ranking that determines an individuals public social standing.
          </p>
        </div>
      </div>

    

      
    </div>

  )
}
}
export default Demo
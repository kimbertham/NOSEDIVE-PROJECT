import React from 'react'
import Logo from '../common/Logo'



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
  console.log(this.state)
  
  const { img } = this.state

  return (
    <div className='demo italic'>

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

      <section className='italic'>
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
            <h1>Activity </h1>
            <video
              src='https://bit.ly/36NLeEY' id='photos' className='demo-vid' 
              controls={false}  muted={true}
              onClick={this.image} onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
            <p className='display-none' ref={ref => this.photos = ref}>
            A project based on the website seen in an episode of the Black Mirror series. The website is a social media platform that is based around a 5 star ranking that determines an individuals public social standing.
            </p>
          </div>

        </div>





      </section>
    </div>

  )
}
}
export default Demo
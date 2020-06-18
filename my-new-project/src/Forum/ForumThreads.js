import React from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'


const user = getUserId()

class ForumThreads extends React.Component {
  state={
    thread: [],
    rating: '',
    modal: false,
    owner: ''
  }

  async componentDidMount() {
    const threadId = this.props.match.params.id
    const res = await axios.get(`/api/forum/${threadId}`)
    const rating = await axios.get(`/api/ratings/ratedata/${user}`)
    
    this.setState({ 
      thread: res.data[0],  
      rating: rating.data.avg,
      owner: res.data[0].forum_owner },
    () => {

      if (this.state.thread.limitations && 
          this.state.rating.toString().charAt(0) === 
          this.state.thread.limitations) {
        this.setState({ modal: true })
      }

    })
  }




  render() {
    const { modal, thread, owner } = this.state
    const modalClass = !modal ?  'display-none' : 'display:block'
    console.log(this.state)

    return (
      <>
        <div className={`modal ${modalClass}`}>
        </div>

        <h1 className='
        bordered-box 
      dark-border'> Community
        </h1>

        <div className='
        bordered-box 
        dark-border 
        flex'>

          <div>
            <img src={thread.image} 
              className='thread-img dark-border'
              alt='thread-img'/>
            <div className='flex'>
              <img
                src={owner.profile_image} 
                alt='owner-img'
                className='small-icon'/>
              <div>
                <p>{owner.first_name} {owner.last_name}</p>
                <p>{thread.created_at}</p>
              </div>
            </div>
          </div>

          <div>
            <p className='thread-limits'>
              {thread.limitations ?
                `NO ${thread.limitations} STARS ALLOWED` : 'PUBLIC'} </p>
            <h1>{thread.title}</h1>
            <p>{thread.description}</p>
            <p className='
            bordered-box dark-border thread-content'>
              {thread.content}</p>
          </div>
        </div>
        

      </>
    )
  }

}

export default ForumThreads
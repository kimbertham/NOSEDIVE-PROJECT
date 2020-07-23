import React from 'react'
import MakePost from '../Posts/MakePost'
class Newsfeed extends React.Component {


  render() {
    const userId = this.props.match.params.id
    console.log(userId)
    return (
      <>
        <div className='bordered-box'>
          <h1>NewsFeed</h1>
        </div>
        <MakePost />
      </>
    )
  }
}

export default Newsfeed


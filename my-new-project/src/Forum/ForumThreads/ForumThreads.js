import React from 'react'
import axios from 'axios'
import { getUserId } from '../../lib/auth'
import MakePost from '../../Posts/MakePost'
import ThreadPost from './ThreadPost'
import Recursive from './ThreadComments/Recursive'


const user = getUserId()

class ForumThreads extends React.Component {
  state={
    thread: [],
    rating: '',
    modal: false,
    owner: '',
    comments: []
  }

  async componentDidMount() {
    this.getComments()
    const threadId = this.props.match.params.id
    const res = await axios.get(`/api/forum/${threadId}/`)
    const rating = await axios.get(`/api/ratings/ratedata/${user}/`)
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

  getComments = async () => {
    const threadId = this.props.match.params.id
    const res = await axios.get(`/api/forum/${threadId}`)
    this.setState({ comments: res.data })
  }

  render() {

    const { modal, thread, owner , comments } = this.state
    const threadId = this.props.match.params.id
    return (
      <>

        <ThreadPost
          modal={modal}
          thread={thread}
          owner={owner}/>

        
        <MakePost
          page='thread-post'
          threadId={threadId}
          getComments={this.getComments}/>

        {comments.map(comment => {
          return (
            <Recursive 
              key={comment.id}
              comment={comment}
              getComments={this.getComments}/>
          )
        })}

      </>
    )
  }

}

export default ForumThreads
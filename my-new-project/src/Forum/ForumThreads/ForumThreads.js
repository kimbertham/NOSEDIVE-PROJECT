import React from 'react'
import axios from 'axios'
import { getUserId, headers } from '../../lib/auth'
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
    comments: [],
    following: ''
  }

  async componentDidMount() {
    this.getData()
  }
  
  getData = async () => {
    this.getComments()
    const threadId = this.props.match.params.id
    const res = await axios.get(`/api/forum/${threadId}/`)
    const rating = await axios.get(`/api/ratings/ratedata/${user}/`)
    const following = res.data[0].followers.includes(user)
    this.setState({ 
      thread: res.data[0],  
      rating: rating.data.avg,
      owner: res.data[0].forum_owner,
      following: following },
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

  followForum = async () => {
    const forumId = this.state.thread.id
    this.state.following ? 
      await axios.delete(`/api/forum/follow/${forumId}/`, headers())
      : await axios.post(`/api/forum/follow/${forumId}/`, null , headers())
    this.getData()
  }

  render() {

    const { modal, thread, owner , comments, following } = this.state
    const threadId = this.props.match.params.id
    return (
      <>

        <ThreadPost
          modal={modal}
          thread={thread}
          owner={owner}
          follow={this.followForum}
          following={following}/>

        
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
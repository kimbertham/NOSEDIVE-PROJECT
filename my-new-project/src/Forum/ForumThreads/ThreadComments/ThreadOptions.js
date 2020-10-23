import React from 'react' 
import MakeComment from '../../../Posts/PostComments/MakeComments'
import axios from 'axios'
import { headers, getUserId } from '../../../lib/auth'
const userId = getUserId()

class ThreadOptions extends React.Component {
  state ={
    reply: false
  }

toggleReply = () => {
  this.setState({ reply: !this.state.reply })
}

handleDelete = async (commentId) => {
  await axios.delete(`/api/forum/${commentId}/` , headers())
  this.props.getComments()
}

render() {

  const { comment, getComments, replies, toggleReplies } = this.props
  return (
    <>

      <div className={this.state.reply ?
        'display-block' : 'display-none'}>
        <MakeComment
          forum={comment.forum}
          parent={comment.id}
          page={'thread'}
          getComments={getComments}
          toggleReplies={toggleReplies}
          toggleReply={this.toggleReply}
        />
      </div>

      <div className='tcom-options'>

        <button 
          className={comment.children.length > 0 ?
            'button' : 'display-none'}
          onClick={() =>{
            toggleReplies(null)
          }}>
          {!replies ? 'Replies...' : 'Hide...'} 
        </button>


        <button 
          onClick={this.toggleReply}
          className='button'> Reply
        </button>

        <button 
          className={comment.comment_owner.id === userId ? 
            'button' : 'display-none'}
          onClick={ () => {
            this.handleDelete(comment.id)
          }}> Delete 
        </button>

      </div>

    </>
  )
}
}

export default ThreadOptions


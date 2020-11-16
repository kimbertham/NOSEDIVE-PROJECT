import React from 'react'
import ForumNew from './ForumNew'
import ForumCard from './ForumCard'


class Forum extends React.Component {
  state= {
    modal: false,
    fButton: false
  }

  async componentDidMount() {
    this.props.getData()
  }

  handleModal =() => {
    this.setState({ modal: !this.state.modal })
  }

  dontCloseModal = (e)=> {
    e.stopPropagation()
    this.setState({ gallery: true })
  }

toggleFollowed = () => {
  this.setState({ fButton: !this.state.fButton })
}

render(){

  const {  modal, fButton } = this.state
  const { currentUserId, forum, followed, getData } = this.props

  const modalClass = modal ? 'display-block' : 'display-none'
  const follow = fButton ?  'All-threads' : 'Followed Threads' 

  return (
    <>
      <h1 className='bordered-box dark-border'> 
        Community
      </h1>
      
      <div  
        className='bordered-box dark-border'> 
        Ullamco ipsum pariatur do Lorem eiusmod veniam ut occaecat ad magna in.Deserunt veniam sint et tempor proident fugiat eu ex velit magna.Est consequat sunt laboris minim cupidatat sit et aute proident eu.Irure eiusmod sint aliqua in eiusmod magna.Quis voluptate anim culpa et pariatur mollit do do fugiat aliquip ut.Irure anim irure nisi ex Lorem non fugiat nostrud id id commodo.Adipisicing proident officia duis tempor enim dolor.Eiusmod ipsum anim et ea ut minim laborum adipisicing proident amet sit deserunt ipsum enim.Nulla duis magna pariatur incididunt magna.
      </div>

      <div className='thread-btn'>
        <button className='button' onClick={this.toggleFollowed}> {follow}</button>
        <button className='button' onClick={this.handleModal}>+ New thread</button>
      </div>

      <div className={`${modalClass}`}>
        <div onClick={this.handleModal} className='modal center'>
          <div onClick={this.dontCloseModal} className='modal-pop'>
            <ForumNew
              handleModal={this.handleModal}
              getData={getData}/>
          </div>
        </div>
      </div>

      {forum[0] ? 
        <>
          {fButton ? followed.map(thread=>{
            return <ForumCard 
              currentUserId={currentUserId}
              key={thread.id}
              thread={thread}/>
          }) : 
            forum.map(thread=>{
              return <ForumCard 
                currentUserId={currentUserId}
                key={thread.id}
                thread={thread}/>
            })}
        </> : ''}


    </>
  )
}
}

export default Forum

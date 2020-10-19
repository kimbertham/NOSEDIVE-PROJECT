import React from 'react'
import axios from 'axios'
import ForumNew from './ForumNew'
import ForumCard from './ForumCard'


class Forum extends React.Component {
  state= {
    forum: [],
    modal: false
  }

  async componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const res = await axios.get('/api/forum/')
    this.setState({ forum: res.data })
  }

  handleModal =() => {
    this.setState({ modal: !this.state.modal })
  }

  dontCloseModal = (e)=> {
    e.stopPropagation()
    this.setState({ gallery: true })
  }

  render(){
    const { forum, modal } = this.state
    const modalClass = modal ? 'display-block' : 'display-none'
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
          <button className='button' onClick={this.handleModal}>+ New thread</button>
        </div>

        <div className={`${modalClass}`}>
          <div onClick={this.handleModal} className='modal center'>
            <div onClick={this.dontCloseModal} className='modal-pop'>
              <ForumNew
                handleModal={this.handleModal}
                updateForum={this.getData}/>
            </div>
          </div>
        </div>

        {forum.map(thread=>{
          return <ForumCard 
            key={thread.id}
            thread={thread}/>
        })}

      </>
    )
  }
}

export default Forum

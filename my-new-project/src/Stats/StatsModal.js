import React from 'react'

const StatsModal = ({ advice, weakness, handleModal, modal }) => {


  const modalClass = modal ? 
    'display-block' : 'display-none'

  return (

    <div className={`modal center ${modalClass}`}
      onClick={handleModal}>


      <div className='advice-container'>
        <h1>Advice Slip</h1>
        <br/>
        <p>Your feedback suggests that your weakest attribute is : 
          <span className='large-text'>{weakness}</span>
          <br/>
          You should consider 
          <span className='large-text'> 
            <a href={advice}> these resources </a>
          </span>
          to better fit into society </p>
      </div>

    </div>

  )
}

export default StatsModal

import React from 'react'
import Loader from 'react-loader-spinner'

class Loading extends React.Component {

  render() {
    return (
      <Loader
        type="Puff"
        color="#ce9b8e"
        height={100}
        width={80}
      />
    )
  }
}

export default Loading
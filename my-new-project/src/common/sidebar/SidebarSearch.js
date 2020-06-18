import React from 'react'

class SidebarSearch extends React.Component {
  state = {
    query: '',
    data: ''
  }

  // handleChange = () => {
  //   this.setState({ query: this.search.value },
  //     () => {
  //       if (this.state.query && this.state.query.length > 1) {
  //         if (this.state.query.length % 2 === 0) {
  //           this.handleSubmit()
  //         }
  //       }
  //     }
  //   )
  // }

  // async handleSubmit() {
  //   axios.get(`${API_URL}?api_key=${API_KEY}&prefix=${this.state.query}&limit=7`)
  //   const data = res.data
  //   this.setState({ data })
  // }
  



  render() {
    return (
      <div className='search-bar flex'>
        <form className='full-width flex center'>
          <input
            className='search-input dark-border'
            ref={input => this.search = input}
            onChange={this.handleInputChange}
          />
          <p>{this.state.query}</p>
          <button className='button'> Search</button>
        </form>
      </div>
    )
  }
}
export default SidebarSearch
import React from 'react'
import axios from 'axios'
import { headers } from '../../../lib/auth'

const baseURL = 'https://amazon-product-reviews-keywords.p.rapidapi.com/product/search?country=US&keyword='
const amazonHeaders = {
  'headers': {
    'x-rapidapi-host': 'amazon-product-reviews-keywords.p.rapidapi.com',
    'x-rapidapi-key': '5789c571cbmsh6847871835030fcp18787bjsncd9c94134328'
  } }

class ProfileWish extends React.Component {
state= {
  products: [],


  form: {
    search: ''
  },

  postForm: { 
    content: '',
    image: '',
    url: '',
    title: '',
    price: ''
  },

  wishlist: []

}


handleChange = event => {
  const form = { ...this.state.form, [event.target.name]: event.target.value }
  this.setState({ form })
}

handleSubmit = async event => {
  event.preventDefault()
  try {
    const res = await axios(`${baseURL}${this.state.form.search}`, amazonHeaders )
    console.log(this.state.form.search)
    const products = res.data.products
    this.setState({ products , form: { search: '' } })
  } catch (err) {
    console.log(err)
  }
}

handleWishList = async (price, thumbnail, url, title ) => {
  console.log('getting clicked')
  const userLimit = this.props.rating.avg * 10
  if (price > userLimit) {
    console.log('poor af ')
  } else {
    this.setState({ 
      postForm: { 
        price: price,
        thumbnail: thumbnail,
        url: url,
        title: title
      } },
    async () => {
      await axios.post('/api/wishlist/', this.state.postForm , headers())
      this.props.updateProfile()
    })
  }
}

render() {
  console.log(this.props)
  const { products } = this.state
  console.log(this.state)
  return (
    <>
      <form 
        className='post-form center '
        onSubmit={this.handleSubmit}
      >
        <textarea
          className='post-texarea dark border'
          placeholder={'What\'s happening?'}
          name='search'
          onChange={this.handleChange}
          value={this.state.form.search}
        />
        <br/>
        <button className='dark-border post-button button'> Send!</button>
      </form>

      <h1>{products[0] ? 'Results' : '' }</h1>

      <div className='products-container flex full-width'>
        {products.map(product => {
          return (
            <div 
              key={product.asin}
              className='product-field bordered-box'>

              <div className='product-img-container bordered-box '>
                <img
                  src={product.thumbnail}
                  className="product-photo" 
                  alt='product-photo'
                />
              </div>
              
              <h1>{product.title}</h1>
              <p>{product.price}</p>

              <button
                onClick={() => {
                  this.handleWishList(
                    product.price,
                    product.thumbnail,
                    product.url,
                    product.title)
                }}
              >
              Add to Wishlish
              </button>
            </div>
          )
        })}





      </div>
    </>

  )
}
}

export default ProfileWish
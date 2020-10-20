
import React from 'react'
import axios from 'axios'
import { headers } from '../../../lib/auth'
import { amazonBaseURL, amazonHeaders } from '../../../lib/commonFiles'
import ProfileWishlistAdd from './ProfileWishlistAdd'
import WishlistProduct from './WishlistProduct'
import Loading from '../../../common/Loader'

class ProfileWish extends React.Component {
state = {
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

  wishlist: [],
  modal: false,
  loading: false
}


handleChange = event => {
  const form = { ...this.state.form, [event.target.name]: event.target.value }
  this.setState({ form })
}

handleSubmit =  event => {
  event.preventDefault()
  this.setState({ loading: true }, 
    async ()  => {
      try {
        const res = await axios(`${amazonBaseURL}${this.state.form.search}`, amazonHeaders )
        const products = res.data.products
        this.setState({ products , form: { search: '' }, loading: false })
      } catch (err) {
        console.log(err)
      } 
    })
}

handleWishList = async (price, thumbnail, url, title ) => {
  const userLimit = this.props.user.avg * 10
  if (price > userLimit) {
    this.setState({ modal: 'Your rating is not high enough for this action' })
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
      this.setState({ modal: 'Item Added to Wishlist' })
    })
  }
  this.props.updateProfile(this.props.userProfile, 'wishlist')
}

handleDelete = async (product) => {
  await axios.delete(`/api/wishlist/${product}/`, headers())
  this.props.updateProfile(this.props.userProfile, 'wishlist')
}

handleModal = () => {
  this.setState({ modal: !this.state.modal })
}

render() {

  const { products, modal, search, loading } = this.state
  const { user,currentUserId } = this.props
  const { wishlist } = user

  if (!wishlist) return ''
  return (
    <> 
      <div className='wishlist-section scroll'>
      
        <h1>{user.bio.first_name}&apos;s Wishlist</h1>

        <ProfileWishlistAdd 
          user={user}
          currentUserId={currentUserId}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          search={search}/>


        {loading === true ? 
          <div className='center wish-loader'> 
            <Loading />
          </div> : null}
    

        <div className='products-container flex'>
          {products.map(product => {
            return (
              <WishlistProduct 
                key={product.asin}
                handleWishList={this.handleWishList}
                product={product}
                search={true}/>
            )
          })}
          
          {wishlist.map(product => {
            return ( 
              <WishlistProduct 
                key={product.asin}
                handleWishList={this.handleWishList}
                product={product}
                search={false}
                handleDelete={this.handleDelete}/>
            )
          })}
          
          <div 
            onClick={this.handleModal}
            className={`modal center 
          ${ modal ? 'display-block' : 'display-none'}`}>
            <div className='modal-pop'>
              {this.state.modal}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
}

export default ProfileWish
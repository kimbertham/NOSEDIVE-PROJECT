
import React from 'react'


const WishlistProduct = ({ product, search, handleWishList,handleDelete,currentUserId, user }) => {

  if (!product) return null
  return (
  

    <div className='product-field dark-border'>
      
      <div className={`block-wish ${product.block ? 'center wish-block blurred' : 'display-none'}`}>
        <div className='cross'/>
        <p> Rating no longer higher enough </p>
      </div>

      <div className='product-img-container'>  
        <img
          src={product.thumbnail}
          className="product-photo" 
          alt='product-pic'/>
      </div>
              
      <a href={product.url}>
        <h1>{product.title}</h1>
        <p>{ product.price.current_price ?  `£${ product.price.current_price}` : null}</p>
        <p>{ product.price ?  `£${ product.price}` : null}</p>
      </a>
      {currentUserId === user.bio.id ?
        search === true ? 
          <button className='wishlist-button button'
            onClick={() => {
              handleWishList(
                product.price.current_price,
                product.thumbnail,
                product.url,
                product.title)
            }}> Add to Wishlish </button> 
          : 
          <button className='wishlist-button button'
            onClick={() => {
              handleDelete(product.id)
            }}> Delete </button>
        : '' }

    </div>

  )
}

export default WishlistProduct

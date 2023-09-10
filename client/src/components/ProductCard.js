import React, { useContext } from 'react'
import { CustomerContext } from '../contexts/CustomerContext';

function ProductCard({ product }) {
    const {handleAddToCart} = useContext(CustomerContext);
    return (
        <div className="product card">
            <img src={product.imgURL} alt="product-img" className='card-img-top p-2' style={{ height: '300px', width: '285px' }}></img>
            <div className='card-body flex-fill'>
                <div className="product-text title card-title"> {product.name} </div>
                <div className='product-text description card-text'>{product.description}</div>
                <div className='product-text price card-text'>$ {product.price}</div>
                <div className='btn btn-danger btn-md cart-btn mt-2' onClick={() => handleAddToCart(product)}>ADD TO CART</div>
            </div>
        </div>
    )
}

export default ProductCard
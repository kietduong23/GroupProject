import React from 'react'

function ProductCard({ product, handleAddToCart }) {
    const handleAdd = (product) => {
        handleAddToCart(product);
    }
    return (

        <div className="product card">
            {/* <div className="product-img card-img-top"> */}
                <img src={product.img} alt="product-img" className='card-img-top p-2' style={{height: '400px'}}></img>
            {/* </div> */}
            <div className='card-body flex-fill'>
                <div className="product-text title card-title"> {product.name} </div>
                <div className='product-text description card-text'>{product.description}</div>
                <div className='product-text price card-text'>$ {product.price}</div>
                <div className='btn btn-danger btn-md cart-btn mt-2' onClick={() => handleAdd(product)}>ADD TO CART</div>
            </div>
        </div>
    )
}

export default ProductCard
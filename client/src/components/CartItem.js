import React, { useContext } from 'react'
import { ShoppingCartContext } from '../contexts/ShoppingCartContext'

function CartItem({ product, quantity }) {
    const {
        handleItemIncrease,
        handleItemDecrease,
        handleItemRemove
    } = useContext(ShoppingCartContext)

    return (
        <div className='container card' key={product.id} style={{ width: '700px', height:'200px'}}>
            <div className='row'>
                <div className="col-sm-4">
                    <img src={product.img} alt="product-img" className='card-img img-fluid p-2' style={{height:'200px'}}></img>
                </div>
                <div className="col-sm-8">
                    <div className='card-body'>
                        <div className="product-text title card-title">Name: {product.name} </div>
                        <div className='product-text description card-text'>Description: {product.description}</div>
                        <div className='product-text price card-text'>Price: ${product.price}</div>
                        <div className='d-flex'>
                            <div className='product-text quantity card-text d-flex align-items-center flex-fill'>Quantity: {quantity}</div>
                            <button className='btn btn-warning' onClick={() => handleItemDecrease(product.id)}>-</button>
                            <button className='btn btn-primary mx-2' onClick={() => handleItemIncrease(product.id)}>+</button>
                        </div>
                        <div className='btn btn-danger btn-md cart-btn mt-1' onClick={() => handleItemRemove(product.id)}>Remove</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CartItem
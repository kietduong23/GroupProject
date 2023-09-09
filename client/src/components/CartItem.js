import React, { useContext } from 'react'
import { CustomerContext } from '../contexts/CustomerContext'

function CartItem({ item }) {
    const {
        handleItemIncrease,
        handleItemDecrease,
        handleItemRemove
    } = useContext(CustomerContext)
    return (
        <div className='container card' key={item.product._id} style={{ width: '700px', height:'200px'}}>
            <div className='row'>
                <div className="col-sm-4">
                    <img src={item.product.imgURL} alt="product-img" className='card-img img-fluid p-2' style={{height:'200px'}}></img>
                </div>
                <div className="col-sm-8">
                    <div className='card-body'>
                        <div className="product-text title card-title">Name: {item.product.name} </div>
                        <div className='product-text description card-text'>Description: {item.product.description}</div>
                        <div className='product-text price card-text'>Price: ${item.product.price}</div>
                        <div className='d-flex'>
                            <div className='product-text quantity card-text d-flex align-items-center flex-fill'>Quantity: {item.quantity}</div>
                            <button className='btn btn-warning' onClick={() => handleItemDecrease(item._id, item.quantity)}>-</button>
                            <button className='btn btn-primary mx-2' onClick={() => handleItemIncrease(item._id, item.quantity)}>+</button>
                        </div>
                        <div className='btn btn-danger btn-md cart-btn mt-1' onClick={() => handleItemRemove(item._id)}>Remove</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CartItem
import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'

function ShoppingCart({ products, handleItemRemove, handleItemIncrease, handleItemDecrease, handleClearCart, handlePlaceOrder, totalPrice }) {
    return (
        <>
            <div className="cart-items overflow-auto border" style={{ height: '250px' }}>
                {(products.length > 0) ? products.map((product) => 
                <div className="p-2" key={product.id}>
                    <CartItem
                    product={product}
                    handleRemove={handleItemRemove}
                    handleQuantityIncrease={handleItemIncrease}
                    handleQuantityDecrease={handleItemDecrease}/>
                </div>) : (<div>Your cart is empty</div>)}
            </div>
            <div className="cart-summary">
                <div>Total price: ${totalPrice}</div>
            </div>
            <div className="">
                <button className='btn btn-danger' onClick={handleClearCart}>Clear cart</button>
                <button className='btn btn-primary' onClick={handlePlaceOrder}>Place an order</button>
            </div>
        </>
    )
}

export default ShoppingCart
import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'

function ShoppingCart({ products, handleItemRemove, handleItemIncrease, handleItemDecrease, clearCart, totalPrice }) {
    
    const handleRemove = (itemID) => {
        handleItemRemove(itemID)
    }

    const handleQuantityIncrease = (id) => {
        handleItemIncrease(id);
    }

    const handleQuantityDecrease = (id) => {
        handleItemDecrease(id);
    }

    return (
        <>
            <div className="cart-items">
                {products.map((product) => 
                <div className="p-2" key={product.id}>
                    <CartItem
                    product={product}
                    handleRemove={handleRemove}
                    handleQuantityIncrease={handleQuantityIncrease}
                    handleQuantityDecrease={handleQuantityDecrease}/>
                </div>)}
            </div>
            <div className="cart-summary">
                <div>Total price: ${totalPrice}</div>
            </div>
            <div className="">
                <button className='btn btn-danger' onClick={clearCart}>Clear cart</button>
                <button className='btn btn-primary'>Place an order</button>
            </div>
        </>
    )
}

export default ShoppingCart
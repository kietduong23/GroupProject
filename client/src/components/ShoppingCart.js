import React, { useContext } from 'react'
import CartItem from './CartItem'
import { CustomerContext } from '../contexts/CustomerContext'

function ShoppingCart() {
    const {
        shoppingCart,
        totalPrice,
        handleClearCart,
        handlePlaceOrder
    } = useContext(CustomerContext);
    return (
        <>
            <div className="cart-items overflow-auto border" style={{ height: '250px' }}>
                {(shoppingCart.length > 0) ? shoppingCart.map((item) => 
                <div className="p-2" key={item.product.id}>
                    <CartItem
                    product={item.product}
                    quantity={item.quantity}
                    />
                </div>) : (<div>Your cart is empty</div>)}
            </div>
            <div className="cart-summary">
                <div>Total price: ${totalPrice}</div>
            </div>
            <div className="">
                <button className='btn btn-danger' onClick={() => handleClearCart()}>Clear cart</button>
                <button className='btn btn-primary' onClick={() => handlePlaceOrder()}>Place an order</button>
            </div>
        </>
    )
}

export default ShoppingCart
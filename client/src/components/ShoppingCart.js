import React, { useContext } from 'react'
import CartItem from './CartItem'
import { CustomerContext } from '../contexts/CustomerContext'
import '../css/order.css'

function ShoppingCart() {
    const {
        shoppingCart,
        totalPrice,
        handleClearCart,
        handlePlaceOrder
    } = useContext(CustomerContext);
    return (
        <>
            <div className='container-cart'>
                <div className= 'container cart-body'>
                    <div className='title'>My shopping cart</div>
                    <div className='content'>
                        <div className="cart-items overflow-auto">
                            {(shoppingCart.length > 0) ? shoppingCart.map((item) => 
                                <div className="p-2" key={item._id}>
                                    <CartItem item={item}/>
                                </div>) : (<div>Your cart is empty</div>)}
                        </div>
                        <div className="cart-summary">
                            <div>Total price: ${totalPrice}</div>
                            <button className='btn btn-danger' onClick={() => handleClearCart()}>Clear cart</button>
                            <button className='btn btn-primary' onClick={() => handlePlaceOrder()}>Place order</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShoppingCart
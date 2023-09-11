import React, { useContext } from 'react';
import { CustomerContext } from '../contexts/CustomerContext';
import OrderCard from './OrderCard';
import '../css/order.css'


function OrderList() {
    const {orders} = useContext(CustomerContext);
    return (
        <div className='container-order'>
            <div className='order-title'>My order list</div>
            {orders.map((order) => <OrderCard key={order._id} items={order.cartItems} order={order}/>)}
        </div>
    )
}

export default OrderList
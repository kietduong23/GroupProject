import React, { useContext } from 'react';
import { CustomerContext } from '../contexts/CustomerContext';
import OrderCard from './OrderCard';

function OrderList() {
    const {orders} = useContext(CustomerContext);
    return (
        <div>
            <h2>My order list</h2>
            {orders.map((order) => <OrderCard key={order._id} items={order.cartItems} order={order}/>)}
        </div>
    )
}

export default OrderList
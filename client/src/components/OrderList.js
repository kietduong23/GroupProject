import React, { useContext } from 'react';
import { CustomerContext } from '../contexts/CustomerContext';
import OrderCard from './OrderCard';

function OrderList() {
    const {orders} = useContext(CustomerContext);
    return (
        <div>
            {orders.map((order) => <OrderCard key={order._id} items={order.cartItems} status={order.status} order={order}/>)}
        </div>
    )
}

export default OrderList
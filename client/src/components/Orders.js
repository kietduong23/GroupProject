import React, { useContext } from 'react';
import { CustomerContext } from '../contexts/CustomerContext';
import OrderCard from './OrderCard';

function Orders() {
    const {orders} = useContext(CustomerContext);
    return (
        <div>
            {orders.map((order) => <OrderCard items={order.items} status={order.status}/>)}
        </div>
    )
}

export default Orders
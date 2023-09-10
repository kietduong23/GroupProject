import React, { useContext } from 'react'
import { CustomerContext } from '../contexts/CustomerContext';

function OrderCard({ items, status, order }) {
    const {acceptOrder, rejectOrder} = useContext(CustomerContext);
    return (
        <div className='card'>
            <div className='card-body'>
                <div className='card-title'>Items:</div>
                {items.map((item) =>
                    <div>
                        <div className='card-text'>
                            Name: {item.product.name}
                        </div>
                        <div className='card-text'>
                            Quantity: {item.quantity}
                        </div>
                    </div>)
                }
                <div className='card-text'>Status: {status}</div>
                <div>
                    {(status === 'Shipped') ? (
                        <div>
                            <button className='btn btn-success' onClick={() => acceptOrder(order._id)}>Accept</button>
                            <button className='btn btn-danger' onClick={() => rejectOrder(order._id)}>Reject</button>
                        </div>
                    ) : (<></>)}
                </div>
            </div>
        </div>
    )
}

export default OrderCard
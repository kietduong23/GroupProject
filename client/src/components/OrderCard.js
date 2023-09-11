import React, { useContext } from 'react'
import { CustomerContext } from '../contexts/CustomerContext';

function OrderCard({ items, order }) {
    const { acceptOrder, rejectOrder } = useContext(CustomerContext);
    return (
        <div className='card'>
            <div className='card-body'>
                <div className='card-title'>Items:</div>
                <div className='d-flex flex-column'>
                    {items.map((item) =>
                        <div key={item._id} className='container mb-2'>
                            <div className='row'>
                                <div className='card-text col'>
                                    Name: {item.product.name}
                                </div>
                                <div className='card-text col'>
                                    Quantity: {item.quantity}
                                </div>
                                <div className='card-text col'>
                                    Status: {item.status}
                                </div>
                                <div className='col-3 col-sm-4'>
                                    {
                                        (() => {
                                            if (item.status === 'shipped')
                                                return <div className=''>
                                                    <button className='btn btn-success me-2' onClick={() => acceptOrder(item._id)}>Accept</button>
                                                    <button className='btn btn-danger' onClick={() => rejectOrder(item._id)}>Reject</button>
                                                </div>
                                            if (item.status === 'new')
                                                return <div><button type="button" class="btn btn-outline-secondary" disabled>Waiting</button></div>
                                            else
                                                return <div><button type="button" class="btn btn-secondary" disabled>Finished</button></div>
                                        })()
                                    }
                                    {/* {(item.status === 'shipped') ? (
                                    <div>
                                        <button className='btn btn-success' onClick={() => acceptOrder(item._id)}>Accept</button>
                                        <button className='btn btn-danger' onClick={() => rejectOrder(item._id)}>Reject</button>
                                    </div>
                                ) : (<div>Waiting</div>)} */}
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default OrderCard
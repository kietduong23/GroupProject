import React from 'react'

function OrderCard({ items, status }) {
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
                            <button className='btn btn-success'>Accept</button>
                            <button className='btn btn-danger'>Reject</button>
                        </div>
                    ) : (<div className=''>Your order has been processed</div>)}
                </div>
            </div>
        </div>
    )
}

export default OrderCard
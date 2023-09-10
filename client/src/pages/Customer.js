import React, { useContext, useEffect, useState } from 'react'
// import RegisterForm from '../components/RegisterForm'
import 'bootstrap/dist/css/bootstrap.css';
import LoginForm from '../components/LoginForm'
import ProductCard from '../components/ProductCard'
import ShoppingCart from '../components/ShoppingCart'
import { ProductContext } from '../contexts/ProductContext'
import { AuthContext } from '../contexts/AuthContext'
import OrderList from '../components/OrderList'
import { CustomerContext } from '../contexts/CustomerContext'
import '../css/customer.css'

function Customer() {
    const { products } = useContext(ProductContext);
    const { authState } = useContext(AuthContext);
    const { handleCustomerLogout } = useContext(CustomerContext)
    const { user } = authState;

    const [spans] = useState([
        { id: 'MobileDevice', text: 'Mobile device' },
        { id: 'Appliances', text: 'Appliances' },
        { id: 'Earphones', text: 'Earphones' },
        { id: 'Clothes', text: 'Clothes' },
    ])

    // active class state
    const [active, setActive] = useState('');

    // category state
    const [category, setCategory] = useState('');

    const [searchKey, setSearchKey] = useState('');

    // handle change ... it will set category and active states
    const handleSpanChange = (individualSpan) => {
        setActive(individualSpan.id);
        setCategory(individualSpan.text);
        doProductFilter(individualSpan.text);
    }

    // filtered products state
    const [filteredProducts, setFilteredProducts] = useState([]);

    // filter function
    const doProductFilter = (text) => {
        if (products.length > 1) {
            const filter = products.filter((product) => product.category === text);
            setFilteredProducts(filter);
        }
        else {
            console.log('no products to filter')
        }
    }

    // return to all products
    const returntoAllProducts = () => {
        setActive('');
        setCategory('');
        setFilteredProducts([]);
    }

    const handleSearchKeyChange = (e) => {
        setSearchKey(e.target.value)
        console.log(e.target.value)
    }

    const handleLogout = () => handleCustomerLogout()

    return (
        <div className='container'>
            {/* <div className='container'>
                <RegisterForm />
            </div> */}
            <div className='container'>
                <LoginForm />
            </div>
            <div className='container'>{(user !== null) ? ('User: ' + user.email) : ('Using as guest')}</div>
            <div className='container'>{(user !== null) ? (<button className='btn btn-primary' onClick={() => handleLogout()}>Log out</button>) : (<></>)}</div>

            <div className='container main'>
                <div className='filter-box'>
                    <h3>Filter by category</h3>
                    <ul>
                        {spans.map((span, index) => (
                            <li key={index} id={span.id}
                                onClick={() => handleSpanChange(span)}
                                className={span.id == active ? active : 'deactive'}>{span.text}</li>
                        ))}
                    </ul>
                    <div className='container search-box'>
                        <input type="text" onChange={handleSearchKeyChange} />
                    </div>
                </div>


                

                {filteredProducts.length > 0 && (
                    <div className='my-products'>
                        <h2>Category: {category}</h2>
                        <button className="btn btn-link" onClick={returntoAllProducts}>Return to All Products</button>
                        <div className="container">
                            <div className='products-box row row-cols-1 row-cols-sm-2 row-cols-lg-3'>
                                {filteredProducts.map(product => (
                                    <div className="p-3" key={product._id}>
                                        <ProductCard className="col" product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {filteredProducts.length < 1 && (
                    <>
                        {products.length > 0 && (
                            <div className='my-products'>
                                <h2>All Products</h2>
                                <div className="container">
                                    <div className='products-box row row-cols-1 row-cols-sm-2 row-cols-lg-3'>
                                        {products.map(product => (
                                            <div className="p-3" key={product._id}>
                                                <ProductCard className="col" product={product} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {products.length < 1 && (
                            <div className='my-products please-wait'>Please wait...</div>
                        )}
                    </>
                )}


                
            </div>

            <div className='container shopping-cart'>
                    <h2>My Shopping Cart</h2>
                    <div className='container'>
                        <div>
                            <ShoppingCart />
                        </div>
                    </div>
                </div>

                <div className='container orders'>
                    <h2>My Order List</h2>
                    <div className='container'>
                        <div>
                            <OrderList />
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Customer
import React, { useEffect, useState } from 'react'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'
import ProductCard from '../components/ProductCard'
import { getAllProducts } from '../api/products'
import ShoppingCart from '../components/ShoppingCart'

function Customer() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const loadProducts = async () => {
            const products = await getAllProducts();
            setProducts(products)
            console.log('Data loaded')
        }
        loadProducts();
    }, [])

    const [spans] = useState([
        { id: 'SmartPhones', text: 'Smart Phones' },
        { id: 'Appliances', text: 'Appliances' },
        { id: 'Earphones', text: 'Earphones' },
        { id: 'Clothes', text: 'Clothes' },
    ])

    // active class state
    const [active, setActive] = useState('');

    // category state
    const [category, setCategory] = useState('');

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

    const [shoppingCart, setShoppingCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const handleAddToCart = (product) => {
        const existingProduct = shoppingCart.find((p) => p.id === product.id);
        if (existingProduct === undefined) {
            const newCart = [...shoppingCart, { ...product, quantity: 1 }];
            setShoppingCart(newCart);
            const newTotal = totalPrice + product.price;
            setTotalPrice(newTotal);
            // console.log(shoppingCart)
        }
    }

    const clearCart = () => {
        setTotalPrice(0)
        setShoppingCart([])
    }

    const handleItemRemove = (itemID) => {
        const newCart = shoppingCart.filter((item) => {
            if (item.id !== itemID) {
                return item;
            } else {
                setTotalPrice(totalPrice - (item.quantity * item.price))
            }

        });
        setShoppingCart(newCart);

        if (newCart.length < 1) {
            setTotalPrice(0)
        }
    }

    const handleItemIncrease = (id) => {
        const newCart = shoppingCart.map((item) => {
            if (item.id === id) {
                setTotalPrice(totalPrice + item.price)
                return ({ ...item, quantity: item.quantity + 1 })
            }
        });
        setShoppingCart(newCart);
    }
    const handleItemDecrease = (id) => {
        const newCart = shoppingCart.map((item) => {
            if (item.id === id) {
                if (item.quantity > 1) {
                    setTotalPrice(totalPrice - item.price)
                }
                return ({ ...item, quantity: (item.quantity > 1) ? (item.quantity - 1) : item.quantity })
            }
        });
        setShoppingCart(newCart);
    }





    return (
        <div className='container filter-products-main-box'>

            {/* <div className='container'>
                <RegisterForm />
            </div>
            <div className='container'>
                <LoginForm />
            </div> */}

            <div className='container filter-box'>
                <h3>Filter by category</h3>
                <ul>
                    {spans.map((span, index) => (
                        <li key={index} id={span.id}
                            onClick={() => handleSpanChange(span)}
                            className={span.id == active ? active : 'deactive'}>{span.text}</li>
                    ))}
                </ul>
            </div>

            <div className='container all-products'>
                {filteredProducts.length > 0 && (
                    <div className='my-products'>
                        <h2>Category: {category}</h2>
                        <button className="btn btn-link" onClick={returntoAllProducts}>Return to All Products</button>
                        <div className="container">
                            <div className='products-box row-cols-1 row-cols-sm-2 row-cols-lg-3'>
                                {filteredProducts.map(product => (
                                    <div className="p-3" key={product.id}>
                                        <ProductCard className="col" product={product} handleAddToCart={handleAddToCart} />
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
                                            <div className="p-3" key={product.id}>
                                                <ProductCard className="col" product={product} handleAddToCart={handleAddToCart} />
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
                {shoppingCart.length > 0 ? (
                    <div className='container'>
                        <div className="overflow-auto border" style={{ maxHeight: '350px' }}>
                            <ShoppingCart
                                products={shoppingCart}
                                handleItemRemove={handleItemRemove}
                                handleItemIncrease={handleItemIncrease}
                                handleItemDecrease={handleItemDecrease}
                                clearCart={clearCart}
                                totalPrice={totalPrice}
                            />
                        </div>
                    </div>
                ) : (<div>Your cart is empty</div>)}

            </div>
        </div>
    );
}

export default Customer
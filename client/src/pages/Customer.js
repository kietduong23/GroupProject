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
            let newTotal = totalPrice + product.price;
            setTotalPrice(newTotal);
            // console.log(shoppingCart)
            saveShoppingCart(newCart, newTotal);
        }
    }

    const handleClearCart = () => {
        setTotalPrice(0);
        setShoppingCart([]);
        localStorage.removeItem("MY_SHOPPING_CART")
    }

    const handleItemRemove = (itemID) => {
        let newTotal = totalPrice;
        const newCart = shoppingCart.filter((item) => {
            if (item.id !== itemID) {
                return item;
            } else {
                newTotal = totalPrice - (item.quantity * item.price);
                setTotalPrice(newTotal);
            }
        });
        setShoppingCart(newCart);
        saveShoppingCart(newCart, newTotal);
        if (newCart.length < 1) {
            setTotalPrice(0);
            localStorage.removeItem("MY_SHOPPING_CART");
        }
    }

    const handleItemIncrease = (id) => {
        let newTotal = totalPrice
        const newCart = shoppingCart.map((item) => {
            if (item.id === id) {
                newTotal = totalPrice + item.price;
                setTotalPrice(newTotal);
                item.quantity = item.quantity + 1;
            }
            return ({ ...item });
        });
        setShoppingCart(newCart);
        saveShoppingCart(newCart, newTotal);
    }
    const handleItemDecrease = (id) => {
        let newTotal = totalPrice;
        const newCart = shoppingCart.map((item) => {
            if (item.id === id) {
                if (item.quantity > 1) {
                    newTotal = totalPrice - item.price;
                    setTotalPrice(newTotal);
                    item.quantity = item.quantity - 1;
                }
            }
            return ({ ...item })
        });
        setShoppingCart(newCart);
        saveShoppingCart(newCart, newTotal)
    }

    const handlePlaceOrder = () => {

    }
    
    // Function to save shopping cart in Local Storage
    const saveShoppingCart = (shoppingCart, totalPrice) => {
        //Create new cart
        const newCart = { items: shoppingCart, totalPrice: totalPrice }
        console.log(newCart)
        // Convert to JSON
        const data = JSON.stringify(newCart);
        // Store new data in Local Storage
        localStorage.setItem("MY_SHOPPING_CART", data);
    }

    const loadShoppingCart = () => {
        if (localStorage.getItem("MY_SHOPPING_CART") !== null) {
            const jsonData = localStorage.getItem("MY_SHOPPING_CART");
            const shoppingCart = JSON.parse(jsonData);
            const items = shoppingCart.items;
            setShoppingCart(items);
        } else {
            setShoppingCart([]);
        }
    }

    useEffect(loadShoppingCart, []);

    return (
        <div className='container'>
            <div className='container'>
                <RegisterForm />
            </div>
            <div className='container'>
                <LoginForm />
            </div>

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
                <div className='container'>
                    <div>
                        <ShoppingCart
                            products={shoppingCart}
                            handleItemRemove={handleItemRemove}
                            handleItemIncrease={handleItemIncrease}
                            handleItemDecrease={handleItemDecrease}
                            handleClearCart={handleClearCart}
                            handlePlaceOrder={handlePlaceOrder}
                            totalPrice={totalPrice}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Customer
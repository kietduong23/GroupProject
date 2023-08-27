import React, { useEffect, useState } from 'react'
import { createContext } from "react";

export const CustomerContext = createContext();

const CustomerContextProvider = ({ children }) => {
    const [shoppingCart, setShoppingCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);


    const [orders, setOrders] = useState([]);

    const SHOPPING_CART_NAME = "MY_SHOPPING_CART";

    const loadShoppingCart = () => {
        if (localStorage.getItem(SHOPPING_CART_NAME) !== null) {
            const jsonData = localStorage.getItem(SHOPPING_CART_NAME);
            const shoppingCart = JSON.parse(jsonData);
            setShoppingCart(shoppingCart);
            let currentTotalPrice = 0;
            shoppingCart.forEach(item => {
                currentTotalPrice += item.product.price * item.quantity;
            });
            setTotalPrice(currentTotalPrice);
        } else {
            setShoppingCart([]);
            setTotalPrice(0);
        }
    }

    useEffect(() => loadShoppingCart, []);

    const saveShoppingCart = (shoppingCart) => {
        console.log(shoppingCart);
        if (shoppingCart.length < 1) {
            localStorage.removeItem(SHOPPING_CART_NAME);
            setTotalPrice(0);
        } else {
            // Convert to JSON
            const cartData = JSON.stringify(shoppingCart);
            // Store new data in Local Storage
            localStorage.setItem(SHOPPING_CART_NAME, cartData);
        }
    }

    const handleAddToCart = (product) => {
        const existingProduct = shoppingCart.find((item) => item.product.id === product.id);
        if (existingProduct === undefined) {
            const newCart = [...shoppingCart, { product: product, quantity: 1 }];
            setShoppingCart(newCart);
            let newTotal = totalPrice + product.price;
            setTotalPrice(newTotal);
            // console.log(shoppingCart)
            saveShoppingCart(newCart);
        }
    }

    const handleClearCart = () => {
        setTotalPrice(0);
        setShoppingCart([]);
        localStorage.removeItem(SHOPPING_CART_NAME);
    }

    const handleItemRemove = (productID) => {
        let newTotal = totalPrice;
        const newCart = shoppingCart.filter((item) => {
            if (item.product.id !== productID) {
                return item;
            } else {
                newTotal = totalPrice - (item.quantity * item.product.price);
                setTotalPrice(newTotal);
                return null;
            }
        });
        setShoppingCart(newCart);
        saveShoppingCart(newCart);
    }

    const handleItemIncrease = (productID) => {
        let newTotal = totalPrice
        const newCart = shoppingCart.map((item) => {
            if (item.product.id === productID) {
                newTotal = totalPrice + item.product.price;
                setTotalPrice(newTotal);
                item.quantity = item.quantity + 1;
            }
            return ({ ...item });
        });
        setShoppingCart(newCart);
        saveShoppingCart(newCart);
    }

    const handleItemDecrease = (productID) => {
        let newTotal = totalPrice;
        const newCart = shoppingCart.map((item) => {
            if (item.product.id === productID) {
                if (item.quantity > 1) {
                    newTotal = totalPrice - item.product.price;
                    setTotalPrice(newTotal);
                    item.quantity = item.quantity - 1;
                }
            }
            return ({ ...item })
        });
        setShoppingCart(newCart);
        saveShoppingCart(newCart);
    }

    const loadOrders = () => {
        //This is for testing
        const orders = [{
            items: [{
                product: { id: 1, name: "iPhone", img: "https://techland.com.vn/wp-content/uploads/2021/09/iphone-13-pink-select-2021.png", price: 1000, description: "Apple iPhone", category: "Smart Phones" },
                quantity: 1
            }],
            status: 'Shipped'
        }]
        setOrders(orders);
    }

    useEffect(() => loadOrders, []);
 
    const handlePlaceOrder = () => {
        const newOrder = {
            items: shoppingCart,
            status: 'New'
        }
        const newOrderList = [...orders, newOrder];
        setOrders(newOrderList);
        setShoppingCart([]);
        saveShoppingCart([]);
        console.log(newOrderList);
    }

    const customerData = {
        shoppingCart,
        totalPrice,
        orders,
        handleAddToCart,
        handleClearCart,
        handleItemRemove,
        handleItemIncrease,
        handleItemDecrease,
        handlePlaceOrder,
        handlePlaceOrder
    }
    return (
        <CustomerContext.Provider value={customerData}>{children}</CustomerContext.Provider>
    )
}

export default CustomerContextProvider
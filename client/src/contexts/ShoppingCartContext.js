import React, { Children, useEffect, useState } from 'react'
import { createContext } from "react";

export const ShoppingCartContext = createContext();

const ShoppingCartContextProvider = ({ children }) => {
    const [shoppingCart, setShoppingCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

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
        // Convert to JSON
        const cartData = JSON.stringify(shoppingCart);
        // Store new data in Local Storage
        localStorage.setItem(SHOPPING_CART_NAME, cartData);
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
            }
        });
        setShoppingCart(newCart);
        saveShoppingCart(newCart);
        if (newCart.length < 1) {
            setTotalPrice(0);
            localStorage.removeItem(SHOPPING_CART_NAME);
        }
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

    const handlePlaceOrder = () => {

    }

    const shoppingCartData = {
        shoppingCart,
        totalPrice,
        handleAddToCart,
        handleClearCart,
        handleItemRemove,
        handleItemIncrease, 
        handleItemDecrease,
        handlePlaceOrder
    }
    return (
        <ShoppingCartContext.Provider value={shoppingCartData}>{children}</ShoppingCartContext.Provider>
    )
}

export default ShoppingCartContextProvider
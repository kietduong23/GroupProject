import React, { useContext, useEffect, useState } from 'react'
import { createContext } from "react";
import axios from 'axios';
import { AuthContext } from './AuthContext';
const API_URL = 'http://localhost:8000';
const SHOPPING_CART_NAME = "MY-SHOPPING-CART";

export const CustomerContext = createContext();

const CustomerContextProvider = ({ children }) => {
    const { authState, doLogout } = useContext(AuthContext);
    const { user } = authState;
    const [shoppingCart, setShoppingCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user !== null) {
            setShoppingCart(user.shoppingCart);
            let currentTotalPrice = 0;
            user.shoppingCart.forEach(item => {
                currentTotalPrice += item.product.price * item.quantity;
            });
            setTotalPrice(currentTotalPrice);
            setOrders(user.orders);
        } else {
            if (localStorage[SHOPPING_CART_NAME]) {
                const jsonData = localStorage.getItem(SHOPPING_CART_NAME);
                const shoppingCart = JSON.parse(jsonData);
                setShoppingCart(shoppingCart);
                let currentTotalPrice = 0;
                shoppingCart.forEach(item => {
                    currentTotalPrice += item.product.price * item.quantity;
                });
                setTotalPrice(currentTotalPrice);
            }
        }
    }, [user])

    const loadShoppingCart = async () => {
        try {
            const res = await axios.get(`${API_URL}/customers/${user._id}/cart`);
            if (res.data.success) {
                setShoppingCart(res.data.shoppingCart)
                console.log(res.data.shoppingCart);
                let currentTotalPrice = 0;
                res.data.shoppingCart.forEach(item => {
                    currentTotalPrice += item.product.price * item.quantity;
                });
                setTotalPrice(currentTotalPrice);
            }
        } catch (error) {
            return { success: false, msg: error.message }
        }
    }

    const handleCustomerLogout = () => {
        doLogout();
        setShoppingCart([]);
        setTotalPrice(0)
        setOrders([])
    }

    const saveShoppingCart = (shoppingCart) => {
        if (shoppingCart.length < 1) {
            localStorage.removeItem(SHOPPING_CART_NAME);
            setTotalPrice(0);
            setShoppingCart([]);
            return;
        }
        setShoppingCart(shoppingCart);
        let currentTotalPrice = 0;
        shoppingCart.forEach(item => {
            currentTotalPrice += item.product.price * item.quantity;
        });
        setTotalPrice(currentTotalPrice);

        // Convert to JSON
        const cartData = JSON.stringify(shoppingCart);
        // Store new data in Local Storage
        localStorage.setItem(SHOPPING_CART_NAME, cartData);

    }

    const handleAddToCart = async (product) => {
        if (user !== null) {
            try {
                const res = await axios.post(`${API_URL}/customers/${user._id}/cart`, { productID: product._id, quantity: 1 })
                if (res.data.success) {
                    saveShoppingCart(res.data.cart);
                    await loadShoppingCart();
                }
                return res.data;
            } catch (error) {
                return { success: false, msg: error.message }
            }
        } else {
            const existingProduct = shoppingCart.find((item) => item.product._id === product._id);
            if (existingProduct === undefined) {
                const newCart = [...shoppingCart, { _id: product._id, product: product, quantity: 1 }];
                saveShoppingCart(newCart);
            }
        }
    }

    const handleClearCart = async () => {
        if (user !== null) {
            try {
                const res = await axios.delete(`${API_URL}/customers/${user._id}/cart`);
                if (res.data.success) {
                    saveShoppingCart([]);
                }
                return res.data;
            } catch (error) {
                return { success: false, msg: error.message }
            }
        } else {
            saveShoppingCart([]);
        }
    }

    const handleItemRemove = async (itemID) => {
        if (user !== null) {
            try {
                const res = await axios.delete(`${API_URL}/customers/${user._id}/cart/${itemID}`);
                if (res.data.success) {
                    const newCart = shoppingCart.filter((item) => {
                        if (item._id !== itemID) {
                            return item;
                        } else {
                            return null;
                        }
                    });
                    saveShoppingCart(newCart);
                }
                return res.data;
            } catch (error) {
                return { success: false, msg: error.message }
            }
        } else {
            const newCart = shoppingCart.filter((item) => {
                if (item._id !== itemID) {
                    return item;
                } else {
                    return null;
                }
            });
            saveShoppingCart(newCart);
        }
    }

    const handleItemIncrease = async (itemID, quantity) => {
        if (user !== null) {
            try {
                const res = await axios.put(`${API_URL}/customers/${user._id}/cart/${itemID}`, { quantity: quantity + 1 });
                if (res.data.success) {
                    const newCart = shoppingCart.map((item) => {
                        if (item._id === itemID) {

                            item.quantity = item.quantity + 1;
                        }
                        return ({ ...item });
                    });
                    saveShoppingCart(newCart);
                }
            } catch (error) {
                return { success: false, msg: error.message }
            }
        } else {
            const newCart = shoppingCart.map((item) => {
                if (item._id === itemID) {
                    item.quantity = item.quantity + 1;
                }
                return ({ ...item });
            });
            saveShoppingCart(newCart);
        }
    }

    const handleItemDecrease = async (itemID, quantity) => {
        if (user !== null) {
            if (quantity > 1) {
                try {
                    const res = await axios.put(`${API_URL}/customers/${user._id}/cart/${itemID}`, { quantity: quantity - 1 });
                    if (res.data.success) {
                        const newCart = shoppingCart.map((item) => {
                            if (item._id === itemID) {
                                item.quantity = item.quantity - 1;
                            }
                            return ({ ...item })
                        });
                        saveShoppingCart(newCart);
                    }
                } catch (error) {
                    return { success: false, msg: error.message }
                }
            }
        } else {
            const newCart = shoppingCart.map((item) => {
                if (item._id === itemID) {
                    if (item.quantity > 1) {
                        item.quantity = item.quantity - 1;
                    }
                }
                return ({ ...item })
            });
            saveShoppingCart(newCart);
        }
    }

    const loadOrders = async () => {
        try {
            const res = await axios.get(`${API_URL}/customers/${user._id}/order`);
            if (res.data.success) {
                setOrders(res.data.orders);
            }
            return res.data;
        } catch (error) {
            return { success: false, msg: error.message }
        }
    }

    const handlePlaceOrder = async () => {
        if (user !== null) {
            try {
                const res = await axios.post(`${API_URL}/orders`, { customerID: user._id });
                if (res.data.success) {
                    saveShoppingCart([]);
                    await loadOrders();
                }
            } catch (error) {
                return { success: false, msg: error.message }
            }
        }
    }

    const acceptOrder = async (itemID) => {
        try {
            const res = await axios.put(`${API_URL}/customers/${user._id}/cart/${itemID}`, { status: "accepted" });
            // const res = await axios.put(`${API_URL}/orders/${orderID}`, { status: "Accepted" });
            if (res.data.success) {
                await loadOrders();
            }
        } catch (error) {
            return { success: false, msg: error.message }
        }
    }

    const rejectOrder = async (itemID) => {
        try {
            const res = await axios.put(`${API_URL}/customers/${user._id}/cart/${itemID}`, { status: "rejected" });
            // const res = await axios.put(`${API_URL}/orders/${orderID}`, { status: "Rejected" });
            if (res.data.success) {
                await loadOrders();
            }
        } catch (error) {
            return { success: false, msg: error.message }
        }
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
        handlePlaceOrder,
        handleCustomerLogout,
        rejectOrder,
        acceptOrder
    }
    return (
        <CustomerContext.Provider value={customerData}>{children}</CustomerContext.Provider>
    )
}

export default CustomerContextProvider
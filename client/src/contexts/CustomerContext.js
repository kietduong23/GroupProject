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
            // if (res.data.shoppingCart.length == 0) {
            //     if (localStorage.getItem(SHOPPING_CART_NAME) !== null) {
            //         const jsonData = localStorage.getItem(SHOPPING_CART_NAME);
            //         const shoppingCart = JSON.parse(jsonData);
            //         setShoppingCart(shoppingCart);
            //         let currentTotalPrice = 0;
            //         shoppingCart.forEach(item => {
            //             currentTotalPrice += item.product.price * item.quantity;
            //         });
            //         setTotalPrice(currentTotalPrice);
            //     } else {
            //         setShoppingCart([]);
            //         setTotalPrice(0);
            //     }
            // } else {
            //     // Convert to JSON
            //     const cartData = JSON.stringify(res.data.shoppingCart);
            //     // Store new data in Local Storage
            //     localStorage.setItem(SHOPPING_CART_NAME, cartData);

            //     setShoppingCart(res.data.shoppingCart);
            //     let currentTotalPrice = 0;
            //     shoppingCart.forEach(item => {
            //         currentTotalPrice += item.product.price * item.quantity;
            //     });
            //     setTotalPrice(currentTotalPrice);
            // }
        } catch (error) {
            return { success: false, msg: error.message }
        }
    }

    // useEffect(() => loadShoppingCart, [user]);
    const handleCustomerLogout = () => {
        doLogout();
        setShoppingCart([]);
        setTotalPrice(0)
        setOrders([])
    }

    const saveShoppingCart = (shoppingCart) => {
        // console.log(shoppingCart);
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

    // const handleAddToCart = (product) => {
    //     const existingProduct = shoppingCart.find((item) => item.product.id === product.id);
    //     if (existingProduct === undefined) {
    //         const newCart = [...shoppingCart, { product: product, quantity: 1 }];
    //         setShoppingCart(newCart);
    //         let newTotal = totalPrice + product.price;
    //         setTotalPrice(newTotal);
    //         // console.log(shoppingCart)
    //         saveShoppingCart(newCart);
    //     }
    // }

    const handleAddToCart = async (product) => {
        try {
            const res = await axios.post(`${API_URL}/customers/${user._id}/cart`, { productID: product._id, quantity: 1 })
            if (res.data.success) {
                const newCartItem = res.data.item;
                // setShoppingCart([...shoppingCart, newCartItem]);
                let newTotal = totalPrice + newCartItem.product.price;
                setTotalPrice(newTotal);
                // saveShoppingCart(newCart);
            }
            return res.data;
        } catch (error) {
            return { success: false, msg: error.message }
        }
    }

    // const handleClearCart = () => {
    //     setTotalPrice(0);
    //     setShoppingCart([]);
    //     localStorage.removeItem(SHOPPING_CART_NAME);
    // }

    const handleClearCart = async () => {
        if (user !== null) {
            try {
                const res = await axios.delete(`${API_URL}/customers/${user._id}/cart`);
                if (res.data.success) {
                    setTotalPrice(0);
                    setShoppingCart([]);
                    localStorage.removeItem(SHOPPING_CART_NAME);
                }
                return res.data;
            } catch (error) {
                return { success: false, msg: error.message }
            }
        }
    }

    // const handleItemRemove = (productID) => {
    //     let newTotal = totalPrice;
    //     const newCart = shoppingCart.filter((item) => {
    //         if (item.product.id !== productID) {
    //             return item;
    //         } else {
    //             newTotal = totalPrice - (item.quantity * item.product.price);
    //             setTotalPrice(newTotal);
    //             return null;
    //         }
    //     });
    //     setShoppingCart(newCart);
    //     saveShoppingCart(newCart);
    // }

    const handleItemRemove = async (itemID) => {
        if (user !== null) {
            try {
                const res = await axios.delete(`${API_URL}/customers/${user._id}/cart/${itemID}`);
                if (res.data.success) {
                    let newTotal = totalPrice;
                    const newCart = shoppingCart.filter((item) => {
                        if (item._id !== itemID) {
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
                return res.data;
            } catch (error) {
                return { success: false, msg: error.message }
            }
        }
    }

    // const handleItemIncrease = (itemID) => {
    //     let newTotal = totalPrice
    //     const newCart = shoppingCart.map((item) => {
    //         if (item.product.id === productID) {
    //             newTotal = totalPrice + item.product.price;
    //             setTotalPrice(newTotal);
    //             item.quantity = item.quantity + 1;
    //         }
    //         return ({ ...item });
    //     });
    //     setShoppingCart(newCart);
    //     saveShoppingCart(newCart);
    // }

    const handleItemIncrease = async (itemID, quantity) => {
        if (user !== null) {
            console.log(itemID);
            try {
                const res = await axios.put(`${API_URL}/customers/${user._id}/cart/${itemID}`, { quantity: quantity + 1 });
                if (res.data.success) {
                    let newTotal = totalPrice
                    const newCart = shoppingCart.map((item) => {
                        if (item._id === itemID) {
                            newTotal = totalPrice + item.product.price;
                            setTotalPrice(newTotal);
                            item.quantity = item.quantity + 1;
                        }
                        return ({ ...item });
                    });
                    setShoppingCart(newCart);
                    saveShoppingCart(newCart);
                }
            } catch (error) {
                // if (error.response.data) {
                //     return error.response.data
                // }
                return { success: false, msg: error.message }
            }
        }
    }

    // const handleItemDecrease = (itemID) => {
    //     let newTotal = totalPrice;
    //     const newCart = shoppingCart.map((item) => {
    //         if (item.product.id === productID) {
    //             if (item.quantity > 1) {
    //                 newTotal = totalPrice - item.product.price;
    //                 setTotalPrice(newTotal);
    //                 item.quantity = item.quantity - 1;
    //             }
    //         }
    //         return ({ ...item })
    //     });
    //     setShoppingCart(newCart);
    //     saveShoppingCart(newCart);
    // }

    const handleItemDecrease = async (itemID, quantity) => {
        if (user !== null) {
            if (quantity > 1) {
                try {
                    const res = await axios.put(`${API_URL}/customers/${user._id}/cart/${itemID}`, { quantity: quantity - 1 });
                    if (res.data.success) {
                        let newTotal = totalPrice;
                        const newCart = shoppingCart.map((item) => {
                            if (item._id === itemID) {
                                newTotal = totalPrice - item.product.price;
                                setTotalPrice(newTotal);
                                item.quantity = item.quantity - 1;
                            }
                            return ({ ...item })
                        });
                        setShoppingCart(newCart);
                        saveShoppingCart(newCart);
                    }
                } catch (error) {
                    return { success: false, msg: error.message }
                }
            }
        }
    }

    // const loadOrders = () => {
    //     //This is for testing
    //     const orders = [{
    //         items: [{
    //             product: { id: 1, name: "iPhone", img: "https://techland.com.vn/wp-content/uploads/2021/09/iphone-13-pink-select-2021.png", price: 1000, description: "Apple iPhone", category: "Smart Phones" },
    //             quantity: 1
    //         }],
    //         status: 'Shipped'
    //     }]
    //     setOrders(orders);
    // }

    const loadOrders = async () => {
        try {
            const res = await axios.get(`${API_URL}/customers/${user._id}/order`);
            if (res.data.success) {
                setOrders(res.data.orders);
            }
            return res.data;
        } catch (error) {
            // if (error.response.data) {
            //     return error.response.data
            // }
            return { success: false, msg: error.message }
        }
    }

    // useEffect(() => loadOrders, [user]);

    // const handlePlaceOrder = () => {
    //     const newOrder = {
    //         items: shoppingCart,
    //         status: 'New'
    //     }
    //     const newOrderList = [...orders, newOrder];
    //     setOrders(newOrderList);
    //     setShoppingCart([]);
    //     saveShoppingCart([]);
    //     console.log(newOrderList);
    // }

    const handlePlaceOrder = async () => {
        if (user !== null) {
            try {
                const res = await axios.post(`${API_URL}/orders`, { customerID: user._id });
                if (res.data.success) {
                    const newOrderList = [...orders, res.data.newOrder];
                    // setOrders(newOrderList);
                    setShoppingCart([]);
                    saveShoppingCart([]);
                    console.log(newOrderList);
                    loadOrders();
                }
            } catch (error) {
                // if (error.response.data) {
                //     return error.response.data
                // }
                return { success: false, msg: error.message }
            }
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
        handleCustomerLogout
    }
    return (
        <CustomerContext.Provider value={customerData}>{children}</CustomerContext.Provider>
    )
}

export default CustomerContextProvider
import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import { Outlet } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8000';


export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        try {
            const res = await axios.get(`${API_URL}/products`);
            setProducts(res.data.products);
        } catch (error) {
            return {success: false, msg: error.message};
        }
    }

    useEffect(() => loadProducts, []);

    const productContextData = {products};

    return (
        <ProductContext.Provider value={productContextData}><Outlet/></ProductContext.Provider>
    )
}

export default ProductContextProvider
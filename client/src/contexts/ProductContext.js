import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import { getAllProducts } from '../api/products'



export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const loadProducts = async () => {
        const res = await getAllProducts();
        setProducts(res);
        console.log('Products loaded');
    }

    useEffect(() => loadProducts, []);

    const productContextData = {products};

    return (
        <ProductContext.Provider value={productContextData}>{children}</ProductContext.Provider>
    )
}

export default ProductContextProvider
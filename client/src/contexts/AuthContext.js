import React, { useState } from 'react'
import { createContext } from "react";
import { doLogin } from '../api/customers';
import axios from 'axios';
const API_URL = 'http://localhost:8000';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        isAuthenticated: false,
        loading: true
    })
    
    const doCustomerLogin = async (loginData) => {
        try {
            const res = await axios.post(`${API_URL}/auth/login/customer`, loginData);
            if (res.data.success) {
                setAuthState({
                    user: res.data.customer,
                    isAuthenticated: true,
                    loading: false
                })
            }
            return { success: true, message: "Successfully logged in" }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }
    const authData = { authState, doCustomerLogin }
    
    return (
        <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
    )
}

export default AuthContextProvider
import React, { useState } from 'react'
import { createContext } from "react";
import { doLogin } from '../api/customers';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        isAuthenticated: false,
        loading: true
    })
    
    const doCustomerLogin = async (loginData) => {
        try {
            console.log("Checking customer login...");
            const res = await doLogin(loginData);
            if (res.success) {
                setAuthState({
                    user: res.customer,
                    isAuthenticated: true,
                    loading: false
                })
            }
            console.log(res);
            return res;
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
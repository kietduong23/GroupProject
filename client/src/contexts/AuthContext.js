import React, { useState, useEffect } from 'react'
import { createContext } from "react";
import axios from 'axios';
const API_URL = 'http://localhost:8000';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        isAuthenticated: false,
        loading: true
    })
    const WEB_TOKEN_NAME = "USER-TOKEN"

    const setUserToken = (token) => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        } else {
            delete axios.defaults.headers.common['Authorization']
        }
    }

    const doAuthenticate = async () => {
        try {
            if (localStorage[WEB_TOKEN_NAME]) {
                setUserToken(localStorage[WEB_TOKEN_NAME])
            }
            const res = await axios.get(`${API_URL}/auth`)
            if (res.data.success) {
                // console.log('Authenticated')
                setAuthState({...authState, isAuthenticated: true, user: res.data.user, loading: false})
            }
        } catch (error) {
            localStorage.removeItem(WEB_TOKEN_NAME)
            setUserToken(null)
            setAuthState({...authState, isAuthenticated: false, user: null, loading: false})
        }
    }

    const doCustomerLogin = async (loginData) => {
        try {
            const res = await axios.post(`${API_URL}/auth/login/customer`, loginData);
            if (res.data.success) {
                localStorage.setItem(WEB_TOKEN_NAME, res.data.accessToken)
            }
            await doAuthenticate()
            return { success: true, message: "Successfully logged in" }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const doLogout = () => {
        localStorage.removeItem(WEB_TOKEN_NAME)
        setAuthState({...authState, isAuthenticated: false, user: null, loading: false})
    }

    useEffect(() => doAuthenticate, [])

    const authData = { authState, doCustomerLogin, doLogout }
    
    return (
        <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
    )
}

export default AuthContextProvider
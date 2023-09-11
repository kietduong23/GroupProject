import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Customer from './pages/Customer';
import ProductsContextProvider from './contexts/ProductContext';
import CustomerContextProvider from './contexts/CustomerContext';
import AuthContextProvider from './contexts/AuthContext';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from './components/LoginForm';


const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthContextProvider />,
    children: [
      {
        path: "/customer",
        element: <ProductsContextProvider><CustomerContextProvider><Customer /></CustomerContextProvider></ProductsContextProvider>,
      },
      {
        path: "/login",
        element: <LoginForm/>,
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);


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
import ShoppingCart from './components/ShoppingCart';
import OrderList from './components/OrderList';


const router = createBrowserRouter([
  {
    // path: "/",
    element: <AuthContextProvider />,
    children: [
      {
        path: "/",
        element: <ProductsContextProvider />,
        children: [
          {
            path: "/",
            element: <CustomerContextProvider />,
            children: [
              {
                path: "/",
                element: <Customer />
              },
              {
                path: "/customer/cart",
                element: <ShoppingCart />
              },
              {
                path: "/customer/orders",
                element: <OrderList/>
              }
            ]
          }
        ]
      },
      {
        path: "/login",
        element: <LoginForm />,
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


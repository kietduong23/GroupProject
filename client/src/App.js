import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Customer from './pages/Customer';
import ProductsContextProvider from './contexts/ProductContext';
import ShoppingCartContextProvider from './contexts/ShoppingCartContext';
import AuthContextProvider from './contexts/AuthContext';

function App() {
  return (
    <>
      <AuthContextProvider>
        <ProductsContextProvider>
          <ShoppingCartContextProvider>
            <Customer />
          </ShoppingCartContextProvider>
        </ProductsContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;

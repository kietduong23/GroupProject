import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Customer from './pages/Customer';
import ProductsContextProvider from './contexts/ProductContext';
import ShoppingCartContextProvider from './contexts/ShoppingCartContext';

function App() {
  return (
    <>
      <ProductsContextProvider>
        <ShoppingCartContextProvider>
          <Customer />
        </ShoppingCartContextProvider>
      </ProductsContextProvider>
    </>
  );
}

export default App;

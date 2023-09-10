import './App.css';
import './css/customer.css'
import 'bootstrap/dist/css/bootstrap.css';
import Customer from './pages/Customer';
import ProductsContextProvider from './contexts/ProductContext';
import CustomerContextProvider from './contexts/CustomerContext';
import AuthContextProvider from './contexts/AuthContext';

function App() {
  return (
    <>
      <AuthContextProvider>
        <ProductsContextProvider>
          <CustomerContextProvider>
            <Customer />
          </CustomerContextProvider>
        </ProductsContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;

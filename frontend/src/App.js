import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './pages/HomeScreen';
import ProductPage from './pages/ProductPage';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfilePage from './pages/ProfilePage';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import PrivateRoute from './components/PrivateRoute';
import Order from './pages/Order';

const App = () => {
 return (
  <>
   <Router>
    <Header />
    <main>
     <Container>
      <Routes>
       <Route path='/' element={<HomeScreen />} />
       <Route path='/product/:productId' element={<ProductPage />} />
       <Route path='/cart/:productId' element={<CartPage />} />
       <Route path='/cart' element={<CartPage />} />
       <Route path='/login' element={<Login />} />
       <Route path='/register' element={<Register />} />
       <Route path='/shipping' element={<Shipping />} />
       <Route path='/payment' element={<Payment />} />
       <Route path='/placeOrder' element={<PlaceOrder />} />
       <Route path='/order/:orderId' element={<Order />} />
       <Route path='/profile' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfilePage />} />
       </Route>
       <Route path='/shipping' element={<PrivateRoute />}>
        <Route path='/shipping' element={<Shipping />} />
       </Route>
      </Routes>
     </Container>
    </main>
    <Footer />
   </Router>
   <ToastContainer />
  </>
 );
};

export default App;

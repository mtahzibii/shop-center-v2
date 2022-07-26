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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
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
       <Route path='/profile' element={<ProfilePage />} />
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

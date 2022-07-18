import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './pages/HomeScreen';
import ProductPage from './pages/ProductPage';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

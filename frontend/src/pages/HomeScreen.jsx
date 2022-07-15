import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import products from '../products';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';

const HomeScreen = () => {
 const API_URI = 'http://localhost:5000/api/products';
 const [products, setProducts] = useState([]);

 useEffect(() => {
  // Fetch products
  const fetchProducts = async (API_URI) => {
   const { data } = await axios.get(API_URI);
   setProducts(data);
  };

  fetchProducts(API_URI);
 }, []);

 //  const products = fetchProducts(API_URI);
 //  console.log(products);

 return (
  <>
   <h1 className='my-5'>Latest Products</h1>
   <Row>
    {products.map((product) => (
     <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
      <Product product={product} />
     </Col>
    ))}
   </Row>
  </>
 );
};

export default HomeScreen;

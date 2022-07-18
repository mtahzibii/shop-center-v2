import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { reset } from '../features/products/productSlice';

const HomeScreen = () => {
 const dispatch = useDispatch();

 // Get product's states from store
 const { products, isLoading, isError, message, isSuccess } = useSelector(
  (state) => state.product
 );

 //  Check error and success as page loads
 useEffect(() => {
  if (isError) {
   toast.error(message);
  }
 }, [isSuccess, isError, message, dispatch]);

 //  list products as page loads
 useEffect(() => {
  // Fetch products action
  dispatch(fetchProducts());
  dispatch(reset());
 }, [dispatch]);

 if (isLoading) {
  return <Spinner />;
 }

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

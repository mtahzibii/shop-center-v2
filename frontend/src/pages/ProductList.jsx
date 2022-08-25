import React, { useEffect } from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { ReactComponent as TrashIcon } from '../assets/trash.svg';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct } from '../features/products/productSlice';
import { useNavigate } from 'react-router-dom';
import { reset } from '../features/products/productSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import Message from '../components/Message';

const ProductList = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const { products, isLoading, isSuccess, isError, product } = useSelector(
  (state) => state.product
 );
 const { user } = useSelector((state) => state.user);

 useEffect(() => {
  if (isError) {
   toast.error('Unable to fetch products');
  }

  if (user && user.isAdmin) {
   dispatch(fetchProducts());
  } else if (!user) {
   navigate('/login');
  }
 }, [dispatch, navigate, user, isError]);

 //  Prevent access for non-admin users
 if (user && !user.isAdmin) {
  return (
   <Message variant='danger'>
    <p className='fw-bold fs-4'>Access Denied.</p>
    Administrative Privileges required.
   </Message>
  );
 }

 const onDeleteHandler = (productId) => {
  if (window.confirm(`Are you sure you want to delete this product?`)) {
   dispatch(deleteProduct(productId));
  }
 };

 if (isLoading) {
  return <Spinner />;
 }

 return (
  <div>
   <Row className='d-flex justify-content-between mt-4'>
    <Col lg={2} style={{ margin: '10px 0', padding: '5px 0' }}>
     <h2>Products</h2>
    </Col>
    <Col lg={2} style={{ margin: '10px 0', padding: '5px 0' }}>
     <Button
      style={{ background: '#449056', borderRadius: '5px' }}
      onClick={() => {
       navigate('/admin/products/new-product');
       dispatch(reset());
      }}
     >
      <i className='fas fa-plus '></i> Create Product
     </Button>
    </Col>
   </Row>
   <Row>
    <Table
     striped
     bordered
     hover
     size='sm'
     className='mt-4'
     style={{ fontSize: '14px' }}
    >
     <thead className='fw-bold text-center ' style={{ color: 'blue' }}>
      <tr>
       <td style={{ width: '200px' }}>ID</td>
       <td style={{ width: '400px' }}>Name</td>
       <td style={{ width: '100px', textAlign: 'center' }}>Price</td>
       <td style={{ width: '100px' }}>Category</td>
       <td style={{ width: '120px' }}>Brand</td>
       <td>Action</td>
      </tr>
     </thead>
     <tbody>
      {products &&
       products.map((product) => (
        <tr key={product._id}>
         <td>{product._id}</td>
         <td>{product.name}</td>
         <td>{product.price}</td>
         <td>{product.category}</td>
         <td>{product.brand}</td>
         <td className='d-flex justify-content-center' style={{ padding: '3px' }}>
          <LinkContainer
           to={`/admin/products/${product._id}`}
           style={{ background: 'none', borderRadius: '5px', color: 'black' }}
          >
           <Button>
            <i className='fas fa-edit' style={{ fontSize: '15px' }}></i>
           </Button>
          </LinkContainer>
          <Button
           variant='light'
           className='ml-5'
           style={{
            height: '40px',
            marginLeft: '20px',
            borderRadius: '5px',
            background: 'none',
            width: '40px',
           }}
           onClick={() => onDeleteHandler(product._id)}
          >
           <TrashIcon style={{ color: 'red' }} />
          </Button>
         </td>
        </tr>
       ))}
     </tbody>
    </Table>
   </Row>
  </div>
 );
};

export default ProductList;

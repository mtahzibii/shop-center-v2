import React, { useEffect } from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { ReactComponent as TrashIcon } from '../assets/trash.svg';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const { products, isLoading } = useSelector((state) => state.product);

 useEffect(() => {
  dispatch(fetchProducts());
 }, []);

 const onDeleteHandler = () => {};

 return (
  <div>
   <Row className='d-flex justify-content-between mt-4'>
    <Col lg={2} style={{ margin: '10px 0', padding: '5px 0' }}>
     <h1>Products</h1>
    </Col>
    <Col lg={2} style={{ margin: '10px 0', padding: '5px 0' }}>
     <Button
      style={{ background: '#449056', borderRadius: '5px' }}
      onClick={() => navigate('/admin/products/new-product')}
     >
      <i className='fas fa-plus '></i> Create Product
     </Button>
    </Col>
   </Row>
   <Row>
    <Table striped bordered hover size='sm' className='mt-4'>
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
         <td className='d-flex justify-content-center'>
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
           onClick={onDeleteHandler}
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

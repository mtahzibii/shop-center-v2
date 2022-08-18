import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts, fetchProducts } from '../features/products/productSlice';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();

 const submitHandler = (e) => {
  e.preventDefault();

  const keyword = document.getElementById('searchField').value;

  if (keyword.trim()) {
   dispatch(searchProducts(keyword));
  } else {
   dispatch(fetchProducts());
  }
 };

 return (
  <div>
   <Form className='d-flex' style={{ marginLeft: '50px' }} onSubmit={submitHandler}>
    <Form.Control
     id='searchField'
     type='search'
     placeholder='Search'
     className='me-2'
     style={{ height: '45px', width: '300px' }}
     //  onChange={searchHandler}
    />
    <Button variant='outline-success' style={{ height: '45px' }} type='submit'>
     Search
    </Button>
   </Form>
  </div>
 );
};

export default SearchBox;

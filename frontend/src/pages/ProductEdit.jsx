import React, { useEffect, useState } from 'react';
import { MDBFile } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../features/products/productSlice';
import { updateProduct } from '../features/products/productSlice';
import Spinner from '../components/Spinner';

const ProductEdit = () => {
 const { productId } = useParams();
 const dispatch = useDispatch();

 const { product, isLoading, isSuccess } = useSelector((state) => state.product);

 const [productData, setProductData] = useState({
  name: '',
  price: '0',
  image: '',
  brand: '',
  countInStock: '0',
  category: '',
  description: '',
 });

 useEffect(() => {
  if (!product || product._id !== productId) {
   dispatch(fetchProduct(productId));
  }
 }, [dispatch, productId]);

 useEffect(() => {
  if (isSuccess && product._id === productId)
   setProductData({
    name: product?.name,
    price: product?.price,
    image: product?.image,
    brand: product?.brand,
    countInStock: product?.countInStock,
    category: product?.category,
    description: product?.description,
   });
 }, [product, productId, product]);

 const editProductHandler = (e) => {
  e.preventDefault();

  const updatedProductData = {
   _id: productId,
   name: productData.name,
   price: productData.price,
   image: productData.image,
   brand: productData.brand,
   countInStock: productData.countInStock,
   category: productData.category,
   description: productData.description,
  };

  dispatch(updateProduct(updatedProductData));
  toast.success('Product info successfully updated. Reload the page');
 };

 const onChangeHandler = (e) => {
  setProductData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
 };

 if (isLoading) {
  return <Spinner />;
 }

 return (
  <div>
   <Link to='/admin/products' className='btn btn-light my-3 fw-bold fs-5'>
    Go Back
   </Link>
   <FormContainer>
    <h1 className='mb-2'>Edit Product</h1>
    <Form>
     <FormGroup className='mt-5'>
      <FormLabel className='fw-bold'>Name</FormLabel>
      <FormControl
       type='text'
       id='name'
       value={productData.name}
       onChange={onChangeHandler}
      ></FormControl>
     </FormGroup>

     <FormGroup className='mt-3'>
      <FormLabel className='fw-bold'>Price ($)</FormLabel>
      <FormControl
       type='number'
       id='price'
       value={productData.price}
       onChange={onChangeHandler}
      ></FormControl>
     </FormGroup>

     <FormGroup className='mt-3'>
      <FormLabel className='fw-bold'>Image</FormLabel>
      <MDBFile id='customFile' />
     </FormGroup>

     <FormGroup className='mt-3'>
      <FormLabel className='fw-bold'>Brand</FormLabel>
      <FormControl
       id='brand'
       value={productData.brand}
       onChange={onChangeHandler}
      ></FormControl>
     </FormGroup>

     <FormGroup className='mt-3'>
      <FormLabel className='fw-bold'>Count in Stock</FormLabel>
      <FormControl
       type='number'
       id='countInStock'
       value={productData.countInStock}
       onChange={onChangeHandler}
      ></FormControl>
     </FormGroup>

     <FormGroup className='mt-3'>
      <FormLabel className='fw-bold'>Category</FormLabel>
      <FormControl
       type='text'
       id='category'
       value={productData.category}
       onChange={onChangeHandler}
      ></FormControl>
     </FormGroup>

     <FormGroup className='mt-3'>
      <FormLabel className='fw-bold'>Description</FormLabel>
      <FormControl
       type='text'
       id='description'
       value={productData.description}
       onChange={onChangeHandler}
      ></FormControl>
     </FormGroup>

     <Button className='my-5' onClick={editProductHandler}>
      Update
     </Button>
    </Form>
   </FormContainer>
  </div>
 );
};

export default ProductEdit;

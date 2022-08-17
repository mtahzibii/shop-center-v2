import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MDBFile } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../features/products/productSlice';
import { updateProduct } from '../features/products/productSlice';
import Spinner from '../components/Spinner';
import { createProduct } from '../features/products/productSlice';
const API_URL = 'http://localhost:5000/api/upload';

const NewProduct = () => {
 const navigate = useNavigate();
 const { productId } = useParams();
 const dispatch = useDispatch();

 const { product, isLoading, isSuccess, isError } = useSelector(
  (state) => state.product
 );

 //  useEffect(() => {
 //   if (isError) {
 //    toast.error('Failed to create product');
 //   }

 //   if (product) {
 //    navigate('/admin/products');
 //   }
 //  }, []);

 const [image, setImage] = useState('');
 const [uploading, setUploading] = useState(false);
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
  if (isSuccess && product._id === productId)
   setProductData({
    name: product?.name ? product.name : '',
    price: product?.price ? product.price : '',
    image: product?.image ? product.image : '',
    brand: product?.brand ? product.brand : '',
    countInStock: product?.countInStock ? product.countInStock : '',
    category: product?.category ? product.category : '',
    description: product?.description ? product.description : '',
   });
 }, [product, productId, product]);

 const createProductHandler = (e) => {
  e.preventDefault();

  const newProduct = {
   name: productData.name,
   price: productData.price,
   image: productData.image,
   brand: productData.brand,
   countInStock: productData.countInStock,
   category: productData.category,
   description: productData.description,
  };

  dispatch(createProduct(newProduct));
  if (isSuccess) {
   navigate('/admin/products');
   toast.success('New product successfully created. Reload the page.');
  }
 };

 const uploadFileHandler = async (e) => {
  e.preventDefault();

  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('image', file);
  setUploading(true);

  try {
   const config = {
    headers: {
     'Content-Type': 'multipart/form-data',
    },
   };

   const { data } = await axios.post(API_URL, formData, config);

   setProductData((prevState) => ({ ...prevState, image: data }));
   setUploading(false);
  } catch (error) {
   console.error(error);
   setUploading(false);
  }
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
    <h1 className='mb-2'>New Product</h1>
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
      <MDBFile id='customFile' type='file' onChange={uploadFileHandler} />
      {uploading && <Spinner />}
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

     <Button className='my-5' onClick={createProductHandler}>
      Create Product
     </Button>
    </Form>
   </FormContainer>
  </div>
 );
};

export default NewProduct;

import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import {
 Row,
 Col,
 Image,
 ListGroup,
 Card,
 Button,
 Form,
 ListGroupItem,
 FormLabel,
 FormControl,
 FormSelect,
 FormGroup,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { addToCart } from '../features/carts/cartSlice';
import Message from '../components/Message';
import { setProductReview } from '../features/products/productSlice';

const ProductPage = () => {
 const [qty, setQty] = useState(1);
 const [rating, setRating] = useState('');
 const [comment, setComment] = useState('');
 const { productId } = useParams();
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const { product, isError, message, isLoading } = useSelector(
  (state) => state.product
 );

 const { user } = useSelector((state) => state.user);

 useEffect(() => {
  if (!product || product._id !== productId) {
   dispatch(fetchProduct(productId));
  }

  if (isError) {
   toast.error(message);
  }
 }, [productId, message, isError, dispatch, product, isLoading]);

 const reviewSubmitHandler = (e) => {
  e.preventDefault();

  const review = {
   comment,
   rating,
   productId: product._id,
  };

  dispatch(setProductReview(review));
 };

 const addToCartHandler = (e) => {
  e.preventDefault();

  const updatedProductInfo = { ...product, qty };

  dispatch(addToCart(updatedProductInfo));
  navigate(`/cart/${productId}?qty=${qty}`);
 };

 if (isLoading || !product.reviews) {
  return <Spinner />;
 }

 return (
  <>
   <Link className='btn btn-dark mt-5' to='/'>
    Go Back
   </Link>

   <main>
    <Row className='mt-3'>
     <Col md={6} sm={12} lg={5}>
      <Image src={product.image} alt={product.name} fluid className='pt-0' />
     </Col>
     <Col lg={4} className='pt-0'>
      <ListGroup variant='flush'>
       <ListGroup.Item>
        <h3>{product.name}</h3>
       </ListGroup.Item>
       <ListGroup.Item>
        {<Rating value={product.rating} text={`${product.numReviews} reviews`} />}
       </ListGroup.Item>
       <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
       <ListGroup.Item>Description{product.description}</ListGroup.Item>
      </ListGroup>
     </Col>
     <Col md={3}>
      <Card>
       <ListGroup>
        <ListGroupItem>
         <Row>
          <Col>Price:</Col>
          <Col>${product.price}</Col>
         </Row>
        </ListGroupItem>
        <ListGroupItem>
         <Row>
          <Col>Status:</Col>
          <Col>
           {product.countInStock > 0 ? product.countInStock : 'Out of stock'}
          </Col>
         </Row>
        </ListGroupItem>
        {product.countInStock > 0 && (
         <ListGroupItem>
          <Row>
           <Col>Qty:</Col>
           <Col>
            <Form.Control
             as='select'
             value={qty}
             onChange={(e) => setQty(+e.target.value)}
            >
             {[...Array(product.countInStock).keys()].map((item) => (
              <option key={item + 1} value={item + 1}>
               {item + 1}
              </option>
             ))}
            </Form.Control>
           </Col>
          </Row>
         </ListGroupItem>
        )}
        <ListGroupItem className='d-grid'>
         <Button
          variant='primary'
          className='btn-block rounded'
          type='button'
          disabled={product.countInStock === 0}
          onClick={addToCartHandler}
         >
          ADD TO CART
         </Button>
        </ListGroupItem>
       </ListGroup>
      </Card>
     </Col>
    </Row>
    <Row className='mt-5'>
     <Col lg={6}>
      <h3>Reviews</h3>
      {!product || product?.reviews?.length === 0 ? (
       <Message variant='info'>No reviews</Message>
      ) : (
       <ListGroup variant='flush'>
        {product.reviews.map((review) => (
         <ListGroupItem key={review._id}>
          <strong>{review.name}</strong>
          {<Rating value={review.rating} />}
          <p>{review.createdAt.substring(0, 10)}</p>
          <p>{review.comment}</p>
         </ListGroupItem>
        ))}
       </ListGroup>
      )}

      {!user ? (
       <Message variant='danger'>Please login in to write a review</Message>
      ) : (
       <Form onSubmit={reviewSubmitHandler} className='my-5'>
        <FormGroup id='rating'>
         <FormLabel className='font-weight-bold fs-5'>Rating</FormLabel>
         <FormSelect
          size='sm'
          onChange={(e) => setRating(e.target.value)}
          value={rating}
         >
          <option defaultValue='true'>Select ...</option>
          <option value='1'>1- Poor</option>
          <option value='2'>2- Fair</option>
          <option value='3'>3- Good</option>
          <option value='4'>4- Very Good</option>
          <option value='5'>5- Excellent</option>
         </FormSelect>
        </FormGroup>
        <FormGroup id='comment'>
         <Form.Label className='font-weight-bold mt-4'>Comment</Form.Label>
         <FormControl
          as='textarea'
          row='4'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
         ></FormControl>
        </FormGroup>
        <Button type='submit' className='mt-4' size='sm'>
         Submit Review
        </Button>
       </Form>
      )}
     </Col>
    </Row>
   </main>
  </>
 );
};

export default ProductPage;

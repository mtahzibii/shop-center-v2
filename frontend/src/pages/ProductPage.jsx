import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { reset } from '../features/products/productSlice';
import {
 Row,
 Col,
 Image,
 ListGroup,
 Card,
 Button,
 Form,
 ListGroupItem,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { addToCart } from '../features/carts/cartSlice';

const ProductPage = () => {
 const [qty, setQty] = useState(1);
 const { productId } = useParams();
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const { product, isError, message, isLoading } = useSelector(
  (state) => state.product
 );

 useEffect(() => {
  if (isError) {
   toast.error(message);
  }
  dispatch(fetchProduct(productId));
 }, [productId, message, isError, dispatch]);

 const addToCartHandler = (e) => {
  e.preventDefault();

  const updatedProductInfo = { ...product, qty };
  dispatch(addToCart(updatedProductInfo));
  navigate(`/cart/${productId}?qty=${qty}`);
 };

 if (isLoading) {
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
   </main>
  </>
 );
};

export default ProductPage;

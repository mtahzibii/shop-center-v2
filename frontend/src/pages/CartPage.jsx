import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
 Row,
 Col,
 ListGroup,
 Image,
 Form,
 Button,
 Card,
 ListGroupItem,
} from 'react-bootstrap';
// import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../features/carts/cartSlice';

const CartPage = () => {
 const { cartItems, isLoading } = useSelector((state) => state.cart);

 const dispatch = useDispatch();

 const navigate = useNavigate();

 const [qty, setQty] = useState(1);

 //  useEffect(() => {
 //   console.log(cartItems);
 //  }, []);

 const removeFromCartHandler = (itemId) => {
  dispatch(removeFromCart(itemId));
 };

 const checkoutHandler = () => {
  navigate('/login?redirect=shipping');
 };

 const updateItemQty = (item, qty) => {
  const product = { ...item, qty };
  dispatch(addToCart(product));
 };

 if (isLoading) {
  return <Spinner />;
 }

 return (
  <Row className='mt-4'>
   <Col lg={8}>
    <h1>Shopping Cart</h1>

    {cartItems.length === 0 ? (
     <Message>
      Your cart is empty <Link to='/'>Go Back</Link>
     </Message>
    ) : (
     <ListGroup variant='flush'>
      {cartItems.map((item) => (
       <ListGroupItem key={item._id}>
        <Row className='cartItems'>
         <Col md={2}>
          <Image src={item.image} alt={item.name} fluid rounded />
         </Col>
         <Col md={3}>
          <Link className='cartItem' to={`/product/${item._id}`}>
           {item.name}
          </Link>
         </Col>
         <Col>${item.price}</Col>
         <Col>
          <Form.Control
           as='select'
           value={item.qty}
           onChange={(e) => updateItemQty(item, e.target.value)}
          >
           {[...Array(item.countInStock).keys()].map((count) => (
            <option key={count + 1} value={count + 1}>
             {count + 1}
            </option>
           ))}
          </Form.Control>
         </Col>
         <Col md={2}>
          <Button
           type='button'
           variant='light'
           onClick={() => removeFromCartHandler(item._id)}
          >
           <i className='fas fa-trash'></i>
          </Button>
         </Col>
        </Row>
       </ListGroupItem>
      ))}
     </ListGroup>
    )}
   </Col>
   <Col lg={4} className='mt-2'>
    <Card className='mt-5'>
     <ListGroup variant='flush'>
      <ListGroupItem>
       <Row>
        <div
         style={{
          textAlign: 'center',
          fontSize: '22px',
          fontWeight: 'bold',
         }}
        >
         Subtotal: {cartItems.reduce((acc, curr) => acc + Number(curr.qty), 0)} Items
        </div>
       </Row>
      </ListGroupItem>
      <ListGroupItem>
       <Row>
        <div
         style={{
          textAlign: 'center',
          fontSize: '22px',
          fontWeight: 'bold',
         }}
        >
         Total Price: ${' '}
         {cartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0).toFixed(2)}
        </div>
       </Row>
      </ListGroupItem>
      <ListGroupItem>
       <Row>
        <Button
         style={{ fontWeight: 'bold', fontSize: '18px' }}
         type='btn-block'
         disabled={cartItems.length === 0}
         onClick={checkoutHandler}
        >
         Proceed to Checkout
        </Button>
       </Row>
      </ListGroupItem>
     </ListGroup>
    </Card>
   </Col>
  </Row>
 );
};

export default CartPage;

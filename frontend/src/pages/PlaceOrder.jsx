import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import {
 Row,
 Col,
 Button,
 Card,
 ListGroup,
 Image,
 ListGroupItem,
} from 'react-bootstrap';
import Message from '../components/Message';
import { orderPricingDetails } from '../features/carts/cartSlice';
import { setOrder } from '../features/orders/orderSlice';
import Spinner from '../components/Spinner';

const PlaceOrder = () => {
 const { user } = useSelector((state) => state.user);
 const { cartItems, shippingAddress, paymentMethod } = useSelector(
  (state) => state.cart
 );

 const { order, isLoading, isSuccess } = useSelector((state) => state.order);

 const dispatch = useDispatch();
 const navigate = useNavigate();

 useEffect(() => {
  if (isSuccess) {
   navigate(`/order/${order._id}`);
  }
  // eslint-disable-next-line
 }, [isSuccess, navigate]);

 useEffect(() => {
  if (!user) {
   navigate('/login');
  }
 }, [user, navigate]);

 //  Add decimal to float numbers
 const toDecimal = (number) => {
  return Math.round((number * 100) / 100).toFixed(2);
 };

 //  Total price of cart items
 const itemsPrice = +toDecimal(
  cartItems.reduce((acc, curr) => acc + curr.qty * curr.price, 0)
 );
 const shippingPrice = itemsPrice > 100 ? 0 : 100;
 const taxPrice = +toDecimal(+(itemsPrice * 0.15).toFixed(2));
 const totalPrice = toDecimal(itemsPrice + shippingPrice + taxPrice);

 useEffect(() => {
  const pricingDetails = {
   shippingPrice,
   taxPrice,
   totalPrice,
  };
  dispatch(orderPricingDetails(pricingDetails));
  // eslint-disable-next-line
 }, []);

 const placeOrderHandler = (e) => {
  e.preventDefault();

  const orderDetails = {
   orderItems: cartItems,
   shippingAddress,
   paymentMethod,
   shippingPrice,
   taxPrice,
   totalPrice,
  };

  // Dispatch reducer
  dispatch(setOrder(orderDetails));
  // navigate(`/order/${order._id}`);
 };

 if (isLoading) {
  return <Spinner />;
 }

 return (
  <>
   <div>
    <CheckoutSteps step1 step2 step3 step4 />
   </div>
   <Row className='mt-4'>
    <Col lg={8}>
     <ListGroup variant='flush'>
      <ListGroupItem className='mb-3'>
       <h3 className='mb-2'>Shipping</h3>
       <p className='mb-3'>
        <span className='fw-bold '>Address</span>: {shippingAddress.address},{' '}
        {shippingAddress.city}, {shippingAddress.country}
       </p>
      </ListGroupItem>
      <ListGroupItem>
       <h3 className='mb-2'>Payment Method</h3>
       <p className='mb-3'>
        <span className='fw-bold'>Method:</span> {paymentMethod}
       </p>
      </ListGroupItem>
      <ListGroupItem>
       <h3 className='mb-2 mt-3'>Order Items</h3>
       {cartItems.length === 0 ? (
        <Message>Your cart is empty</Message>
       ) : (
        <ListGroup variant='flush'>
         {cartItems.map((item, index) => (
          <ListGroupItem key={index}>
           <Row>
            <Col lg={2}>
             <Image src={item.image} alt={item.name} fluid rounded />
            </Col>
            <Col lg={6}>
             <Link to={`/product/${item._id}`} style={{ textDecoration: 'none' }}>
              {item.name}
             </Link>
            </Col>
            <Col lg={4}>
             <p>{`${item.qty} * ${item.price} = $ ${item.price * item.qty}`}</p>
            </Col>
           </Row>
          </ListGroupItem>
         ))}
        </ListGroup>
       )}
      </ListGroupItem>
     </ListGroup>
    </Col>

    <Col lg={4}>
     <Card>
      <ListGroup variant='flush'>
       <ListGroupItem>
        <h3>Order Summary</h3>
       </ListGroupItem>
       <ListGroupItem>
        <Row>
         <Col>Items</Col>
         <Col>$ {itemsPrice}</Col>
        </Row>
       </ListGroupItem>
       <ListGroupItem>
        <Row>
         <Col>Shipping</Col>
         <Col>$ {shippingPrice}</Col>
        </Row>
       </ListGroupItem>
       <ListGroupItem>
        <Row>
         <Col>Tax</Col>
         <Col>$ {taxPrice}</Col>
        </Row>
       </ListGroupItem>
       <ListGroupItem>
        <Row>
         <Col>Total</Col>
         <Col>$ {totalPrice}</Col>
        </Row>
       </ListGroupItem>
       {cartItems && (
        <ListGroupItem>
         <Row>
          <Button
           type='button'
           onClick={placeOrderHandler}
           disabled={cartItems.length === 0}
           className='btn-block'
          >
           Place Order
          </Button>
         </Row>
        </ListGroupItem>
       )}
      </ListGroup>
     </Card>
    </Col>
   </Row>
  </>
 );
};

export default PlaceOrder;

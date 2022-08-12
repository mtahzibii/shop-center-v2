import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrder } from '../features/orders/orderSlice';

const Order = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const { orderId } = useParams();

 const { user, isLoading: userLoading } = useSelector((state) => state.user);
 const orderDetails = useSelector((state) => state.order);

 useEffect(() => {
  if (!user) {
   navigate('/login');
  }

  if (orderId) {
   dispatch(getOrder(orderId));
  }
 }, [dispatch, orderId, navigate, user]);

 if (!orderDetails) {
  return <Spinner />;
 }

 const { order, isLoading, isError, message } = orderDetails;

 //   Add decimal to prices
 const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
 };
 const itemsPrice = addDecimals(
  +order?.orderItems?.reduce((acc, curr) => acc + curr.price * curr.qty, 0)
 );

 if (isLoading || userLoading) {
  return <Spinner />;
 }

 if (isError) {
  return <Message>{message}</Message>;
 }

 return (
  <div>
   <h2 className='mt-3 mb-5'>{`ORDER ${order._id}`}</h2>
   <Row className='mb-5'>
    <Col lg={8}>
     <ListGroup variant='flush'>
      <ListGroupItem>
       <h2 className='text-body mb-3'>Shipping</h2>
       <p className='fs-5'>
        <span className='fw-bold'>Name: </span> {user.name}{' '}
       </p>
       <p>
        <span className='fw-bold'>Email: </span>{' '}
        <a href={`mailto:${user.email}`}>{user.email}</a>
       </p>
       <p>
        <span className='fw-bold'>Phone: </span> {order?.shippingAddress?.phone}
       </p>
       <p>
        <span className='fw-bold'>Address: </span> {order?.shippingAddress?.address},{' '}
        {order?.shippingAddress?.city},{order?.shippingAddress?.country}
       </p>
       {!order?.isDelivered ? (
        <Message variant='danger'>Not Delivered</Message>
       ) : (
        <Message variant='success'>Delivered</Message>
       )}
      </ListGroupItem>
      <ListGroupItem className='mt-4'>
       <h2 className='text-body mb-3'>Payment Method</h2>
       <p className='fs-5'>
        <span className='fw-bold'>Method: </span> {order.paymentMethod}
       </p>
       {!order.isPaid ? (
        <Message variant='danger'>Not Paid</Message>
       ) : (
        <Message variant='success'>Paid at {order.paidAt}</Message>
       )}
      </ListGroupItem>
      <ListGroupItem className='mt-4'>
       <h2 className='text-body mb-3'>Order Items</h2>

       <ListGroup variant='flush'>
        {order?.orderItems?.map((item) => (
         <ListGroupItem key={item._id}>
          <Row>
           <Col lg={2}>
            <Image src={item.image} fluid thumbnail alt={item.name} />
           </Col>
           <Col lg={6} className='d-flex align-items-center'>
            <p>{item.name}</p>
           </Col>
           <Col lg={4} className='d-flex align-items-center'>
            {item.qty} * ${item.price} = ${item.price * item.qty}
           </Col>
          </Row>
         </ListGroupItem>
        ))}
       </ListGroup>
      </ListGroupItem>
     </ListGroup>
    </Col>
    <Col lg={4}>
     <ListGroup>
      <ListGroupItem>
       <h3>ORDER SUMMARY</h3>
      </ListGroupItem>
      <ListGroupItem>
       <Row>
        <Col>Items</Col>
        <Col>${itemsPrice}</Col>
       </Row>
      </ListGroupItem>
      <ListGroupItem>
       <Row>
        <Col>Shipping</Col>
        <Col>${order.shippingPrice}</Col>
       </Row>
      </ListGroupItem>
      <ListGroupItem>
       <Row>
        <Col>Tax</Col>
        <Col>${order.taxPrice}</Col>
       </Row>
      </ListGroupItem>
      <ListGroupItem>
       <Row>
        <Col>Total</Col>
        <Col>${order.totalPrice}</Col>
       </Row>
      </ListGroupItem>
     </ListGroup>
    </Col>
   </Row>
  </div>
 );
};

export default Order;

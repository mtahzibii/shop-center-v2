import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import { Image, Button, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

const Order = () => {
 const navigate = useNavigate();
 const { user } = useSelector((state) => state.user);
 const { orderInfo, isLoading, isSuccess, isError, message } = useSelector(
  (state) => state.order
 );

 useEffect(() => {
  if (!user) {
   navigate('/login');
  }
 });

 useEffect(() => {
  if (isLoading) {
   return <Spinner />;
  }
 }, [isLoading]);

 //   Add decimal to prices
 const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
 };
 const itemsPrice = addDecimals(
  +orderInfo.orderItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0)
 );

 return (
  <div>
   <h2 className='mt-3 mb-5'>{`ORDER ${orderInfo._id}`}</h2>
   <Row className='mb-5'>
    <Col lg={8}>
     <ListGroup variant='flush'>
      <ListGroupItem>
       <h2 className='text-body mb-3'>Shipping</h2>
       <p className='fs-5'>
        <span className='fw-bold'>Name: </span> {user.name}{' '}
       </p>
       <p>
        <span className='fw-bold'>Email: </span> {user.email}
       </p>
       <p>
        <span className='fw-bold'>Phone: </span> {orderInfo.shippingAddress.phone}
       </p>
       <p>
        <span className='fw-bold'>Address: </span>{' '}
        {orderInfo.shippingAddress.address}, {orderInfo.shippingAddress.city},
        {orderInfo.shippingAddress.country}
       </p>
       <Message variant='danger'>Not Delivered</Message>
      </ListGroupItem>
      <ListGroupItem className='mt-4'>
       <h2 className='text-body mb-3'>Payment Method</h2>
       <p className='fs-5'>
        <span className='fw-bold'>Method: </span> {orderInfo.paymentMethod}
       </p>
       <Message variant='danger'>Not Paid</Message>
      </ListGroupItem>
      <ListGroupItem className='mt-4'>
       <h2 className='text-body mb-3'>Order Items</h2>

       <ListGroup variant='flush'>
        {orderInfo.orderItems.map((item) => (
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
        <Col>${orderInfo.shippingPrice}</Col>
       </Row>
      </ListGroupItem>
      <ListGroupItem>
       <Row>
        <Col>Tax</Col>
        <Col>${orderInfo.taxPrice}</Col>
       </Row>
      </ListGroupItem>
      <ListGroupItem>
       <Row>
        <Col>Total</Col>
        <Col>${orderInfo.totalPrice}</Col>
       </Row>
      </ListGroupItem>
      <ListGroupItem className='d-grid'>
       <Button>Paypal</Button>
      </ListGroupItem>
     </ListGroup>
    </Col>
   </Row>
  </div>
 );
};

export default Order;

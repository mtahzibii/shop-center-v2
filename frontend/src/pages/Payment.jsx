import React from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePaymentMethod } from '../features/carts/cartSlice';

const Payment = () => {
 const dispatch = useDispatch();

 const paymentMethodfromLS = JSON.parse(localStorage.getItem('paymentMethod'));

 const [paymentMethod, setPaymentMethod] = useState(paymentMethodfromLS ?? 'PayPal');
 const navigate = useNavigate();

 const onSubmitHandler = (e) => {
  e.preventDefault();

  localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
  dispatch(updatePaymentMethod(paymentMethod));
  navigate('/placeOrder');
 };

 return (
  <div>
   <CheckoutSteps step1 step2 step3 />

   <h2 className='mb-5'>Payment Method</h2>

   <div className='mb-3 fs-3 fw-bold'>Select Method</div>

   <Form onSubmit={onSubmitHandler}>
    <Form.Check
     type='radio'
     label='PayPal or Credit Card'
     value='PayPal'
     id='paypal'
     name='paymentMethod'
     style={{ accentColor: 'green' }}
     checked={paymentMethod == 'PayPal'}
     onChange={(e) => setPaymentMethod(e.target.value)}
    />
    <Form.Check
     type='radio'
     label='Stripe'
     id='creditCard'
     value='Stripe'
     checked={paymentMethod == 'Stripe'}
     name='paymentMethod'
     onChange={(e) => setPaymentMethod(e.target.value)}
    />

    <Button type='submit' className='mt-4'>
     Continue
    </Button>
   </Form>
  </div>
 );
};

export default Payment;

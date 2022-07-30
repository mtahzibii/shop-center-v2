import React from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
 const navigate = useNavigate();

 const onSubmitHandler = (e) => {
  e.preventDefault();
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
     label='PayPal'
     id='paypal'
     name='paymentMethod'
     style={{ accentColor: 'green' }}
    />
    <Form.Check
     type='radio'
     label='Credit Card'
     id='creditCard'
     disabled
     name='paymentMethod'
    />

    <Button type='submit' className='mt-4'>
     Continue
    </Button>
   </Form>
  </div>
 );
};

export default Payment;

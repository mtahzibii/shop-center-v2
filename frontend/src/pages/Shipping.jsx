import React, { useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setShippingAddress } from '../features/carts/cartSlice';

const Shipping = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const shippingDataFromLS = JSON.parse(localStorage.getItem('shippingAddress'));

 const [shippingData, setShippingData] = useState({
  address: shippingDataFromLS?.address ?? '',
  phone: shippingDataFromLS?.phone ?? '',
  city: shippingDataFromLS?.city ?? '',
  postalCode: shippingDataFromLS?.postalCode ?? '',
  country: shippingDataFromLS?.country ?? '',
 });

 const { address, phone, city, postalCode, country } = shippingData;

 const onChangeHandler = (e) => {
  setShippingData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
 };

 const onSubmitHandler = (e) => {
  e.preventDefault();

  const shippingData = {
   address,
   phone,
   city,
   postalCode,
   country,
  };

  localStorage.setItem('shippingAddress', JSON.stringify(shippingData));
  dispatch(setShippingAddress(shippingData));
  navigate('/payment');
 };

 return (
  <>
   <CheckoutSteps step1 step2 />

   <h1 className='mb-4'>Shipping</h1>

   <Form onSubmit={onSubmitHandler}>
    <Form.Group className='mb-4'>
     <Form.Label>Address</Form.Label>
     <Form.Control
      type='text'
      id='address'
      placeholder='Enter youe address'
      value={address}
      onChange={onChangeHandler}
      required
     />
     <Form.Text className='text-muted'>
      We'll never share your address with anyone else.
     </Form.Text>
    </Form.Group>

    <Form.Group className='mb-4'>
     <Form.Label>Phone Number</Form.Label>
     <Form.Control
      type='Number'
      id='phone'
      placeholder='Enter valid mobile number'
      value={phone}
      onChange={onChangeHandler}
      required
     />
     <Form.Text className='text-muted'>
      We'll never share your phone number with anyone else.
     </Form.Text>
    </Form.Group>

    <Form.Group className='mb-4'>
     <Form.Label>City</Form.Label>
     <Form.Control
      type='text'
      id='city'
      placeholder='Enter your city'
      value={city}
      onChange={onChangeHandler}
      required
     />
    </Form.Group>

    <Form.Group className='mb-4'>
     <Form.Label>Postal Code</Form.Label>
     <Form.Control
      type='Number'
      id='postalCode'
      placeholder='Enter postal code'
      value={postalCode}
      onChange={onChangeHandler}
      required
     />
    </Form.Group>

    <Form.Group className='mb-4'>
     <Form.Label>Country</Form.Label>
     <Form.Control
      type='text'
      id='country'
      placeholder='Enter your country'
      value={country}
      onChange={onChangeHandler}
      required
     />
    </Form.Group>

    <Button type='submit'>Continue</Button>
   </Form>
  </>
 );
};

export default Shipping;

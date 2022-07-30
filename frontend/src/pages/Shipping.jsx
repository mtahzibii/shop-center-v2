import { useState, useEffect } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Shipping = () => {
 const navigate = useNavigate();
 const { user } = useSelector((state) => state.user);

 useEffect(() => {
  const shippingDataFromStorage = JSON.parse(localStorage.getItem('shippingInfo'));
  if (shippingDataFromStorage !== null) {
   setShippingData(JSON.parse(localStorage.getItem('shippingInfo')));
  }
 }, []);

 const [shippingData, setShippingData] = useState({
  address: '',
  phoneNumber: '',
  city: '',
  postalCode: '',
  country: '',
 });

 const { address, phoneNumber, city, postalCode, country } = shippingData;

 const onChangeHandler = (e) => {
  setShippingData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
 };

 const onSubmitHandler = (e) => {
  e.preventDefault();

  const shippingInfo = {
   address,
   phoneNumber,
   city,
   postalCode,
   country,
  };

  localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
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
     />
     <Form.Text className='text-muted'>
      We'll never share your address with anyone else.
     </Form.Text>
    </Form.Group>

    <Form.Group className='mb-4'>
     <Form.Label>Phone Number</Form.Label>
     <Form.Control
      type='Number'
      placeholder='Enter valid mobile number'
      id='phoneNumber'
      value={phoneNumber}
      onChange={onChangeHandler}
     />
     <Form.Text className='text-muted'>
      We'll never share your phone number with anyone else.
     </Form.Text>
    </Form.Group>

    <Form.Group className='mb-4'>
     <Form.Label>City</Form.Label>
     <Form.Control
      type='text'
      placeholder='Enter your city'
      id='city'
      value={city}
      onChange={onChangeHandler}
     />
    </Form.Group>

    <Form.Group className='mb-4'>
     <Form.Label>Postal Code</Form.Label>
     <Form.Control
      type='Number'
      placeholder='Enter postal code'
      id='postalCode'
      value={postalCode}
      onChange={onChangeHandler}
     />
    </Form.Group>

    <Form.Group className='mb-4'>
     <Form.Label>Country</Form.Label>
     <Form.Control
      type='text'
      placeholder='Enter your country'
      id='country'
      value={country}
      onChange={onChangeHandler}
     />
    </Form.Group>

    <Button type='submit'>Continue</Button>
   </Form>
  </>
 );
};

export default Shipping;

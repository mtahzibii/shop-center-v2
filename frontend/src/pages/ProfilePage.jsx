import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../features/users/userSlice.js';
import Spinner from '../components/Spinner.jsx';
import { toast } from 'react-toastify';
import {
 reset,
 logoutUser,
 updateUserProfile,
} from '../features/users/userSlice.js';
import { Row, Col, Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../components/Message.jsx';

const ProfilePage = () => {
 const dispatch = useDispatch();
 const [MessageUpdate, setMessageUpdate] = useState('');

 const { user, isLoading, isError, message, isSuccess } = useSelector(
  (state) => state.user
 );

 const [userProfileData, setUserProfileData] = useState({
  name: user.name,
  email: user.email,
  password: '',
  confirmPassword: '',
 });

 const { name, email, password, confirmPassword } = userProfileData;

 const onChangeHdndler = (e) => {
  setUserProfileData((prevState) => ({
   ...prevState,
   [e.target.id]: e.target.value,
  }));
 };

 // Update user profile
 const onSubmitHandler = (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
   setMessageUpdate('Passwords do not match');
  } else {
   const userData = {
    id: user._id,
    name,
    email,
   };

   dispatch(updateUserProfile(userData));
   setMessageUpdate('Profile Updated');
  }
 };
 useEffect(() => {
  dispatch(getUserProfile());
 }, [dispatch]);

 useEffect(() => {
  if (isError) {
   toast.error('User not authorized. Please login again');
   dispatch(logoutUser());
  }
 }, [dispatch, isSuccess, isError, message]);

 if (isLoading) {
  return <Spinner />;
 }

 return (
  <Row>
   {!user ? (
    <Message>
     User is not authorized. Please <Link to='/login'>Login Again</Link>{' '}
    </Message>
   ) : (
    <>
     <Col md={3}>
      <h3 className='mt-3'>User Profile</h3>
      {isError && <Message variant='danger'>{message}</Message>}
      {isSuccess && <Message variant='success'>Profile Updated</Message>}

      <Form onSubmit={onSubmitHandler}>
       <Form.Group className='mb-3'>
        <Form.Label>Name</Form.Label>
        <Form.Control
         id='name'
         type='text'
         onChange={onChangeHdndler}
         value={name}
        />
       </Form.Group>
       <Form.Group className='mb-3'>
        <Form.Label>Email</Form.Label>
        <Form.Control
         id='email'
         type='email'
         onChange={onChangeHdndler}
         value={email}
        />
       </Form.Group>
       <Form.Group className='mb-3'>
        <Form.Label>Password</Form.Label>
        <Form.Control
         id='password'
         type='password'
         placeholder='Password'
         onChange={onChangeHdndler}
         value={password}
        />
       </Form.Group>
       <Form.Group className='mb-3'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
         id='confirmPassword'
         type='password'
         placeholder='Confirm Password'
         onChange={onChangeHdndler}
         value={confirmPassword}
        />
       </Form.Group>
       <Button type='submit'>Update</Button>
      </Form>
     </Col>
     <Col md={9}>
      <h3 className='mt-3'>My Orders</h3>
      <Table
       striped
       bordered
       hover
       responsive
       size='sm'
       align='center'
       style={{ textAlign: 'center' }}
      >
       <thead>
        <tr style={{ fontWeight: '700', color: 'blue' }}>
         <th>ID</th>
         <th>DATE</th>
         <th>TOTAL</th>
         <th>PAID</th>
         <th>DELIVERED</th>
         <th></th>
        </tr>
       </thead>
       <tbody>
        <tr>
         <td>1</td>
         <td>2</td>
         <td>3</td>
         <td>4</td>
         <td>5</td>
         <td className='d-flex justify-content-center'>
          <Button
           className='d-flex align-items-center '
           style={{
            background: 'white',
            color: 'black',
            height: ' 20px',
            border: '1px solid black',
            fontSize: '12px',
           }}
          >
           Details
          </Button>
         </td>
        </tr>
       </tbody>
      </Table>
     </Col>
    </>
   )}
  </Row>
 );
};

export default ProfilePage;

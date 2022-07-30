import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../features/users/userSlice.js';
import Spinner from '../components/Spinner.jsx';
import { toast } from 'react-toastify';
import { reset, logoutUser } from '../features/users/userSlice.js';
import { Row, Col, Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../components/Message.jsx';

const ProfilePage = () => {
 const { user, isLoading, isError, message, isSuccess } = useSelector(
  (state) => state.user
 );

 //  const { cartItems, isLoading: cartLoading } = useSelector((state) => state.cart);

 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(getUserProfile());
 }, [dispatch]);

 useEffect(() => {
  if (isError) {
   toast.error('User not authorized. Please login again');
   dispatch(logoutUser());
  }

  if (isSuccess) {
   dispatch(reset());
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
      <Form.Group className='mb-3'>
       <Form.Label>Name</Form.Label>
       <Form.Control placeholder={user.name} disabled />
      </Form.Group>
      <Form.Group className='mb-3'>
       <Form.Label>Email</Form.Label>
       <Form.Control placeholder={user.email} disabled />
      </Form.Group>
      <Form.Group className='mb-3'>
       <Form.Label>Password</Form.Label>
       <Form.Control placeholder='Password' disabled />
      </Form.Group>
      <Form.Group className='mb-3'>
       <Form.Label>Confirm Password</Form.Label>
       <Form.Control placeholder='Confirm Password' disabled />
      </Form.Group>
      <Button>Update</Button>
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

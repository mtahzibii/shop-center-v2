import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrders } from '../features/orders/orderSlice';
import { getUsers } from '../features/users/userSlice.js';
import { Table, Button } from 'react-bootstrap';
import { Check } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Spinner from '../components/Spinner';

const OrderList = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const { orders, isError, isLoading, message } = useSelector((state) => state.order);
 const { user, users, isLoading: userLoading } = useSelector((state) => state.user);

 useEffect(() => {
  // if (isError) {
  //  toast.error('Unable to fetch products');
  // }

  if (user && user.isAdmin) {
   dispatch(getAllOrders());
  } else if (!user) {
   navigate('/login');
  }

  dispatch(getUsers());
 }, [dispatch, navigate, user, isError]);

 //  Prevent access for non-admin users
 if (user && !user.isAdmin) {
  return (
   <Message variant='danger'>
    <p className='fw-bold fs-4'>Access Denied.</p>
    Administrative privileges required.
   </Message>
  );
 }

 if (isLoading) {
  return <Spinner />;
 }

 return (
  <div>
   <h2 className='my-5'>Orders</h2>

   <Table
    striped
    bordered
    hover
    size='sm'
    className='mt-4'
    style={{ fontSize: '14px' }}
   >
    <thead className='fw-bold text-center ' style={{ color: 'blue' }}>
     <tr>
      <th style={{ width: '150px' }}>id</th>
      <th style={{ width: '200px' }}>User</th>
      <th style={{ width: '230px' }}>Date</th>
      <th style={{ width: '80px' }}>Total</th>
      <th style={{ width: '80px' }}>Paid</th>
      <th style={{ width: '80px' }}>Delivered</th>
      <th style={{ width: '180px' }}>Action</th>
     </tr>
    </thead>
    <tbody>
     {orders.map((order) => (
      <tr key={order._id}>
       <td>{order._id}</td>
       <td>
        {users.map((user) => {
         if (user._id === order.user) {
          return user.name;
         }
        })}
       </td>
       <td>{order.createdAt.substring(0, 10).toLocaleString('en-US')}</td>
       <td className='text-center '>$ {order.totalPrice}</td>
       <td className='text-center '>
        {order.isPaid ? (
         <Check size={30} style={{ color: 'green' }} />
        ) : (
         <i className='fas fa-times '></i>
        )}
       </td>
       <td className='text-center'>
        {order.isDelivered ? (
         <Check size={30} style={{ color: 'green' }} />
        ) : (
         <i className='fas fa-times' style={{ color: 'red' }}></i>
        )}
       </td>
       <td className='d-flex justify-content-center '>
        <Button
         className='d-flex align-items-center '
         style={{
          background: 'white',
          color: 'black',
          height: ' 5px',
          border: '1px solid black',
          fontSize: '12px',
          padding: '15px',
         }}
         onClick={() => navigate(`/order/${order._id}`)}
        >
         Details
        </Button>
       </td>
      </tr>
     ))}
    </tbody>
   </Table>
  </div>
 );
};

export default OrderList;

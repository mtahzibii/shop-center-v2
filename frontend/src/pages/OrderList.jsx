import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrders } from '../features/orders/orderSlice';
import { Table, Button } from 'react-bootstrap';
import { Check } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const { orders } = useSelector((state) => state.order);

 useEffect(() => {
  dispatch(getAllOrders());
 }, []);

 return (
  <div>
   <h1 className='my-5'>Orders</h1>

   <Table hover striped bordered size='sm'>
    <thead className='text-center' style={{ fontWeight: '700', color: 'blue' }}>
     <tr>
      <th style={{ width: '200px' }}>id</th>
      <th style={{ width: '200px' }}>User</th>
      <th style={{ width: '200px' }}>Date</th>
      <th style={{ width: '200px' }}>Total</th>
      <th style={{ width: '100px' }}>Paid</th>
      <th style={{ width: '200px' }}>Delivered</th>
      <th style={{ width: '200px' }}>Action</th>
     </tr>
    </thead>
    <tbody>
     {orders.map((order) => (
      <tr key={order._id}>
       <td>{order._id}</td>
       <td>{order.user && order.user.name}</td>
       <td>{order.createdAt.substring(0, 10).toLocaleString('en-US')}</td>
       <td className='text-center'>$ {order.totalPrice}</td>
       <td className='text-center'>
        {order.isPaid ? (
         <Check size={30} style={{ color: 'green' }} />
        ) : (
         <i className='fas fa-times' style={{ color: 'red' }}></i>
        )}
       </td>
       <td className='text-center'>
        {order.isDelivered ? (
         <Check size={30} style={{ color: 'green' }} />
        ) : (
         <i className='fas fa-times' style={{ color: 'red' }}></i>
        )}
       </td>
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

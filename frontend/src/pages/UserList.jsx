import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { ReactComponent as TrashIcon } from '../assets/trash.svg';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUsers, deleteUser } from '../features/users/userSlice.js';
import Spinner from '../components/Spinner.jsx';
import { Check } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';

const UserList = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const { user, users, isLoading, isError, userEdit } = useSelector(
  (state) => state.user
 );

 //  useEffect(() => {
 //   dispatch(getUsers());
 //  }, [user, isError]);

 useEffect(() => {
  if (user && user.isAdmin) {
   dispatch(getUsers());
  } else if (!user) {
   navigate('/login');
  }
 }, [dispatch, navigate, userEdit, isError]);

 if (user && !user.isAdmin) {
  return (
   <Message variant='danger'>
    <p className='fw-bold fs-4'>Access Denied.</p>
    Administrative Privileges required.
   </Message>
  );
 }

 const onDeleteHandler = (userId) => {
  if (window.confirm('Are you sure you want to delete this user?')) {
   dispatch(deleteUser(userId));
  }
 };

 if (isLoading) {
  return <Spinner />;
 }

 return (
  <div>
   <h1 className='my-4'>Users</h1>
   <Table striped bordered hover size='sm'>
    <thead>
     <tr className='text-center' style={{ fontWeight: '700', color: 'blue' }}>
      <th style={{ width: '200px' }}>id</th>
      <th style={{ width: '230px' }}>Name</th>
      <th style={{ width: '230px' }}>Email</th>
      <th style={{ width: '120px' }}>Admin</th>
      <th style={{ width: '170px' }}>Action</th>
     </tr>
    </thead>
    <tbody>
     {users.map((user) => (
      <tr key={user._id}>
       <td>{user._id}</td>
       <td>{user.name}</td>
       <td>{user.email}</td>
       <td className='text-center'>
        {user.isAdmin ? (
         <Check size={30} style={{ color: 'green' }} />
        ) : (
         <i className='fas fa-times' style={{ color: 'red' }}></i>
        )}
       </td>
       <td className='d-flex justify-content-center' style={{ padding: '5px' }}>
        <LinkContainer
         to={`/admin/users/${user._id}`}
         style={{ background: 'none', borderRadius: '5px', color: 'black' }}
        >
         <Button>
          <i className='fas fa-edit '></i>
         </Button>
        </LinkContainer>
        <Button
         variant='light'
         className='ml-5'
         style={{
          height: '40px',
          marginLeft: '20px',
          borderRadius: '5px',
          background: 'none',
         }}
         onClick={() => onDeleteHandler(user._id)}
        >
         <TrashIcon style={{ color: 'red' }} />
        </Button>
       </td>
      </tr>
     ))}
    </tbody>
   </Table>
  </div>
 );
};

export default UserList;

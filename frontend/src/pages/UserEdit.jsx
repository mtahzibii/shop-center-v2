import { Form, FormControl, FormGroup, FormLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUserByAdmin } from '../features/users/userSlice';
import { getUserByAdmin } from '../features/users/userSlice';
import Spinner from '../components/Spinner';

const UserEdit = () => {
 const dispatch = useDispatch();
 const { userId } = useParams();

 const [userData, setUserData] = useState({
  name: '',
  email: '',
  isAdmin: 'false',
 });

 const { userEdit, isLoading, isSuccess } = useSelector((state) => state.user);

 useEffect(() => {
  if (!userEdit || userEdit._id !== userId) {
   dispatch(getUserByAdmin(userId));
  }
 }, [dispatch, isSuccess]);

 useEffect(() => {
  if (isSuccess && userEdit?._id === userId) {
   setUserData({
    name: userEdit?.name,
    email: userEdit?.email,
    isAdmin: userEdit?.isAdmin,
   });
  }
 }, [dispatch, isSuccess, userId, userEdit]);

 const onChangeHandler = (e) => {
  setUserData((prevState) => {
   return { ...prevState, [e.target.id]: e.target.value };
  });
 };

 const onChangeCheckbox = (e) => {
  setUserData((prevState) => ({ ...prevState, [e.target.id]: e.target.checked }));
 };

 const editUserHandler = (e) => {
  e.preventDefault();

  console.log(userData.isAdmin);

  const updatedUserData = {
   _id: userId,
   name: userData.name,
   email: userData.email,
   isAdmin: userData.isAdmin,
  };

  dispatch(updateUserByAdmin(updatedUserData));
  window.location.reload();
 };

 if (isLoading) {
  return <Spinner />;
 }

 return (
  <div>
   <Link to='/admin/users' className='btn btn-light my-3'>
    Go Back
   </Link>
   <FormContainer>
    <h1>Edit User</h1>

    <Form>
     <FormGroup className='mt-5 mb-4'>
      <FormLabel className='fw-bold'>Name</FormLabel>
      <FormControl
       id='name'
       value={userData.name}
       onChange={onChangeHandler}
      ></FormControl>
     </FormGroup>

     <FormGroup>
      <FormLabel className='fw-bold'>Email</FormLabel>
      <FormControl
       id='email'
       value={userData.email}
       onChange={onChangeHandler}
      ></FormControl>
     </FormGroup>

     <FormGroup controlId='isadmin'>
      <Form.Check
       type='checkbox'
       id='isAdmin'
       label='Is Admin'
       className='mt-4 mb-5 fw-bold'
       value={userData.isAdmin}
       checked={userData.isAdmin ? 1 : 0}
       onChange={onChangeCheckbox}
      />
     </FormGroup>

     <Button onClick={editUserHandler}>Update</Button>
    </Form>
   </FormContainer>
  </div>
 );
};

export default UserEdit;

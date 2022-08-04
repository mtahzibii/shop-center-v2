import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/users/userSlice';
import { reset } from '../features/users/userSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

const Register = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
 });

 //  Fetch user states
 const { user, isLoading, isError, message } = useSelector((state) => state.user);

 const { name, email, password, confirmPassword } = formData;

 useEffect(() => {
  if (isError) {
   toast.error(message);
  }

  if (user) {
   navigate('/');
  }
 }, [user, isError, message, navigate]);

 const onChangeHandler = (e) => {
  setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
 };
 const onSubmitHandler = (e) => {
  e.preventDefault();

  const user = {
   name,
   email,
   password,
  };

  dispatch(registerUser(user));
  dispatch(reset());
 };

 if (isLoading) {
  return <Spinner />;
 }
 return (
  <div>
   <h1 className='my-5'>Sign Up</h1>

   <form onSubmit={onSubmitHandler}>
    <div className='form-group'>
     <label htmlFor='name' className='form-name'>
      Name
     </label>
     <input
      id='name'
      type='text'
      className='form-control form-input'
      placeholder='Enter your name'
      value={name}
      onChange={onChangeHandler}
     />
    </div>
    <div className='form-group'>
     <label htmlFor='email' className='form-email'>
      Email
     </label>
     <input
      id='email'
      type='email'
      className='form-control form-input'
      placeholder='Enter your email'
      value={email}
      onChange={onChangeHandler}
     />
    </div>
    <div className='form-group'>
     <label htmlFor='password' className='form-password'>
      Password
     </label>
     <input
      id='password'
      type='password'
      className='form-control form-input'
      placeholder='Enter your password'
      value={password}
      onChange={onChangeHandler}
     />
    </div>
    <div className='form-group'>
     <label htmlFor='confirmPassword' className='form-password'>
      Confirm Password
     </label>
     <input
      id='confirmPassword'
      type='password'
      className='form-control form-input'
      placeholder='Confirm your password'
      value={confirmPassword}
      onChange={onChangeHandler}
     />
    </div>

    <Button variant='dark' type='submit'>
     Sign Up
    </Button>
   </form>

   <p className='mt-3'>
    Already have account? <Link to='/login'>Login</Link>
   </p>
  </div>
 );
};

export default Register;

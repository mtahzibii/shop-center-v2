import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/users/userSlice.js';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { reset } from '../features/users/userSlice.js';

const Login = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const [formData, setFormData] = useState({ email: '', password: '' });

 const { user, isLoading, isError, message } = useSelector((state) => state.user);

 useEffect(() => {
  if (isError) {
   toast.error(message);
  }

  // Redirect when logged in
  if (user) {
   navigate('/');
  }
 }, [user, isLoading, isError, message, navigate]);

 const onChangeHandler = (e) => {
  setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
 };

 const { email, password } = formData;

 const onSubmitHandler = (e) => {
  e.preventDefault();

  const userData = {
   email,
   password,
  };

  dispatch(loginUser(userData));
  dispatch(reset());
 };

 if (isLoading) {
  return <Spinner />;
 }
 return (
  <div>
   <h1 className='my-5'>Sign In</h1>

   <form onSubmit={onSubmitHandler}>
    <div className='form-group'>
     <label htmlFor='email' className='form-email'>
      Email
     </label>
     <input
      id='email'
      placeholder='Enter your email'
      type='email'
      className='form-control form-input'
      required
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
      required
      value={password}
      onChange={onChangeHandler}
     />
    </div>

    <Button variant='dark' type='submit'>
     Sign In
    </Button>
   </form>

   <p className='mt-3'>
    New customer?
    <Link to='/register'> Register</Link>
   </p>
  </div>
 );
};

export default Login;

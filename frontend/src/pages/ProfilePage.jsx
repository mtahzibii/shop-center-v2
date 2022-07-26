import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../features/users/userSlice.js';
import Spinner from '../components/Spinner.jsx';

const ProfilePage = () => {
 const { user, isLoading, isError } = useSelector((state) => state.user);
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(getUserProfile());
 }, [dispatch]);

 if (isLoading) {
  return <Spinner />;
 }

 return (
  <div>
   <h1>My Orders</h1>
  </div>
 );
};

export default ProfilePage;

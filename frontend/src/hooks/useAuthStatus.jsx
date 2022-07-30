import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useAuthStatus = () => {
 const [checkingStatus, setCheckingStatus] = useState(true);
 const [loggedIn, setLoggedIn] = useState(true);

 const { user } = useSelector((state) => state.user);

 useEffect(() => {
  if (user) {
   setLoggedIn(true);
  } else {
   setLoggedIn(false);
  }

  setCheckingStatus(false);
 }, [user]);

 return { checkingStatus, loggedIn };
};

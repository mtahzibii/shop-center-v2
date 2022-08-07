import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ children, variant }) => {
 return (
  <div>
   <Alert variant={variant} className='mt-3  py-2'>
    {children}
   </Alert>
  </div>
 );
};

Message.defaultProps = {
 variant: 'info',
};

export default Message;

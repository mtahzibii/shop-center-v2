import React from 'react';
import { Alert, Button } from 'react-bootstrap';

const Message = ({ children, variant }) => {
 return (
  <div>
   <Alert variant={variant} className='mt-3'>
    {children}
   </Alert>
  </div>
 );
};

Message.defaultProps = {
 variant: 'info',
};

export default Message;

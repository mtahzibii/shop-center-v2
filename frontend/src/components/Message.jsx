import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ children }) => {
 return <Alert variant='warning'>{children}</Alert>;
};

Message.defaultProps = {
 variant: 'info',
};

export default Message;

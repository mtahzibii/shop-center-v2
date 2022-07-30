import { Nav, Navbar } from 'react-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
 return (
  <Navbar>
   <Nav className='me-auto'>
    {step1 ? (
     <Nav.Item>
      <Nav.Link href='/login' style={{ color: 'black' }}>
       Sign in
      </Nav.Link>
     </Nav.Item>
    ) : (
     <Nav.Item>
      <Nav.Link disabled>Sign in</Nav.Link>
     </Nav.Item>
    )}

    {step2 ? (
     <Nav.Item>
      <Nav.Link href='/shipping' style={{ color: 'black' }}>
       Shipping
      </Nav.Link>
     </Nav.Item>
    ) : (
     <Nav.Item>
      <Nav.Link disabled>Shipping</Nav.Link>
     </Nav.Item>
    )}
    {step3 ? (
     <Nav.Item>
      <Nav.Link href='/payment' style={{ color: 'black' }}>
       Payment
      </Nav.Link>
     </Nav.Item>
    ) : (
     <Nav.Item>
      <Nav.Link disabled>Payment</Nav.Link>
     </Nav.Item>
    )}
    {step4 ? (
     <Nav.Item>
      <Nav.Link href='/placeOrder' style={{ color: 'black' }}>
       Place Order
      </Nav.Link>
     </Nav.Item>
    ) : (
     <Nav.Item>
      <Nav.Link disabled>Place Order</Nav.Link>
     </Nav.Item>
    )}
   </Nav>
  </Navbar>
 );
};

export default CheckoutSteps;

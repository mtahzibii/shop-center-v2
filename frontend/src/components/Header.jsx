import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, reset } from '../features/users/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();

 const onLogout = () => {
  dispatch(logoutUser());
  dispatch(reset());
  navigate('/login');
 };

 const { user } = useSelector((state) => state.user);

 return (
  <header>
   <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
    <Container>
     <LinkContainer to='/'>
      <Navbar.Brand>Shop-Center</Navbar.Brand>
     </LinkContainer>
     <Nav className='ml-auto'>
      <LinkContainer to='/cart'>
       <Nav.Link>
        <i className='fas fa-shopping-cart'></i> Cart
       </Nav.Link>
      </LinkContainer>
      {user ? (
       <NavDropdown title={user.name} id='username'>
        <NavDropdown.Item href='/profile'>Prfile</NavDropdown.Item>
        <NavDropdown.Item href='/login' onClick={onLogout}>
         Sign out
        </NavDropdown.Item>
       </NavDropdown>
      ) : (
       <LinkContainer to='/login'>
        <Nav.Link>
         <i className='fas fa-user'></i> Sign In
        </Nav.Link>
       </LinkContainer>
      )}
     </Nav>
    </Container>
   </Navbar>
  </header>
 );
};

export default Header;

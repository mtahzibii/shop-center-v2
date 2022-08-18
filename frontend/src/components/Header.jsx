import React, { useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, reset } from '../features/users/userSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { MDBInputGroup, MDBAutocomplete, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import SearchBox from './SearchBox';

const Header = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();

 const onLogout = () => {
  dispatch(logoutUser());
  dispatch(reset());
  navigate('/login');
 };

 const { user, isLoading } = useSelector((state) => state.user);

 if (isLoading) {
  return <Spinner />;
 }

 return (
  <header>
   <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
    <Container>
     <div className='d-flex justify-content-start'>
      <LinkContainer to='/' style={{ marginRight: '0' }}>
       <Navbar.Brand>Shop-Center</Navbar.Brand>
      </LinkContainer>

      <SearchBox />
     </div>
     <Nav className='ml-auto'>
      <LinkContainer to='/cart'>
       <Nav.Link>
        <i className='fas fa-shopping-cart'></i> Cart
       </Nav.Link>
      </LinkContainer>
      {user && user.isAdmin === true && (
       <>
        <NavDropdown title='Admin' id='admin'>
         <NavDropdown.Item href='/profile'>Prfile</NavDropdown.Item>
         <NavDropdown.Item href='/login' onClick={onLogout}>
          Sign out
         </NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title='Management' id='management'>
         <NavDropdown.Item href='/admin/users'>Users</NavDropdown.Item>
         <NavDropdown.Item href='/admin/products'>Products</NavDropdown.Item>
         <NavDropdown.Item href='/admin/orders'>Orders</NavDropdown.Item>
        </NavDropdown>
       </>
      )}

      {user && user.isAdmin === false && (
       <NavDropdown title={user.name} id='username'>
        <NavDropdown.Item href='/profile'>Prfile</NavDropdown.Item>
        <NavDropdown.Item href='/login' onClick={onLogout}>
         Sign out
        </NavDropdown.Item>
       </NavDropdown>
      )}

      {!user && (
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

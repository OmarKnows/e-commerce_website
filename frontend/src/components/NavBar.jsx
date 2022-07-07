import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavBar = () => {
  return (
    <Navbar bg='light' expand='lg' fixed='top' className='p-4'>
      <Container fluid>
        <LinkContainer to='/'>
          <Navbar.Brand href='#action1'> Ebra&Fatla </Navbar.Brand>
        </LinkContainer>

        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <LinkContainer to='/search'>
              <Nav.Link href='#action2'>
                <i className='fa-solid fa-magnifying-glass fa-lg'></i>
              </Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer to='/login'>
              <Nav.Link href='#action3'>
                <i className='fas fa-user fa-lg'></i> Login
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/cart'>
              <Nav.Link href='#action4'>
                <i className='fas fa-shopping-cart fa-lg'></i> Cart
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

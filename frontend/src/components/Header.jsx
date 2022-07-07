import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  return (
    <Container>
      <Navbar
        fixed='top'
        className='navbar navbar-expand-lg navbar-light bg-light'
        collapseOnSelect
      >
        <div className='d-flex justify-content-around p-4'>
          <div>
            <LinkContainer to='/'>
              <Navbar.Brand className='navbar-brand'>Title</Navbar.Brand>
            </LinkContainer>
          </div>
          <div>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <LinkContainer to='/cart'>
                  <Nav.Link>
                    <i className='fas fa-shopping-cart fa-2x'></i>
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user fa-2x'></i>
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/search'>
                  <Nav.Link>
                    <i className='fa-solid fa-magnifying-glass fa-2x'></i>
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </div>
        </div>
      </Navbar>
    </Container>
  );
};

export default Header;

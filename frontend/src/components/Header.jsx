import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar
      fixed='top'
      className='navbar navbar-expand-lg navbar-light bg-light'
      collapseOnSelect
    >
      <div className='d-flex justify-content-between p-4'>
        <LinkContainer to='/'>
          <Navbar.Brand className='navbar-brand'>Title</Navbar.Brand>
        </LinkContainer>
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
    </Navbar>
  );
};

export default Header;

import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  return (
    <header>
      <Navbar
        className='navbar navbar-expand-lg navbar-dark bg-primary'
        collapseOnSelect
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>E-Com</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i></i> Log in
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link>
                  <i></i> Sign Up
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link>
                  <i></i> About
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Navbar
        fixed="top"
        className="navbar navbar-expand-lg navbar-dark bg-primary"
        collapseOnSelect
      >
        <Container className="container-fluid">
          <LinkContainer to="/">
            <Navbar.Brand>E-Com</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/login">
                <Nav.Link>
                  <i></i> Log in
                </Nav.Link>
              </LinkContainer>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Sign Up"
                menuVariant="dark"
              >
                <NavDropdown.Item as={Link} to="/customer">
                  as a customer
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/vendor">
                  as a vendor
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/tailor">
                  as a tailor
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

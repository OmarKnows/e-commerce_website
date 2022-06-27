import React from "react";
import { Navbar, Nav, Container, NavDropdown, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <Navbar
        className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-around"
        collapseOnSelect
      >
        <Row>
          <Col></Col>
          <Col>
            <Navbar.Brand>ECom</Navbar.Brand>
          </Col>
          <Col>
            <Nav className="me-auto">
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
          </Col>
        </Row>
      </Navbar>
    </>
  );
};

export default NavBar;

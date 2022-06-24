import React from "react";
import { Card, Col, Row, Button, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import sample1 from "../images/sample1.jpg";
import sample2 from "../images/sample2.jpeg";
import sample3 from "../images/sample3.jpg";
import products from "../images/products.jpg";
import services from "../images/services.jpg";
import custom from "../images/custom.jpg";
import wallpaper from "../images/wallpaper.jpg";

const LandingScreen = () => {
  return (
    <div>
      <Image
        src={wallpaper}
        style={{ marginTop: "90px", marginBottom: "50px" }}
      />
      <Container>
        <Row className="text-center">
          <Col>
            <Card>
              <Card.Img variant="top" src={products} fluid />
              <Card.Body>
                <Card.Title>Products</Card.Title>
                <Card.Text>Check out our products.</Card.Text>
                <Button as={Link} to="/products" variant="primary">
                  Go To Products
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src={services} fluid />
              <Card.Body>
                <Card.Title>Services</Card.Title>
                <Card.Text>Check out our services.</Card.Text>
                <Button as={Link} to="/services" variant="primary">
                  Go To Services
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src={custom} fluid />
              <Card.Body>
                <Card.Title>Custom Requests</Card.Title>
                <Card.Text>Check out our custom requests.</Card.Text>
                <Button as={Link} to="/requests" variant="primary">
                  Go To Requests
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingScreen;

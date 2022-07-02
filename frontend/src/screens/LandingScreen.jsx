import React from "react";
import { Card, Col, Row, Button, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import products from "../images/products.jpg";
import services from "../images/services.jpg";
import custom from "../images/custom.jpg";
import wallpaper from "../images/wallpaper.jpg";

const LandingScreen = () => {
  return (
    <div className="con">
      <div style={{ position: "relative" }}>
        <Image
          src={wallpaper}
          style={{
            marginTop: "50px",
            marginBottom: "50px",
            width: "100%",
          }}
        />
        <h1
          style={{
            position: "absolute",
            right: "70%",
            left: "30%",
            bottom: "50%",
            color: "White",
            fontWeight: "bold",
            textShadow: "1px 1px #000000",
            fontSize: "70pt",
            width: "100%",
          }}
        >
          Placeholder Title
        </h1>
      </div>

      <Container>
        <Row className="text-center">
          <Col>
            <Link to="/products">
              <Card>
                <Card.Img src={products} fluid alt="women" />
                <Card.ImgOverlay className="d-flex align-items-center justify-content-center">
                  <Card.Title
                    style={{
                      color: "White",
                      fontWeight: "bold",
                      textShadow: "1px 1px #000000",
                      fontSize: "30pt",
                    }}
                  >
                    Products
                  </Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/services">
              <Card>
                <Card.Img src={services} fluid alt="custom" />
                <Card.ImgOverlay className="d-flex align-items-center justify-content-center">
                  <Card.Title
                    style={{
                      color: "White",
                      fontWeight: "bold",
                      textShadow: "1px 1px #000000",
                      fontSize: "30pt",
                    }}
                  >
                    Services
                  </Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/requests">
              <Card>
                <Card.Img src={custom} fluid alt="custom" />
                <Card.ImgOverlay className="d-flex align-items-center justify-content-center">
                  <Card.Title
                    style={{
                      color: "White",
                      fontWeight: "bold",
                      textShadow: "1px 1px #000000",
                      fontSize: "30pt",
                    }}
                  >
                    Custom Requests
                  </Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingScreen;

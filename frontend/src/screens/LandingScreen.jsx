import React from 'react';
import { Card, Col, Row, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../landing.css';
import products from '../images/products.jpg';
import services from '../images/services.jpg';
import custom from '../images/custom.jpg';
import wallpaper from '../images/wallpaper.jpg';

const LandingScreen = () => {
  return (
    <div>
      <div>
        <Image src={wallpaper} className='landingImage' />
        <h1 className='landingTitle'>Placeholder Title</h1>
      </div>

      <Container>
        <Row className='text-center'>
          <Col>
            <Link to='/products'>
              <Card>
                <Card.Img src={products} fluid alt='women' />
                <Card.ImgOverlay className='d-flex align-items-center justify-content-center con'>
                  <Card.Title className='cTitle'>Products</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to='/services'>
              <Card>
                <Card.Img src={services} fluid alt='custom' />
                <Card.ImgOverlay className='d-flex align-items-center justify-content-center'>
                  <Card.Title className='cTitle'>Services</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to='/requests'>
              <Card>
                <Card.Img src={custom} fluid alt='custom' />
                <Card.ImgOverlay className='d-flex align-items-center justify-content-center'>
                  <Card.Title className='cTitle'>Custom Requests</Card.Title>
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

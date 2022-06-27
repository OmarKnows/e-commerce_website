import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import men from '../images/mens.jpg';
import women from '../images/womens.jpg';

const ServicesScreen = () => {
  return (
    <Container style={{ marginTop: '100px', textAlign: 'center' }}>
      <Row>
        <Col>
          <Link to='/'>
            <Card>
              <Card.Img src={women} alt='women' />
              <Card.ImgOverlay className='d-flex align-items-center justify-content-center'>
                <Card.Title
                  style={{
                    color: 'White',
                    fontWeight: 'bold',
                    textShadow: '1px 1px #000000',
                    fontSize: '30pt',
                  }}
                >
                  Women
                </Card.Title>
              </Card.ImgOverlay>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to='/'>
            <Card>
              <Card.Img src={men} alt='men' />
              <Card.ImgOverlay className='d-flex align-items-center justify-content-center'>
                <Card.Title
                  style={{
                    color: 'White',
                    fontWeight: 'bold',
                    textShadow: '1px 1px #000000',
                    fontSize: '30pt',
                  }}
                >
                  Men
                </Card.Title>
              </Card.ImgOverlay>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ServicesScreen;

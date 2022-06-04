import React from 'react'
import { Card, Col, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import sample1 from '../images/sample1.jpg'
import sample2 from '../images/sample2.jpeg'
import sample3 from '../images/sample3.jpg'

const LandingScreen = () => {
  return (
    <div>
      <h1 className='text-center mt-5'>E-commerce Website</h1>
      <Row className='text-center'>
        <Col>
          <Card>
            <Card.Img variant='top' src={sample1} fluid />
            <Card.Body>
              <Card.Title>Products</Card.Title>
              <Card.Text>Check out our products.</Card.Text>
              <Button as={Link} to='/products' variant='primary'>
                Go To Products
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant='top' src={sample2} fluid />
            <Card.Body>
              <Card.Title>Services</Card.Title>
              <Card.Text>Check out our services.</Card.Text>
              <Button as={Link} to='/services' variant='primary'>
                Go To Services
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant='top' src={sample3} fluid />
            <Card.Body>
              <Card.Title>Custom Requests</Card.Title>
              <Card.Text>Check out our custom requests.</Card.Text>
              <Button as={Link} to='/requests' variant='primary'>
                Go To Requests
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default LandingScreen

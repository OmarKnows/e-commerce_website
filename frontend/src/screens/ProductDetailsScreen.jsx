import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProductDetails } from '../actions/productActions';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
  Container,
} from 'react-bootstrap';

const ProductDetailsScreen = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let params = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(params.id));
  }, [dispatch, params]);

  return (
    <div style={{ marginTop: '150px', marginRight: '50px' }}>
      <Container>
        <Row>
          <Col>
            <Image src={product.photo} alt={product.name}></Image>
          </Col>
          <Col>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>
              <ListGroupItem>Price: {'20'} EGP</ListGroupItem>
              <ListGroupItem>Description: {product.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col>
            <Card>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>{'20'}EGP</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{'In Stock'}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Quantity:</Col>
                    <Col>
                      <Form.Control as='select'>
                        <option key={1} value={1}>
                          1
                        </option>
                        <option key={2} value={2}>
                          2
                        </option>
                        <option key={3} value={3}>
                          3
                        </option>
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
              <Button className='btn btn-lg btn-primary' type='button'>
                Add to Cart
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetailsScreen;

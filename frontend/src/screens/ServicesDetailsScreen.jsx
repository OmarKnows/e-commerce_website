import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { listServiceDetails } from '../actions/serviceActions';
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
  Container,
} from 'react-bootstrap';

const ServicesDetailsScreen = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let params = useParams();

  const serviceDetails = useSelector((state) => state.serviceDetails);
  const { loading, error, users } = serviceDetails;

  useEffect(() => {
    dispatch(listServiceDetails(params.id));
  }, [dispatch, params]);

  return (
    <div style={{ marginTop: '150px', marginRight: '50px' }}>
      <Container>
        <Card>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3>{users.username}'s Details</h3>
            </ListGroupItem>
            <ListGroupItem>Address: {users.location} </ListGroupItem>
            <ListGroupItem>Description: {users.description}</ListGroupItem>
          </ListGroup>
        </Card>
      </Container>
    </div>
  );
};

export default ServicesDetailsScreen;

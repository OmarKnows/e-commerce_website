import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CustomRequestsSceen = () => {
  let navigate = useNavigate();
  return (
    <div>
      <Container className='centerButton' style={{ marginTop: '150px' }}>
        <h1>Know your measurements</h1>
        <video width='1280' height='720' controls autoplay>
          <source src='movie.mp4' type='video/mp4' />
          <source src='movie.ogg' type='video/ogg' />
          Your browser does not support the video tag.
        </video>

        <Button
          onClick={() => navigate('/requests/form')}
          className='btn btn-lg btn-success my-4 goBtn'
        >
          Get Started
        </Button>
      </Container>
    </div>
  );
};

export default CustomRequestsSceen;

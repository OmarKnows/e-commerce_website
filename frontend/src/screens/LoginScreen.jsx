import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginScreen = () => {
  return (
    <Container style={{ marginTop: '100px' }}>
      <div className='text-center'>
        <h1>Login To Start Trading</h1>
        <div className='d-flex justify-content-center'>
          <Card style={{ width: '40rem' }}>
            <div>
              <form>
                <div className='form-group'>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    placeholder='E-Mail'
                  />
                </div>
                <div className='form-group py-3'>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    placeholder='Password'
                  />
                </div>

                <div className='d-grid gap-2'>
                  <button type='submit' className='btn btn-primary my-3'>
                    Login
                  </button>
                </div>
              </form>
            </div>
          </Card>
        </div>
        <div className='my-5'>
          <p>Don't have an account?</p>
          <Link to='/customer'>Sign Up</Link>
        </div>
      </div>
    </Container>
  );
};

export default LoginScreen;

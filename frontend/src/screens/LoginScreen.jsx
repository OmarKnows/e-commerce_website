import React from 'react';
import { Card, Container } from 'react-bootstrap';

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
                    type='text'
                    className='form-control'
                    id='username'
                    placeholder='Username'
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
      </div>
    </Container>
  );
};

export default LoginScreen;

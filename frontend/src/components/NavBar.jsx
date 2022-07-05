import React from 'react';
import { Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar className='navbar navbar-expand-lg navbar-light bg-light fixNav'>
      <div className='container-fluid'>
        <LinkContainer to='/'>
          <Link to='/'>E-Com</Link>
        </LinkContainer>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarColor03'
          aria-controls='navbarColor03'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarColor03'>
          <ul className='navbar-nav me-auto'>
            <li className='nav-item'>
              <a className='nav-link active' href='#'>
                Home
                <span className='visually-hidden'>(current)</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                Features
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                Pricing
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                About
              </a>
            </li>
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                data-bs-toggle='dropdown'
                href='#'
                role='button'
                aria-haspopup='true'
                aria-expanded='false'
              >
                Dropdown
              </a>
              <div className='dropdown-menu'>
                <a className='dropdown-item' href='#'>
                  Action
                </a>
                <a className='dropdown-item' href='#'>
                  Another action
                </a>
                <a className='dropdown-item' href='#'>
                  Something else here
                </a>
                <div className='dropdown-divider'></div>
                <a className='dropdown-item' href='#'>
                  Separated link
                </a>
              </div>
            </li>
          </ul>
          <form className='d-flex'>
            <input
              className='form-control me-sm-2'
              type='text'
              placeholder='Search'
            />
            <button className='btn btn-secondary my-2 my-sm-0' type='submit'>
              Search
            </button>
          </form>
        </div>
      </div>
    </Navbar>
  );
};

export default NavBar;

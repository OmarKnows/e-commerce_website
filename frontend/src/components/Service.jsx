import React from 'react';
import { Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
const Tailor = ({ service }) => {
  let navigate = useNavigate();
  return (
    <div className='card border-success mb-3'>
      <div className='card-header'>{service.username}</div>
      <div className='card-body'>
        <h4 className='card-title'>{service.tailorService}...</h4>
        <Link to={`/services/${service._id}`}>Show More</Link>
      </div>
    </div>
  );
};

export default Tailor;

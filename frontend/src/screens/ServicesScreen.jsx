import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Service from '../components/Service';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { listServices } from '../actions/serviceActions';

const ServicesScreen = () => {
  const dispatch = useDispatch();
  const serviceList = useSelector((state) => state.serviceList);
  const { loading, error, users } = serviceList;
  useEffect(() => {
    dispatch(listServices());
  }, [dispatch]);
  return (
    <>
      <Container style={{ marginTop: '150px' }}>
        <h1>Our Tailors</h1>
        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Row>
            {users.map((user) => (
              <Col key={user._id} sm={12} md={6} lg={4} xl={3}>
                <Service service={user} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
    // <Container style={{ marginTop: '100px', textAlign: 'center' }}>
    //   <Row>
    //     <Col>
    //       <Link to='/'>
    //         <Card>
    //           <Card.Img src={women} alt='women' />
    //           <Card.ImgOverlay className='d-flex align-items-center justify-content-center'>
    //             <Card.Title
    //               style={{
    //                 color: 'White',
    //                 fontWeight: 'bold',
    //                 textShadow: '1px 1px #000000',
    //                 fontSize: '30pt',
    //               }}
    //             >
    //               Women
    //             </Card.Title>
    //           </Card.ImgOverlay>
    //         </Card>
    //       </Link>
    //     </Col>
    //     <Col>
    //       <Link to='/'>
    //         <Card>
    //           <Card.Img src={men} alt='men' />
    //           <Card.ImgOverlay className='d-flex align-items-center justify-content-center'>
    //             <Card.Title
    //               style={{
    //                 color: 'White',
    //                 fontWeight: 'bold',
    //                 textShadow: '1px 1px #000000',
    //                 fontSize: '30pt',
    //               }}
    //             >
    //               Men
    //             </Card.Title>
    //           </Card.ImgOverlay>
    //         </Card>
    //       </Link>
    //     </Col>
    //   </Row>
    // </Container>
  );
};

export default ServicesScreen;

import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";

const VendorSignupScreen = () => {
  return (
    <Container style={{ marginTop: "200px" }}>
      <Row>
        <Col>
          <h1>Not Sure Why This Is Here</h1>
          <p>But it looks cool.</p>
          <p>Vendor 3ars</p>
        </Col>
        <Col>
          <Card>
            <h1 className="mt-5 mx-5">Sign Up Now!</h1>
            <div className="container mt-5">
              <form>
                <Row>
                  <Col>
                    <div className="form-group py-3">
                      <input
                        type="text"
                        className="form-control"
                        id="fName"
                        placeholder="First Name"
                      />
                    </div>
                  </Col>
                  <Col>
                    <div className="form-group py-3">
                      <input
                        type="text"
                        className="form-control"
                        id="lName"
                        placeholder="Last Name"
                      />
                    </div>
                  </Col>
                </Row>
                <div className="form-group py-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="E-Mail"
                  />
                </div>
                <div className="form-group py-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>

                <div className="form-group py-3">
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary my-3">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VendorSignupScreen;

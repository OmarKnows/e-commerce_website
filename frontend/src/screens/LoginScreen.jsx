import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";

const loginScreen = () => {
  return (
    <div className="text-center mt-5">
      <h1>Login To Start Trading</h1>
      <div className="d-flex justify-content-center">
        <Card style={{ width: "40rem" }}>
          <div>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
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
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary my-3">
                  Login
                </button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default loginScreen;

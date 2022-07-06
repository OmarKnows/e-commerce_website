import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { listProductDetails } from "../actions/productActions";
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
} from "react-bootstrap";
import Rating from "../actions/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductDetailsScreen = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let params = useParams();

  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(params.id));
  }, [dispatch, params]);

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
  };

  return (
    <div style={{ marginTop: "150px", marginRight: "50px" }}>
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            <Col>
              <Image src={product.img} alt={product.name}></Image>
            </Col>
            <Col>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  Description: {product.description}
                </ListGroupItem>
                <ListGroupItem>
                  <div class="form-group">
                    <label for="exampleSelect1" class="form-label">
                      Colors
                    </label>
                    <select class="form-select" id="exampleSelect1">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="exampleSelect1" class="form-label mt-2">
                      Sizes
                    </label>
                    <select class="form-select" id="exampleSelect1">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{product.price} EGP</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Rating:</Col>
                      <Col>
                        <Rating value={product.rating} />
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{"In Stock"}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Quantity:</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
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
                <Button
                  className="btn btn-lg btn-primary"
                  type="button"
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </Button>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default ProductDetailsScreen;

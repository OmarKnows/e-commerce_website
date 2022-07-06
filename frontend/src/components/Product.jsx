import React from "react";
import Rating from "../actions/Rating";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded text-center">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.img} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>{" "}
          </Card.Title>
        </Link>
      </Card.Body>
      <Card.Text as="div">
        <div className="my-3">
          <Rating value={product.rating} />
        </div>
      </Card.Text>
      <Card.Text as="h3">{product.price} EGP</Card.Text>
    </Card>
  );
};

export default Product;

require('dotenv').config();

const express = require('express');
const app = express();
const dbConnection = require('./config/db');
const cors = require('cors');

//middlewares
app.use(express.json());
app.use(cors());
//express.urlencoded({ extended: false });

//app.use('/uploads', express.static('uploads'));

//routes middlewares
const auth = require('./src/entities/Authentication/authentication.router');
const {
  verifyToken,
} = require('./src/utils/userValidationAndVerification/verifyToken');
const users = require('./src/entities/User/user.router');
const products = require('./src/entities/Product/product.router');
const orders = require('./src/entities/Order/order.router');

app.use('/auth', auth);
app.use(verifyToken);
app.use('/users', users);
app.use('/products', products);
app.use('/order', orders);

//Error Handling
app.use((req, res, next) => {
  const err = new Error('Page not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message });
});

const port = process.env.PORT || 5000; //running server

const start = async () => {
  try {
    await dbConnection(process.env.MONGO_URI);
    console.log('Database connected');
    app.listen(port, () => {
      console.log('listining on port ' + port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

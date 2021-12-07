const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, () => console.log("Connected to DB")); // connecting to db

//middlewares
app.use(express.json());
//express.urlencoded({ extended: false });

//routes middlewares
const auth = require("./src/entities/Authentication/authentication.router");
const { verifyToken } = require("./controllers/verification");
const tailors = require("./src/entities/Tailor/tailor.router");
const users = require("./src/entities/User/user.router");
const vendors = require("./src/entities/Vendor/vendor.router");
const products = require("./src/entities/Product/product.router");
const orders = require("./src/entities/Order/order.router");

app.use("/auth", auth);
app.use(verifyToken);
app.use("/tailors", tailors);
app.use("/users", users);
app.use("/vendors", vendors);
app.use("/products", products);
app.use("/order", orders);

//Error Handling
app.use((req, res, next) => {
  const err = new Error("Page not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message });
});

const port = process.env.PORT || 4000; //running server
app.listen(port, () => {
  console.log("listining !!" + port);
});

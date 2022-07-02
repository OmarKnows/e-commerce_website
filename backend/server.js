require("dotenv").config();
require("express-async-errors");

////// app structure /////////////////////
const express = require("express");
const app = express();
const dbConnection = require("./config/db");
///////////////////////////////////////////

// app middlewares
const cors = require("cors");
app.use(express.json());
express.urlencoded({ extended: false }); // forms
app.use(cors());

//app.use('/uploads', express.static('uploads'));
// const {
//   verifyToken,
// } = require("./src/utils/userValidationAndVerification/verifyToken");
const users = require("./src/entities/User/user.router");
const products = require("./src/entities/Product/product.router");
const orders = require("./src/entities/Order/order.router");
const notFound = require("./src/utils/errors/not-found");
const errorHandler = require("./src/utils/errors/custom-error-handler");

//routes middlewares
app.get("/", (req, res) => {
  res.send("hiiiiiiiiiiii");
});
// app.use(verifyToken);
app.use("/api/v1/users", users);
app.use("/api/v1/product", products);
app.use("/api/v1/order", orders);

//Error Handling
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000; //running server
const start = async () => {
  try {
    await dbConnection(process.env.MONGO_URI);
    console.log("Database connected");
    app.listen(port, () => {
      console.log("listining on port " + port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

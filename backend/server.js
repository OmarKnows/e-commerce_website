const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, () => console.log("Connected to DB")); // connecting to db

//middlewares
app.use(express.json());

//routes middlewares
const auth = require("./routes/authentication");
const tailors = require("./routes/tailor");
const users = require("./routes/user");
const vendors = require("./routes/vendor");
const products = require("./routes/product");
const categories = require("./routes/category");

app.use("/auth", auth);
app.use("/tailors", tailors);
app.use("/users", users);
app.use("/vendors", vendors);
app.use("/products", products);
app.use("/categories", categories);

//Error Handling
app.use((req, res, next) => {
  const err = new Error("Page not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message });
});

const port = process.env.PORT || 3000; //running server
app.listen(port, () => {
  console.log("listining !!" + port);
});

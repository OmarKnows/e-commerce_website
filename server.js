const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const auth = require("./routes/authentication");
const tailors = require("./routes/tailor");
const users = require("./routes/user");

dotenv.config();
// connecting to db
mongoose.connect(process.env.DB_CONNECT, () => console.log("Connected to DB"));

//middlewares
app.use(express.json());

//routes middlewares
app.use("/auth", auth);
app.use("/tailors", tailors);
app.use("/users", users);

app.use((req, res, next) => {
  const err = new Error("Page not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message });
});

const port = process.env.PORT || 3000;
//running server
app.listen(port, () => {
  console.log("listining !!" + port);
});

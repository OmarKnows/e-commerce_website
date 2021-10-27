const express = require("express"),
  app = express();
(dotenv = require("dotenv")), (mongoose = require("mongoose")), dotenv.config();
// connecting to db
mongoose.connect(process.env.DB_CONNECT, () => console.log("Connected to DB"));

//middlewares
app.use(express.json());

const port = process.env.PORT || 3000;
//running server
app.listen(port, () => {
  console.log("listining !!" + port);
});

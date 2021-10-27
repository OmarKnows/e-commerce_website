const express = require("express"),
  app = express();
(dotenv = require("dotenv")),
  (mongoose = require("mongoose")),
  (auth = require("./routes/authentication")),
  (tailors = require("./routes/tailor"));

dotenv.config();
// connecting to db
mongoose.connect(process.env.DB_CONNECT, () => console.log("Connected to DB"));

//middlewares
app.use(express.json());

//routes middlewares
app.use("/auth", auth);
app.use("/tailors", tailors);

const port = process.env.PORT || 3000;
//running server
app.listen(port, () => {
  console.log("listining !!" + port);
});

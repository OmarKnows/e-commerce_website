const cors = require("cors");

const corsOptions = {
  origin: "http://frontEnd.com",
  optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions);

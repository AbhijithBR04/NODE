const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cors = require("cors");

require("./model/index");

const app = express();
const port = 9000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log("server running in:", port);
});

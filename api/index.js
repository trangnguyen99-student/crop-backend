const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = process.env.SERVER_PORT | 3000;

//env config
env.config();

//connected to mongodb
const url =
  "mongodb+srv://" +
  process.env.MONGODB_USER_NAME +
  ":" +
  process.env.MONGODB_DB_PASSWORD +
  "@cluster0.hajwu.mongodb.net/" +
  process.env.MONGODB_DB_NAME +
  "?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to Mongodb succsess");
  })
  .catch((error) => {
    console.log("Error", error);
  });

//app use module
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//Run server listing in port default
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

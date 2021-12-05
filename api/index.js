const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

//import routes
const userRoutes = require("./routers/user.route");
const adminUserRoutes = require("./routers/admin/user.route")

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
app.use("/images", express.static(path.join(__dirname, "uploads")));

//public routes
app.use("/api/user", userRoutes);
app.use("/api/admin/user", adminUserRoutes);

//Run server listing in port default
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

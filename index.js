const connectDB = require("./config/connectDb");
const express = require("express");
const app = express();
const port = 5000;
const productRoute = require("./routes/productRoute");
const authRoute = require("./routes/authRoute.js");
const companyRoute = require('./routes/companyRoute.js')
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const cors = require("cors");
app.use(express.json());
app.use(cors());
connectDB();

app.listen(port, (e) => {
  e ? console.log(e) : console.log(`server is running on port ${port}`);
});
app.use("/api", productRoute);
app.use("/api", authRoute);
app.use("/api", companyRoute);


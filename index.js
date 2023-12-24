const connectDB = require("./config/connectDb");
const express = require("express");
const app = express();
const port = 5000;
const productRoute = require("./routes/productRoute");
const authRoute = require("./routes/authRoute.js");
const companyRoute = require("./routes/companyRoute.js");
const profileRoute = require("./routes/profileRoute.js");
const adminRoute = require("./routes/adminRoute.js");
const shopRoute = require("./routes/shopRoute.js");
require("dotenv").config();
const bodyParser = require("body-parser");
const notificationRoute = require("./routes/notificationRoute.js");
const User=require('./models/User.js');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const cors = require("cors");
app.use(express.json());
app.use(cors());
connectDB();

app.listen(port, (e) => {
  e ? console.log(e) : console.log(`server is running on port ${port}`);
});

const x = async () => {
  await User.updateMany({}, { $set: { lastNotificationSeen: null } });
};

x();

app.use("/api", adminRoute);
app.use("/api", productRoute);
app.use("/api", authRoute);
app.use("/api", companyRoute);
app.use("/api", profileRoute);
app.use("/api", shopRoute);
/* app.use("/api", notificationRoute); */

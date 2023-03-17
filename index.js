const connectDB = require("./config/connectDb");
const express = require("express");
const app = express();
const port = 5000;
const productRoute = require("./routes/productRoute");
connectDB();
app.use(express.json());
app.listen(port, (e) => {
  e ? console.log(e) : console.log(`server is running on port ${port}`);
});
app.use("/api", productRoute);

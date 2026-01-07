const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// import routes
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/inventory")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

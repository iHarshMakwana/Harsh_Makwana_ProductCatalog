const express = require("express");
const cors = require("cors");
const products = require("./products");

const app = express();
app.use(cors());

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
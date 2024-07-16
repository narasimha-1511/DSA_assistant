const express = require("express");
const path = require("path");

const app = express();
require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

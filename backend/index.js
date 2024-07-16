const express = require("express");
const path = require("path");
const cors = require("cors");
const v1 = require("./routes/v1");

const app = express();
require("dotenv").config();

app.use("/api", v1);

const corsOptions = {
  origin: function (origin, callback) {
    if (process.env.ALLOWED_ORIGINS.split(",").indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(express.json());
app.use(cors(corsOptions));



app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

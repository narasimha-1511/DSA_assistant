const express = require("express");

const { customResponse } = require("./../gemini/getCustomResponse");
const { continuee } = require("../controllers/continue");

const router = express.Router();

router.post("/custom", customDoubt);

router.post("/continue", continuee);

router.get("*", (req, res) => {
  res.status(401).json({
    error: "Unauthorized access",
  });
});

module.exports = router;

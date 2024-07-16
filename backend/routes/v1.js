const express = require("express");

const { preprompt } = require("../controllers/prepromt");
const { customDoubt } = require("../controllers/customDoubt");
const { continuee } = require("../controllers/continue");

const router = express.Router();

router.post("/custom", customDoubt);

router.post("/preprompt", preprompt);

router.post("/continue", continuee);

router.get("*", (req, res) => {
  res.status(401).json({
    error: "Unauthorized access",
  });
});

module.exports = router;

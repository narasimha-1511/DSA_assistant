const express = require("express");
const continueChat = require("./gemini/continueChat");}
const router = express.Router();
const gpt= require("./openai");

router.post("/continueChat", continueChat);

router.post("/openaichat" ,gpt)

export default router;

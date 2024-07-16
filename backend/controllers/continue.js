const { continueChat } = require("../gemini/continueChat");

function continuee(req, res) {
  try {
    const { message, history } = req.body;
    if (message === "") {
      return res.json({
        error: "Message cannot be empty",
      });
    }

    if (history.length === 0) {
      return res.json({
        error: "History cannot be empty",
      });
    }

    continueChat(message, history).then((data) => {
      res.json({
        message: data,
      });
    });
  } catch (err) {
    console.log("Error while contiuing the chat controller", err);
    res.json({
      error: "Internal Server Error",
    });
  }
}

module.exports = { continuee };

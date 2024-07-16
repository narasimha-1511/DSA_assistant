const { getPrePromtedResponse } = require("../gemini/generatePrepeomts");
const preprompt = (req, res) => {
  const { url, history, doubt } = req.body;

  if (!doubt) {
    return res.status(400).json({
      error: "doubt is required",
    });
  }

  if (!url) {
    return res.status(400).json({
      error: "url is required",
    });
  }

  getPrePromtedResponse(url, doubt, history)
    .then((response) => {
      res.json({
        message: response,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
};

module.exports = { preprompt };

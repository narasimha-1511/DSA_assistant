const getResponse = require("../gemini/getCustomResponse");

async function customDoubt(req, res) {
  const { doubt, url, history } = req.body;

  try {
    if (!doubt) {
      return res.status(400).json({
        error: "douvbt is required",
      });
    }

    if (!url) {
      return res.status(400).json({
        error: "url is required",
      });
    }

    const response = await getResponse(url, doubt, history);
    res.json({
      message: response,
    });
  } catch (error) {
    console.error("Error in customDoubt:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

module.exports = { customDoubt };

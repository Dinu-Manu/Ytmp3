const express = require("express");
const app = express();
const ytmp3 = require("./api");

app.get("/", (req, res) => {
  res.send("YTMP3 API by DINUWH");
});

app.get("/ytmp3", async (req, res) => {
  let { url } = req.query;
  if (!url) return res.status(400).json({ error: "Please provide a YouTube URL ?url=" });

  try {
    const result = await ytmp3(url);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch MP3" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

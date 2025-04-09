const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express();
app.use(cors());

async function scrapMP3(url) {
  try {
    const { data } = await axios.post('https://v3.ytmp3.media/backend/api/mp3/text', {
      q: url,
      vt: 'home',
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (data && data.data && data.data.mp3) {
      const result = data.data.mp3.find(item => item.quality === '64kbps');
      return {
        title: data.data.meta.title,
        download: result.url,
        size: result.size,
        quality: result.quality,
      };
    } else {
      return { error: true, message: "MP3 not found" };
    }
  } catch (error) {
    return { error: true, message: error.message };
  }
}

app.get('/ytmp3', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: true, message: "URL required" });

  const result = await scrapMP3(url);
  res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API running on PORT " + PORT));

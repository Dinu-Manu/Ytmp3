const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

// Scrape function (example using ytmp3.cc clone or similar)
async function scrapeYtmp3(youtubeUrl) {
  try {
    const response = await axios.post('https://ytmp3.nu/api/ajaxSearch/index', new URLSearchParams({
      query: youtubeUrl
    }).toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    const data = response.data;

    return {
      title: data.title,
      duration: data.duration,
      audio_url: data.links.mp3['mp3-128'].url,
      quality: '128kbps'
    };
  } catch (err) {
    return { error: 'Failed to fetch conversion' };
  }
}

// Route
app.get('/api/ytmp3', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send({ error: 'YouTube URL is missing' });

  const result = await scrapeYtmp3(url);
  res.json(result);
});

// Start Server
app.listen(PORT, () => {
  console.log(`YTMP3 API running on http://localhost:${PORT}`);
});

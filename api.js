const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async function ytToMp3(url) {
  const BASE = "https://v3.ytmp3.media/vwRmp/";

  const { data } = await axios.post(BASE, new URLSearchParams({ url }));

  const $ = cheerio.load(data);
  const audioUrl = $("a.btn.btn-success.btn-sm").attr("href");
  const title = $("div.text-center h4").first().text();

  if (!audioUrl) throw new Error("MP3 not found");

  return {
    title,
    audio: audioUrl
  };
};

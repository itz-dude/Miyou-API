const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const route = express.Router();

const url = "https://gogoanime.fi";

route.get("/getlinks", async (req, res) => {
  let link = url + req.query.link;

  try {
    const result = [];
    const { data } = await axios.get(link);
    const $ = cheerio.load(data);

    const downloadLink = $(".dowloads").find("a").attr("href");
    let vidstreaming,
      gogoserver,
      streamsb,
      xstreamcdn,
      mixdrop,
      mp4upload,
      doodstream;

    $(".anime_muti_link ul li").each((i, el) => {
      const $el = $(el);
      switch (i) {
        case 0:
          vidstreaming = $el.find("a").attr("data-video");
          if (vidstreaming !== undefined) {
            vidstreaming = "https:" + vidstreaming;
          }
          break;
        case 1:
          gogoserver = $el.find("a").attr("data-video");
          if (gogoserver !== undefined) {
            gogoserver = "https:" + gogoserver;
          }
          break;
        case 2:
          streamsb = $el.find("a").attr("data-video");
          break;
        case 3:
          xstreamcdn = $el.find("a").attr("data-video");
          break;
        case 4:
          mixdrop = $el.find("a").attr("data-video");
          break;
        case 5:
          mp4upload = $el.find("a").attr("data-video");
          break;
        case 6:
          doodstream = $el.find("a").attr("data-video");
          break;
      }
    });

    result.push({
      downloadLink,
      vidstreaming,
      gogoserver,
      streamsb,
      xstreamcdn,
      mixdrop,
      mp4upload,
      doodstream,
    });
    res.status(200).json(result);
  } catch (err) {
    console.log("Error from getLinks router", err);
  }
});

module.exports = route;

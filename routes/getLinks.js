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
            vidstreaming = vidstreaming;
          }
          break;
        case 1:
          gogoserver = $el.find("a").attr("data-video");
          if (gogoserver !== undefined) {
            gogoserver = gogoserver;
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

    let numOfEpisodes = $("#episode_page li:last-child a").attr("ep_end");
    let baseEpisodeLink = req.query.link.replace(/\d+$/, "");
    let episodes = [];
    for (let i = 1; i <= numOfEpisodes; i++) {
      episodes.push(baseEpisodeLink + i);
    }

    let titleName = $(".title_name h2").text();

    result.push({
      titleName,
      downloadLink,
      vidstreaming,
      gogoserver,
      streamsb,
      xstreamcdn,
      mixdrop,
      mp4upload,
      doodstream,
      numOfEpisodes,
      baseEpisodeLink,
      episodes,
    });
    res.status(200).json(result);
  } catch (err) {
    console.log("Error from getLinks router", err);
  }
});

module.exports = route;

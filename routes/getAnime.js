const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const route = express.Router();

const url = "https://gogoanime.fi";
const anilistUrl = "https://graphql.anilist.co";

let searchQueryStrings = require("../queryVariables/searchQueryStrings");

route.get("/getanime", async (req, res) => {
  let link = url + req.query.link;

  try {
    const result = [];
    const { data } = await axios.get(link);
    const $ = cheerio.load(data);

    let title = $(".anime_info_body_bg").find("h1").text();
    let image = $(".anime_info_body_bg").find("img[src]").attr("src");
    let type, description, genre, released, status, otherName;
    let numOfEpisodes = $("#episode_page li a").attr("ep_end");

    $(".type").each((i, el) => {
      const $el = $(el);
      switch (i) {
        case 0:
          type = $el.text().replace(/\s\s+/g, "");
          break;
        case 1:
          description = $el.text().replace(/\s\s+/g, "");
          break;
        case 2:
          genre = $el.text().replace(/\s\s+/g, "");
          break;
        case 3:
          released = $el.text().replace(/\s\s+/g, "");
          break;
        case 4:
          status = $el.text().replace(/\s\s+/g, "");
          break;
        case 5:
          otherName = $el.text().replace(/\s\s+/g, "");
          break;
      }
    });

    let episodes = [];
    let baseUrl = req.query.link.replace("/category", "");
    for (let i = 1; i <= numOfEpisodes; i++) {
      episodes.push(baseUrl + "-episode-" + i);
    }

    let anilistResponse;
    try {
      anilistResponse = await axios({
        url: anilistUrl,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          query: searchQueryStrings.searchAnimeQuery,
          variables: {
            search: title.replace(" (Dub)", "").replace(" (TV)", ""),
          },
        },
      });
    } catch (err) {
      console.log("Error from getanime anilist api call", err);
    }

    let gogoResponse = {
      title,
      image,
      type,
      description,
      genre,
      released,
      status,
      otherName,
      numOfEpisodes,
      episodes,
    };

    if (anilistResponse !== undefined) {
      let anilist = {
        title: anilistResponse.data.data.Media.title,
        anilistPoster: anilistResponse.data.data.Media.coverImage,
        anilistBannerImage: anilistResponse.data.data.Media.bannerImage,
        type: anilistResponse.data.data.Media.type,
        description: anilistResponse.data.data.Media.description,
        genre: anilistResponse.data.data.Media.genres,
        released: anilistResponse.data.data.Media.seasonYear,
        status: anilistResponse.data.data.Media.status,
        numOfEpisodes: anilistResponse.data.data.Media.episodes,
        episodes,
      };
      result.push({
        anilistResponse: anilist,
        gogoResponse,
      });
    } else {
      result.push({
        anilistResponse: "NONE",
        gogoResponse,
      });
    }
    res.status(200).json(result);
  } catch (err) {
    console.log("Error from getAnime Route", err);
  }
});

module.exports = route;

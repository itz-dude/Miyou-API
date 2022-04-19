const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const route = express.Router();

const url = "https://gogoanime.fi";
const kitsuUrl = "https://kitsu.io/api/graphql";

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

    let slug = req.query.link.replace("/category/", "");
    slug = slug.replace("-tv", "");
    slug = slug.replace("-season", "");
    slug = slug.replace("-dub", "");

    let AnimeBannerImageQuery = `
      query AnimeBannerImageQuery {
        findAnimeBySlug(slug: "${slug}") {
          posterImage {
            original {
              url
            }
          }
          bannerImage {
            original {
              url
            }
          }
        }
      }
    `;

    let animeBanner = await axios({
      url: kitsuUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: AnimeBannerImageQuery,
        variables: {},
      },
    });

    result.push({
      title,
      image,
      kitsuPoster:
        animeBanner.data.data.findAnimeBySlug != null
          ? animeBanner.data.data.findAnimeBySlug.posterImage.original.url
          : "",
      kitsuBanner:
        animeBanner.data.data.findAnimeBySlug != null
          ? animeBanner.data.data.findAnimeBySlug.bannerImage.original.url
          : "",
      type,
      description,
      genre,
      released,
      status,
      otherName,
      numOfEpisodes,
      episodes,
    });
    res.status(200).json(result);
  } catch (err) {
    console.log("Error from getAnime Route", err);
  }
});

module.exports = route;

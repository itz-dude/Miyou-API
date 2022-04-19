const express = require("express");
const axios = require("axios");
let searchQueryStrings = require("../queryVariables/searchQueryStrings");

const route = express.Router();

const baseUrl = "https://graphql.anilist.co";

route.get("/popular", async (req, res) => {
  const response = await axios({
    url: baseUrl,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: {
      query: searchQueryStrings.PopularAnimeQuery,
      variables: {
        perPage: req.query.count === undefined ? 10 : req.query.count,
      },
    },
  });
  res.status(200).json(response.data);
});

route.get("/trending", async (req, res) => {
  const response = await axios({
    url: baseUrl,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: {
      query: searchQueryStrings.TrendingAnimeQuery,
      variables: {
        perPage: req.query.count === undefined ? 10 : req.query.count,
      },
    },
  });
  res.status(200).json(response.data);
});

route.get("/top100", async (req, res) => {
  const response = await axios({
    url: baseUrl,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: {
      query: searchQueryStrings.top100AnimeQuery,
      variables: {
        perPage: req.query.count === undefined ? 10 : req.query.count,
      },
    },
  });
  res.status(200).json(response.data);
});

module.exports = route;

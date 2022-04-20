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
        page: req.query.page === undefined ? 1 : req.query.page,
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
        page: req.query.page === undefined ? 1 : req.query.page,
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
        page: req.query.page === undefined ? 1 : req.query.page,
        perPage: req.query.count === undefined ? 10 : req.query.count,
      },
    },
  });
  res.status(200).json(response.data);
});

route.get("/favourite", async (req, res) => {
  const response = await axios({
    url: baseUrl,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: {
      query: searchQueryStrings.favouritesAnimeQuery,
      variables: {
        page: req.query.page === undefined ? 1 : req.query.page,
        perPage: req.query.count === undefined ? 10 : req.query.count,
      },
    },
  });
  res.status(200).json(response.data);
});

route.get("/searchanime", async (req, res) => {
  const response = await axios({
    url: baseUrl,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: {
      query: searchQueryStrings.searchAnimeQuery,
      variables: {
        search: req.query.name,
      },
    },
  });
  res.status(200).json(response.data);
});

module.exports = route;

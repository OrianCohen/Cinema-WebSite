var express = require('express');
const { response } = require('../app');
var router = express.Router();
const moviesBL = require("../BL/moviesBL")
const membersBL = require("../BL/membersBL")

/* GET movies listing. */
router.get('/members', async function(req, res) {
  let movies = await membersBL.getAllMembersDataREST()
  return res.json(movies.data)
});

/* GET all movies from web serivce "subscriptions-WS". */
router.get('/movies', async function(req, res) {

  let movies = await moviesBL.getAllMoviesData()
  return res.json(movies.data)
});

module.exports = router;

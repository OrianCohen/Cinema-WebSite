var express = require('express');
const { response } = require('../app');
var router = express.Router();
const moviesBL = require("../BL/moviesBL")

/* GET all movies from web serivce "subscriptions-WS". */
router.get('/', async function(req, res) {

  let movies = await moviesBL.getAllMoviesData()
  return res.json(movies.data)
});

module.exports = router;

var express = require('express');
var router = express.Router();
const moviesBL = require('../BL/moviesBL')

/* GET all Mobies from webservice. */
router.get('/', async function(req, res, next) {
  let dataMovies = await moviesBL.movieToDB()
  return res.json(dataMovies)
});

module.exports = router;

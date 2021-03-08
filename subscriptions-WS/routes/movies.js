var express = require('express');
var router = express.Router();
const moviesBL = require('../BL/moviesBL')

// /* GET all Mobies from webservice. */
router.route('/').get(async function (req,res){
  //if data not exist we will add to subscriptionsDB into table movies
  let dataMovies = await moviesBL.movieToDB()
  let movies = await moviesBL.getAllMovies()
  return res.json(movies)
 
})

//GET movie by id from DB
router.route('/:id').get(async function (req,res){
  let movie = await moviesBL.getMovieByID(req.params.id)
  return res.json(movie)
 
})

// //Add movie to DB
// router.route('/').post(async function (req,res){
//   let obj = req.body
//   let status = await moviesBL.addMovie(obj)
//   return res.json(status)
 
// })

// //Update existing movie
// router.route('/:id').put(async function (req,res){
//   let id = req.params.id
//   let obj = req.body
//   let status = await moviesBL.updateMovie(id, obj)
//   return res.json(status)
// })

//Delete movie from db
router.route('/:id').delete(async function (req,res){
  let id = req.params.id
  let status = await moviesBL.deleteMovie(id)
  return res.json(status)
 
})

module.exports = router;

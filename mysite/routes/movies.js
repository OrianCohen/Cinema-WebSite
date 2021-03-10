var express = require('express');
const { response } = require('../app');
var router = express.Router();
const moviesBL = require("../BL/moviesBL")

/* GET all movies from web serivce "subscriptions-WS". */
router.get('/', async function(req, res) {
    let sess = req.session;
    if(sess.auth){
    res.render('movies');
    }
    else{
        res.redirect('/login')
    }
});


router.get('/geAllMovies', async function(req, res) {
    let sess = req.session;
    if(sess.auth){
    res.render('movies');
    }
    else{
        res.redirect('/login')
    }
});


router.get('/addMovie', async function(req, res) {
    let sess = req.session;
    if(sess.auth){
    res.render('movies');
    }
    else{
        res.redirect('/login')
    }
});

module.exports = router;

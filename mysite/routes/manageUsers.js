var express = require('express');
var router = express.Router();
var userBL = require('../BL/usersBL')

/* GET users listing. */
router.get('/', function(req, res, next) {
  let sess = req.session;
  if(sess.auth){
    res.render('manageUsers');
  }
  else{
      res.redirect('/login')
  }
});

//Get a list of all users from users.json
router.get('/geAllusers', async function(req, res, next) {
  let sess = req.session;
  if(sess.auth){
    let allData = await userBL.getAllUsersDataJSON()
    res.render('users', {datax : allData});
  }
  else{
      res.redirect('/login')
  }
});


router.get('/addUser', function(req, res, next) {
  let sess = req.session;
  if(sess.auth){
    res.render('manageUsers');
  }
  else{
      res.redirect('/login')
  }
});

module.exports = router;

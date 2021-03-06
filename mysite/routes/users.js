var express = require('express');
var router = express.Router();
var usrBL = require('../BL/usersBL')

router.get('/createAccont', function(req, res, next){
  res.render('createUser', {})
});

router.post('/createAccontNewUser', async function(req, res, next){
let user = req.body.username
let password = req.body.pwd
let sess = req.session;
//need to check if the username is exist in the DB ->
//If userName is NOT exist -> it will store the new pass and redirect to login
//If userName exist-> create account fail
let results = await usrBL.validUser(user,password)

try{
  if(results[0].userName == user){
    //TODO add user popup user EXISTS
    res.render('createUser', {})
  }
}
catch(err){
  console.log(err)
  let addUserDB = await usrBL.createUser(req.body)

  //TODO add full user details to users.json
  //TODO add user popup user created sucssfully 
  if(addUserDB == 'created!'){
    res.redirect('/login')
  }
  else{
    res.render('createUser', {})
  }
  }
  
});

module.exports = router;

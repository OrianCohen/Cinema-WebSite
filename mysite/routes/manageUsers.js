var express = require('express');
var router = express.Router();
var userBL = require('../BL/usersBL')
var permiBL = require('../BL/permissionsBL')

/* GET users listing. */
router.get('/', function(req, res) {
  let sess = req.session;
  if(sess.auth){
    res.render('manageUsers');
  }
  else{
      res.redirect('/login')
  }
});

//Get a list of all users from users.json
router.get('/geAllusers', async function(req, res) {
  let sess = req.session;
  if(sess.auth){
    let allData = await userBL.getAllUsersDataJSON()
    res.render('users', {datax : allData});
  }
  else{
      res.redirect('/login')
  }
});

//Will redirect to add new user page, user admin can do that
router.get('/addUser', function(req, res) {
  let sess = req.session;
  if(sess.auth){
    res.render('addUserPage');
  }
  else{
      res.redirect('/login')
  }
});


//After user admin clicked on 'add user' from addUserPage view, we will get the new user data , 
//First we will write it on usersDB, then we will get '_id' and then add the rest of te details to our users.json
router.post('/newUserData', async function(req, res) {
  let sess = req.session;
  let username = req.body.username
  let password = req.body.pwd

  let checkUsername = await userBL.validByUserName(username)
  console.log(checkUsername[0])
  if(sess.auth)
  {
    //If it is true -> means we have same username in the system need to pop up message username exist!
    if(checkUsername[0])
    {
      
    }  
    //If not true - username does not exist in usersDB we can add new user to usersDB, users.json, permissions.json
    else
    {
      //Add user to usersDB
      let result = await userBL.createUserToDB(req.body)
      if(result == 'created!'){
        //we will check what is the _id created in DB 
        let getUserId = await userBL.validUser(username,password)
        try{
          if(getUserId[0].userName ==username){
            let id = getUserId[0]._id
            let addUserToJson = await userBL.AddNewUser(req.body, id)
            let addPerToJson = await permiBL.addNewPermissionJSON(req.body, id) 
            if(addPerToJson =='Added!' && addUserToJson =='Added!'){
                //user created and added successfully to db & json's
                res.redirect('/manageUsers/')
            }
          }
        }
        catch(err){
          res.redirect('/manageUsers/addUser')
          console.log(err)
        }
      }
    }
  }
  else
  {
    res.redirect('/login')
  }
});


//Will redirect to edit user page, user admin can change details on this page
router.get('/editUser/:id', async function(req, res) {
  let id = req.params.id
  let user = await userBL.getUserById(id)
  let sess = req.session;
  if(sess.auth){
    res.render('editUserPage', {data : user[0]});
  }
  else{
      res.redirect('/login')
  }
});


//Edit user after changed from user admin, will send the req.body to edituserjson
router.post('/userEdited/:id', async function(req, res) {
  let sess = req.session;
  let id = req.params.id

  if(sess.auth){
    let result = await userBL.editUserJSON(req.body,id)
    if(result == 'updated!'){
      res.redirect('/manageUsers/geAllusers')
    }
    else{
      res.redirect('/manageUsers')
    }
  }
  else{
      res.redirect('/login')
  }
});

module.exports = router;

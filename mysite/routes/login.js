var express = require('express');
var router = express.Router();
var usrBL = require('../BL/usersBL')
const jwt = require('jsonwebtoken')

/* Get login page */
router.get('/', function(req, res, next) {
  res.render('login', {});
});

/* check for valid user */
router.post('/getLoginData', async function(req, res, next){
    const user = req.body.username
    const password = req.body.pwd
    let sess = req.session;
    
    let results = await usrBL.validUser(user,password)


    try{
        if(results[0].userName == user){
            let userData = await usrBL.getUserById(results[0]._id)

            const RSA_PRIVATE_KEY = 'sD@#AZ123%$=';

            var token = jwt.sign({id: results[0]._id},
                            RSA_PRIVATE_KEY,
                            {expiresIn: 7200});
            
            //We will save the session for this user 
            if(!sess.token){
                sess.token = token
            }
            if(!sess.privateKey){
                sess.privateKey =RSA_PRIVATE_KEY
            }
            if(!sess.auth){
                sess.auth = true
            }
            if(!sess.id){
                sess.id = results[0]._id
            }
            if(!sess.name){
                sess.name = userData[0].firstname
            }
            if(!sess.admin){
                sess.admin = userData[0].isAdmin
            }
            res.redirect('/menu')
        }
    }
    catch(err){
        console.log(err)
        //TODO need to pop
        res.redirect('/login')
    }
});


module.exports = router;

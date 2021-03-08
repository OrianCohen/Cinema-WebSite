var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

/* GET menu page. */
router.get('/', function(req, res, next) {
  let sess = req.session;
  let token = sess.token;
  let RSA_PRIVATE_KEY = sess.privateKey

  if(sess.auth){
    if(sess.token){
      jwt.verify(token,RSA_PRIVATE_KEY, function(err,decoded){
        if(err){
          return res.status(500).send({auth:falsh, message:'failed to get token!'})
        }
        console.log('token ' + token)
        console.log('rsa ' + RSA_PRIVATE_KEY)

        res.render('menu', {data : sess.admin});
      })
    }
    else{
      return res.status(401).send({auth:falsh, message:'No token exist!'})
    }
  }
  else{
      res.redirect('/login')
  }
});

module.exports = router;

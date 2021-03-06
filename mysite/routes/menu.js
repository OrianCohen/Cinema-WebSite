var express = require('express');
var router = express.Router();

/* GET menu page. */
router.get('/', function(req, res, next) {
  let sess = req.session;
  if(sess.auth){
    res.render('menu', {data : sess.admin});
  }
  else{
      res.redirect('/login')
  }
});

module.exports = router;

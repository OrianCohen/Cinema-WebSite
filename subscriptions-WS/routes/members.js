var express = require('express');
var router = express.Router();
var memberBL = require ('../BL/membersBL')

/* GET all Mobies from webservice. */
router.get('/', async function(req, res, next) {
  let dataMembers = await memberBL.membersToDB()
  return res.json(dataMembers)
});

module.exports = router;

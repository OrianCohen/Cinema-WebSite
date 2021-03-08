var express = require('express');
const { response } = require('../app');
var router = express.Router();
const membersBL = require("../BL/membersBL")

/* GET movies listing. */
router.get('/', async function(req, res) {
  let movies = await membersBL.getAllMembersDataREST()
  return res.json(movies.data)
});

module.exports = router;

var express = require('express');
const { response } = require('../app');
var router = express.Router();
const membersBL = require("../BL/membersBL")

/* GET all members from web serivce "subscriptions-WS". */
router.get('/', async function(req, res) {

  let members = await membersBL.getAllMembersData()
  return res.json(members.data)
});

module.exports = router;
